import { useRef, useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { 
	faSquareJs, 
	faHtml5, 
	faCss3, 
	faSass, 
	faNodeJs, 
	faReact, 
	faGulp, 
	faFontAwesome, 
	faJava,
	faShopify,
	faGithub
} from '@fortawesome/free-brands-svg-icons'
import { faMongoDb, faPostgreSql, faDigitalOcean, faHeroku, faAmazonAws, faFirebase, faWebpack } from './custom-icons'
import { Button, Title, SubTitle, Heading } from './components/common/index';
import SkillCard from './components/SkillCard'
import ProjectCard from './components/ProjectCard'
import LangSelector from './components/LangSelector';
import utils from './utils'
import './main.css';
import './App.css';

library.add(faSquareJs, faHtml5, faCss3, faSass, faNodeJs, faReact, faGulp, faJava, faFontAwesome, faStar, faShopify, faGithub, faMongoDb, faPostgreSql, faDigitalOcean, faHeroku, faAmazonAws, faFirebase, faWebpack )

function sendEmail() {
	window.open('mailto:brainmadro@gmail.com');
}

function App() {	
	const photo = useRef(null)
	const descCard = useRef(null)
	const [xp, setXp] = useState([])
	const [text, setText] = useState({})
	const [lang, setLang] = useState('en')
	//const countriesEN = ['US'];
	const countriesES = ['AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'EC', 'SV', 'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'DO', 'UR', 'VE'];

	useEffect(() => {
		utils.programming.getProgrammingLanguages()
		.then(res => {
			setXp(res.data)
		})

		utils.location.getGeoLocation()
		.then(res => {
			setLang((countriesES.includes(res.data.country)) ? 'es' : 'en')
		})

	}, [])

	useEffect(() => {
		console.log(lang);
		utils.location.getLang(lang)
		.then(response => {
			setText(text => ({
				...text,
				...response.homepage
			}))
		})
	}, [lang])

	function expandPhoto() {
		photo.current.style.transform = 'scale(1.1)';	
		descCard.current.classList.toggle('descCard');
	}

	function normalizePhotoSize() {
		photo.current.style.transform = 'scale(1)';	
		descCard.current.classList.toggle('descCard');
	}

	function handleLang(selected) {
		setLang(selected)
	}

	return (
		<main className='dark-theme'>
			{/* <div className='background'></div> */}
			<LangSelector onChange={handleLang} checked={(lang !== 'es') ? true : false}/>
			<section className='presentation'>
				<div className='greetings-card'>
					<Title text={text.greeting} style={{ color: "#fff" }}/>
					<Heading text='Brian Madroñero' style={{ fontSize: "40pt"}}/>
					<SubTitle text={text.position} />
					<Button onClick={sendEmail} text={text.contactButton}/>
				</div>
				<div className='id-card' 
					onMouseEnter={expandPhoto}
					onMouseLeave={normalizePhotoSize}>
					<div className='photo' ref={photo}></div>
					<h5>@brainmadro</h5>
					<p className='descCard' ref={descCard}>JavaScript Lover</p>
				</div>
			</section>
			<section className='skills'>
				<div className='skills-description'>
					<Title text={text.languagesTitle} style={{ color: "#fff" }} />
					{/* <p>*First <FontAwesomeIcon icon="fa-solid fa-star" /> for knowledge, next for experience</p> */}
				</div>
				<div className='skills-cards-container'>
					{
						xp.map(x => {
							return(<SkillCard className='animate__animated animate__bounce' language={x.name} key={x.name + x.level + 'pl'} level={x.level}/>)
						})
					}
				</div>
			</section>
			{/* After finish degin of the space */}
			{/* <section className='summary'>
				<Title text='This is me' style={{ color: "#fff" }} />
				<div className='id-card' 
					onMouseEnter={expandPhoto}
					onMouseLeave={normalizePhotoSize}>
					<div className='photo' ref={photo}></div>
					<h5>Brian Madroñero</h5>
					<p className='descCard' ref={descCard}>JavaScript Lover</p>
				</div>
			</section> */}
			{/* Soon to build */}
			<section className='projects'>
				{/* <Title text='PROJECTS' style={{ color: "#fff" }} /> */}
				<div className='projects-container'>
					<ProjectCard
						lang={lang}
						code='https://github.com/brainmadro/portfolio'
						image='https://imgs.search.brave.com/ZjGAkqqZv3kwQFCkKEo7QqnxlbKgHK-rGnF6wFI4Hec/rs:fit:400:400:1/g:ce/aHR0cHM6Ly93d3cu/dGhlc29mdHdhcmVy/ZXBvcnQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE4LzA2/L2dpdGh1Yi1jb2xs/YWItcmV0aW5hLXBy/ZXZpZXcuZ2lm.gif'
						title={text.thisCode} />
				</div>			
			</section>
		</main>
	);
}

export default App;

/**
 * Fade in projects
 * background realeted with image animated
 * Contador de años de experiencia como programador, dentro de una página llamada CV
 */