import './ProjectCard.css';
//import SubTitle from '../common/SubTitle';
import Button from '../common/Button';

function ProjectCard(props) {
	return (
		<div className='project-card-container'>
			<img src="https://picsum.photos/300/200" alt="" />
			<div className='project-details'>
				{/* <SubTitle text={props.title} /> */}
				<div className='project-actions'>
					<Button text='View' />
					<Button text='Code' />
				</div>
			</div>
		</div>
	);
}
  
export default ProjectCard;