import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class DaySelector extends Component {
	state = {
		days: []
	};

	getDays = async () => {
		const { week_id } = this.props.match.params;
		const res = await axios.get(`/weeks/${week_id}`);
		this.setState({ days: res.data.data.days });
	};

	componentDidMount() {
		this.getDays();
	}

	render() {
		const { days } = this.state;
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
						<Link to="/">Back</Link>
					</div>
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
