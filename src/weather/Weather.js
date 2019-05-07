import React from 'react';
class Weather extends React.Component {
	
	state = {
			country: undefined,
		    city: undefined,
		    temperature: undefined,
		    humidity: undefined,
		    description: undefined,
		    error: undefined
	}
	
	async componentDidMount(){
		const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=novi%20sad,%20rs&appid=416885897f6909f475ac639b0505f451`); 
		const responseWeather = await api_call.json();
		this.setState({
			city: responseWeather.name,
	    	country: responseWeather.sys.country,
	    	temperature: responseWeather.main.temperature,
	    	humidity: responseWeather.main.humidity,
	    	description: responseWeather.weather[0].description,
	    	error: ""
		})
	}
	
	render(){
		return(
		  <div>
		      {this.state.country && this.state.city && <p>Location: {this.state.city},    {this.state.country}</p>}
		      {this.state.temperature && <p>Temperature: {this.state.temperature}</p>}
		      {this.state.humidity && <p>Humidity: {this.state.humidity}</p>}
		      {this.state.description && <p>Conditions:  {this.state.description}</p>}
		      {this.state.error && <p>{this.state.error}</p>}
	      </div>
	      )
	}
}
export default Weather;