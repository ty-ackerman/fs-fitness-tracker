import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WeekSelector from './components/WeekSelector';
import DaySelector from './components/DaySelector';
import Exercises from './components/Exercises';

class App extends Component {
	state = {
		prevPath: '/'
	};

	getPrevPath = async (oldUrl, newUrl) => {
		console.log(newUrl);
		await this.setState({ prevPath: oldUrl });
	};

	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path="/" component={WeekSelector} />
						<Route path="/workout/:day_id" component={Exercises} />
						<Route
							path="/:week_id"
							render={(props) => (
								<DaySelector {...props} getPrevPath={this.getPrevPath} prevPath={this.state.prevPath} />
							)}
						/>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
