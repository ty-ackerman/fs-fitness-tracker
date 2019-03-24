import React, { Component } from 'react';
import axios from 'axios';

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
		return (
			<div>
				<h1>Select Current Week</h1>
			</div>
		);
	}
}

export default WeekSelector;
