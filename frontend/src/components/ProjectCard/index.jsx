import './ProjectCard.css';
import SubTitle from '../common/SubTitle';
import Button from '../common/Button';

function ProjectCard(props) {

	function handleClick(url) {
		window.open(url);
	}

	return (
		<div className='project-card-container'>
			<img src={props.image} alt="" />
			<div className='project-details'>
				<SubTitle text={props.title} />
				<div className='project-actions'>
					{(props.view) ? <Button text={(props.lang == 'es') ? 'Ver' : 'View'} /> : ''}
					{(props.code) ? <Button text={(props.lang == 'es') ? 'Código' : 'Code'} onClick={() => handleClick(props.code)} /> : null}					
				</div>
			</div>
		</div>
	);
}
  
export default ProjectCard;