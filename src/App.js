import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WeekSelector from './components/WeekSelector';
import DaySelector from './components/DaySelector';
import Exercises from './components/Exercises';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path="/" component={WeekSelector} />
						<Route path="/:week_id/:day_id" component={Exercises} />
						<Route path="/:week_id" component={DaySelector} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
