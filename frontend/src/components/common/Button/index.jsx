import "./Button.css";

function handleClick(onClick) {
	onClick()
}

function Button(props) {
	return (
	  <button onClick={() => handleClick(props.onClick)}>{props.text}</button>
	);
}
  
export default Button;
  