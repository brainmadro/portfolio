import './main.css';
import './App.css';
import Button from './components/common/Button';
import SkillCard from './components/SkillCard';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faSquareJs, faHtml5, faCss3, faSass, faNodeJs, faReact, faGulp, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Title from './components/common/Title';
import ProjectCard from './components/ProjectCard';
import SubTitle from './components/common/SubTitle';
import Heading from './components/common/Heading';

library.add(faSquareJs, faHtml5, faCss3, faSass, faNodeJs, faReact, faGulp, faFontAwesome, faStar)

function App() {	
  return (
    <main className='dark-theme'>
		<section className='presentation'>
			<div className='greetings-card'>
				<Title text={`Hello, I'm`} style={{ color: "#fff" }}/>
				<Heading text='Brian Madroñero' style={{ fontSize: "40pt"}}/>
				<SubTitle text='Full Stack Web Developer' />
				<Button text={`Let's talk`}/>
			</div>
		</section>
		<section className='skills'>
			<div className='skills-description'>
				<p>*First <FontAwesomeIcon icon="fa-solid fa-star" /> for knowledge, next for experience</p>
			</div>
			<div className='skills-cards-container'>
				<SkillCard language='html' />
				<SkillCard language='css' />
				<SkillCard language='sass' />
				<SkillCard language='javascript' />
				<SkillCard language='nodejs' />
				<SkillCard language='react' />
				<SkillCard language='reactNative' />
				<SkillCard language='gulpjs' />
			</div>
			{/* <SkillCard language='postgreSQL' /> */}
		</section>
		<section className='projects'>
			<Title text='SOME PROJECTS' style={{ color: "#fff" }} />
			<div className='projects-container'>
				<ProjectCard title='Dummy' />
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
 * Explciar que una estrella es conocimiento el resto experiencia
 * Crear imange background que se difumine con el color de fondo
 */