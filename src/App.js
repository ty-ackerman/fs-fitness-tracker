import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import WeekSelector from './components/WeekSelector';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route path="/" component={WeekSelector} />
				</div>
			</Router>
		);
	}
}

export default App;
