import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class WeekSelector extends Component {
	state = {
		weeks: []
	};
	refresh = async () => {
		const res = await axios.get('/weeks');
		this.setState({
			weeks: res.data.data
		});
	};

	componentDidMount() {
		this.refresh();
	}
	render() {
		const { weeks } = this.state;
		if (weeks.length) {
			return (
				<div>
					<h1>Select Week</h1>
					<ul>
						{weeks.map((week, index) => {
							return (
								<li>
									<Link key={index} to={`${week._id}`}>{`Week ${week.week}`}</Link>
								</li>
							);
						})}
					</ul>
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
