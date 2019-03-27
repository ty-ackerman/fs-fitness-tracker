import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddDay from './AddDay';

export class DaySelector extends Component {
	state = {
		currentWeek: null,
		days: [],
		displayPopup: false
	};

	getCurrentWeek = async () => {
		const { week_id } = this.props.match.params;
		console.log(week_id);
		const currentWeek = await axios.get(`/weeks/${week_id}`);
		this.setState({
			currentWeek: currentWeek.data.data,
			days: currentWeek.data.data.days
		});
	};

	componentDidMount() {
		this.getCurrentWeek();
	}

	togglePopup = () => {
		const { displayPopup } = this.state;
		this.setState({ displayPopup: !displayPopup });
	};

	render() {
		const { days, displayPopup, currentWeek } = this.state;
		if (days && currentWeek) {
			return (
				<div>
					<h1>{`Week ${currentWeek.week}`}</h1>
					<ul>
						{days.map((day, index) => {
							return (
								<li key={index}>
									<Link
										to={`/${this.props.match.params.week_id}/${day._id}`}
									>{`Day ${day.day} - ${day.name}`}</Link>
								</li>
							);
						})}
					</ul>
					<div>
						<button onClick={this.togglePopup}>{displayPopup ? 'Cancel' : 'Add Day'}</button>
					</div>
					<div>
						<Link to="/">Back</Link>
					</div>
					{displayPopup ? (
						<AddDay
							days={this.state.days}
							week_id={this.props.match.params.week_id}
							togglePopup={this.togglePopup}
							getCurrentWeek={this.getCurrentWeek}
						/>
					) : null}
				</div>
			);
		}
		return (
			<div>
				<h1>Loading</h1>
				<div>
					<Link to="/">Back</Link>
				</div>
			</div>
		);
	}
}

export default DaySelector;
