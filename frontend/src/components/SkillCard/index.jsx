import './SkillCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SkillCard(props) {
	const languages = {
		html: 'fa-brands fa-html5',
		css: 'fa-brands fa-css3',
		javascript: 'fa-brands fa-square-js',
		nodejs: 'fa-brands fa-node-js',
		react: 'fa-brands fa-react',
		reactNative: 'fa-brands fa-react',
		postgreSQL: 'fa-brands fa-sass',
		sass: 'fa-brands fa-sass',
		gulpjs: 'fa-brands fa-gulp',
		webpack: 'fa-brands fa-webpack'

	}
  return (
     <div className="skill-container">
		<div className="skill-language-icon"><FontAwesomeIcon icon={languages[props.language]} /></div>
		<div className="skill-level"><FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" /><FontAwesomeIcon icon="fa-solid fa-star" /></div>
	</div>
  );
}

export default SkillCard;
