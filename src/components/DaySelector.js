import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddDay from './AddDay';

export class DaySelector extends Component {
	state = {
		days: [],
		displayPopup: false
	};

	getDays = async () => {
		const { week_id } = this.props.match.params;
		const res = await axios.get(`/weeks/${week_id}`);
		this.setState({ days: res.data.data.days });
	};

	componentDidMount() {
		this.getDays();
	}

	togglePopup = () => {
		const { displayPopup } = this.state;
		this.setState({ displayPopup: !displayPopup });
	};

	render() {
		const { days, displayPopup } = this.state;
		if (days) {
			return (
				<div>
					<h1>Day Selector</h1>
					<ul>
						{days.map((day, index) => {
							return (
								<li>
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
							week_id={this.props.match.params}
							togglePopup={this.togglePopup}
							getDays={this.getDays}
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
