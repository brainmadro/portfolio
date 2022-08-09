const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const ipLocation = require('iplocation')
const ipapi = require('ipapi.co')
const fs = require('fs')
const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials', function (err) {})
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const PORT = process.env.PORT || 5000

//Initializations
const serviceAccount = require('./shazer-madro-firebase-adminsdk-3u8w9-a701f09e15.json');
const { log, Console } = require('console');
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

const countriesEN = ['US'];
const countriesES = ['CO'];
var langTexts = {};

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({
    secret: "secret-key",
    resave: false,
    saveUnitialized: false
  }))
  .use(async (req, res, next) => {
    if (req.originalUrl != '/favicon.ico') {
      var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
      if (ip.startsWith('localhost') || ip.startsWith('127') || ip.startsWith('::')) ip = '192.145.119.196'
      console.log(ip);
      ipapi.location(res => {
        hbs.registerHelper("lang", function(option) {
          if (countriesES.includes(res.country_code)) { // ES
            langTexts = fs.readFileSync(path.join(__dirname  + '/public/lang/es.json'));
            langTexts = JSON.parse(langTexts);
          } else {
            langTexts = fs.readFileSync(path.join(__dirname  + '/public/lang/en.json'));
            langTexts = JSON.parse(langTexts);
          }
          return option.split('.').reduce((p,c)=>p&&p[c]||null, langTexts)
        });        
        next()
      })
    }    
  })
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'hbs')
  .get('/', (req, res) => {
    const context = {
      "skills": [
        {
          "language": "Javascript",
          "icon_class": "fa-brands fa-js",
          "percent": "80"
        },{
          "language": "Nodejs",
          "icon_class": "fa-brands fa-node-js",
          "percent": "80"
        },{
          "language": "PHP",
          "icon_class": "fa-brands fa-php",
          "percent": "10"
        },{
          "language": "Liquid",
          "icon_class": "fa-brands fa-shopify",
          "percent": "50"
        },{
          "language": "Python",
          "icon_class": "fa-brands fa-python",
          "percent": "10"
        },{
          "language": "Stencil (BigCommerce)",
          "icon_class": "",
          "percent": "10"
        },{
          "language": "Heroku",
          "icon_class": "",
          "percent": "10"
        }
      ]
    }
    res.render('pages/index', context)
    //console.log(req.subdomains);
  })
  .get('/shazer', (req, res) => {
    if (req.session.isAuth) {
      res.redirect('/shazer/dashboard')
    } else {
      res.render('pages/shazer')
    }
  })
  .get('/shazer/dashboard', authShazer, (req, res) => {
    const event = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const today = event.toLocaleDateString('es-ES', options).split('');
    today.splice(today.findIndex(x => x === " ")+1, 1, today[today.findIndex(x => x === " ")+1].toUpperCase());
    today.splice(today.findIndex(x => x === " "), 1, ', ');
    const data = {
      today: today.join(''),
      min_date: event.toISOString().split('T')[0]
    };
    res.render('pages/dashboard', data);
  })
  .get('/shazer/calendar', async (req, res) => {
    var collection = req.query.month;
    var docRef = db.collection(`calendar/reservations/${ collection}`);
    var snapshot = await docRef.get();
    var reservations = (snapshot.empty) ? {} : { data: [] };
    snapshot.forEach(doc => {
      reservations.data.push({
        id: doc.id,
        details: doc.data()
      });
    });
    docRef = db.collection(`calendar/intentions/${ collection}`);
    snapshot = await docRef.get();
    var intentions = (snapshot.empty) ? {} : { data: [] };
    snapshot.forEach(doc => {
      intentions.data.push({
        id: doc.id,
        details: doc.data()
      });
    });
    res.send({reservations: reservations, intentions: intentions});
  })
  .post('/shazer/login', (req, res) => {
    req.session.user = req.body.user;
    req.session.isAuth = true;
    res.redirect('/shazer/dashboard');
  })
  .post('/shazer/logout', (req, res) => {
    req.session.destroy((err) => {
      if(err) throw err;
      res.redirect('/shazer');
    });
  })
  .post('/shazer/register-stay', async (req, res) => {
    if (req.body.type == 'intention') {
      const exist = await checkIntention(req.body.arrives_at, req.body.leaves_at) 
      if (!exist) saveIntention(req.body.arrives_at, req.body.leaves_at);
      res.send(exist);
    }
  })
  .get('*', (req, res) => {
    res.render('pages/404')
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


//Authentication
function authShazer(req, res, next) {
  if (req.session.isAuth) {
    next()
  } else {
    res.redirect('/shazer')
  }
}

function getMonthDays(month) {
  var date = new Date();
  var days = [];
  var next = 1;

  date = new Date(date.getFullYear(), month, 1);

  if (date.getDay() != 0) {
    date.setDate(date.getDate()-date.getDay());
    next++;
  }

  var lastDay = new Date(date.getFullYear(), date.getMonth() + next, 0);
  days.push(date.getDate());

  while (date < lastDay) {
    date.setDate(date.getDate()+1);
    days.push(date.getDate());
    //console.log(date.toDateString());
  }
  return days;
}

async function getCalendar() {
  const snapshot = await db.collection('calendar').get();
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
}

async function readASingleDocument() {
  const cityRef = db.collection('calendar').doc('reservations');
  const doc = await cityRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
}

async function getIntentions(collection, days) {
  
}

async function getReservationsDays(collection) {
  
}

async function checkIntention(arrivesAt, leavesAt) {
  const collection =  `${ arrivesAt.split('-')[1] }_${ arrivesAt.split('-')[0] }`;
  const init = new Date(arrivesAt).getDate();
  const dif = (new Date(leavesAt) - new Date(arrivesAt)) / 8.64e+7;
  const d = [];
  var days = [];

  for (let index = init; index <= (init+dif); index++) {
    d.push(index);
  }

  const snapshot = await db.collection('calendar/intentions/'+ collection).get();
  return new Promise(resolve => {
    snapshot.forEach((doc) => {
      days = days.concat(doc.data().days);
    });
    resolve(days.some(x => d.includes(x)));
  })
}

async function saveIntention(arrivesAt, leavesAt) {
  const collection =  `${ arrivesAt.split('-')[1] }_${ arrivesAt.split('-')[0] }`;
  const doc =  (new Date(arrivesAt).getDate() < 10) ? '0' + new Date(arrivesAt).getDate() : new Date(arrivesAt).getDate().toString(); ;
  const init = new Date(arrivesAt).getDate();
  const dif = (new Date(leavesAt) - new Date(arrivesAt)) / 8.64e+7;
  const d = [];

  for (let index = init; index <= (init+dif); index++) {
    d.push(index);
  }

  const data = {
    days: d,
    month: arrivesAt.split('-')[1],
    year: arrivesAt.split('-')[0],
    "arrives_at": arrivesAt,
    "leaves_at": leavesAt
  };
  if (new Date(arrivesAt) > new Date() && new Date(arrivesAt) < new Date(leavesAt)) {
    // Add a new document in collection "cities" with ID 'LA'
    const res = await db.collection('calendar/intentions/'+ collection).doc(doc).set(data);
    console.log(`Stay Record Created: \nCollection: ${ collection } Doc: ${ doc }`);
    //console.log(res);    
  }
}     
/* const firebaseAuth = getAuth();
signInWithEmailAndPassword(firebaseAuth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("signed");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
 */
/**
 * To do 
 * -> how to know If the array includes day of the next month
 */