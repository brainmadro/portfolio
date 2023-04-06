import './SkillCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';

function SkillCard(props) {

	const [level, setLevel] = useState(0)

	const languages = {
		html: 'fa-brands fa-html5',
		css: 'fa-brands fa-css3',
		javascript: 'fa-brands fa-square-js',
		nodejs: 'fa-brands fa-node-js',
		react: 'fa-brands fa-react',
		sass: 'fa-brands fa-sass',
		gulpjs: 'fa-brands fa-gulp',
		java: 'fa-brands fa-java',
		shopify: 'fa-brands fa-shopify',
		github:  'fa-brands fa-github',
		mongodb: 'fac fa-mongodb',
		postgreSQL: 'fac fa-postgresql',
		digitalOcean: 'fac fa-digital-ocean', 
		heroku: 'fac fa-heroku', 
		amazonAws: 'fac fa-amazon-aws', 
		firebase: 'fac fa-firebase',
		webpack: 'fac fa-webpack',
		git: 'fa-brands fa-git-alt',
		gitlab: 'fa-brands fa-gitlab',
		php: 'fa-brands fa-php',
		docker: 'fa-brands fa-docker',
	}

	useEffect(() => {
		setLevel(Math.round(props.level/25));
	}, [])

	return (
		<div className={`${props.className} skill-container`}>
			<div className="skill-language-icon"><FontAwesomeIcon icon={languages[props.language]} /></div>
			<div className="skill-level"><FontAwesomeIcon icon="fa-solid fa-star" className={(level >= 1) ? 'filled-star' : ''}/><FontAwesomeIcon icon="fa-solid fa-star" className={(level >= 2) ? 'filled-star' : ''}/><FontAwesomeIcon icon="fa-solid fa-star" className={(level >= 3) ? 'filled-star' : ''}/><FontAwesomeIcon icon="fa-solid fa-star" className={(level >= 4) ? 'filled-star' : ''}/></div>
		</div>
	);
}

export default SkillCard;
