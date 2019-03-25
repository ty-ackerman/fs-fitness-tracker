import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class DaySelector extends Component {
	state = {
		days: [],
		url: null
	};

	getDays = async () => {
		const { week_id } = this.props.match.params;
		const res = await axios.get(`/weeks/${week_id}`);
		this.setState({ days: res.data.data.days });
	};

	getUrl = () => {
		const { url } = this.props.match;
		this.setState({ url });
	};

	componentDidMount() {
		this.getDays();
		this.getUrl();
	}

	render() {
		const { days, url } = this.state;
		if (days) {
			return (
				<div>
					<h1>Day Selector</h1>
					<ul>
						{days.map((day, index) => {
							const newUrl = `/workout/${day._id}`;
							return (
								<li onClick={() => this.props.getPrevPath(url, newUrl)}>
									{`Day ${day.day} - ${day.name}`}
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
