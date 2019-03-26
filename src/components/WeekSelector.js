import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddWeek from './AddWeek';

export class WeekSelector extends Component {
	state = {
		weeks: [],
		displayPopup: false
	};
	refresh = async () => {
		const res = await axios.get('/weeks');
		this.setState({
			weeks: res.data.data
		});
	};

	async componentDidMount() {
		this.refresh();
	}

	togglePopup = () => {
		const { displayPopup } = this.state;
		this.setState({ displayPopup: !displayPopup });
	};

	enterNewWeek = (newWeek) => {
		const { _id } = newWeek.data.data[0];
		this.props.history.push(`/${_id}`);
	};
	render() {
		const { weeks, displayPopup } = this.state;
		if (weeks.length) {
			return (
				<div>
					<h1>Select Week</h1>
					<ul>
						{weeks.map((week, index) => {
							return (
								<li key={index}>
									<Link to={`${week._id}`}>{`Week ${week.week}`}</Link>
								</li>
							);
						})}
					</ul>
					<button onClick={this.togglePopup}>Add Week</button>
					{displayPopup ? (
						<AddWeek
							refresh={this.refresh}
							enterNewWeek={this.enterNewWeek}
							weeks={weeks}
							togglePopup={this.togglePopup}
						/>
					) : null}
				</div>
			);
		}
		return (
			<div>
				<h1>Loading</h1>
			</div>
		);
	}
}

export default WeekSelector;
