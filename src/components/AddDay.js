import React, { Component } from 'react';
import axios from 'axios';

export class AddDay extends Component {
	state = {
		days: this.props.days,
		day: null,
		name: null,
		exercises: []
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	addDay = async (e) => {
		e.preventDefault();
		const { getDays, togglePopup, week_id } = this.props;
		try {
			const { day, name } = this.state;
			await axios.patch(`/weeks/${week_id}`, { day, name });
			await getDays();
			togglePopup();
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<div>
				<h1>Add Day</h1>
				<form onSubmit={this.addDay}>
					<label htmlFor="day">
						Day Number
						<input
							onChange={this.handleChange}
							type="number"
							name="day"
							id="day"
							min={1}
							defaultValue={this.state.days.length + 1}
							ref="day"
						/>
					</label>
					<br />
					<label htmlFor="name">
						Workout Name
						<input onChange={this.handleChange} type="text" name="name" id="name" ref="name" />
					</label>
					<div>
						<input type="submit" value="Create Day" />
					</div>
				</form>
			</div>
		);
	}
}

export default AddDay;
