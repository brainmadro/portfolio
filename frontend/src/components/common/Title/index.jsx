import "./Title.css";

function Title(props) {
	return (
	  <h2 style={props.style}>{props.text}</h2>
	);
}
  
export default Title;
  