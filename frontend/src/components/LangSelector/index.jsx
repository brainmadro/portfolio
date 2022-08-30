import "./LangSelector.css"
function LangSelector(props) {

	function handleOnChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		//console.log([name, value]);
		props.onChange((value) ? 'en': 'es')
	}

	return (
		<div className="selector-container">
			<span className="es-label">ES</span>
			<label className="switch">
				<input type="checkbox" checked={props.checked} onChange={handleOnChange}/>
				<span className="slider round"></span>
			</label>
			<span className="en-label">EN</span>
		</div>
	)
}

export default LangSelector