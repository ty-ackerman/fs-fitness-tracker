import React, { Component } from 'react';
import axios from 'axios';

export class AddDay extends Component {
	state = {
		days: this.props.days,
		day: this.props.days.length + 1,
		name: null,
		exercises: []
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	// This function will add the new workout to the /weeks/:week_id route
	addToWorkoutRoute = async (newDay) => {
		const { day, name, _id } = newDay.data.data;
		try {
			await axios.post(`/workouts/`, { day, name, _id });
		} catch (err) {
			console.log(err);
		}
	};

	addDay = async (e) => {
		e.preventDefault();
		const { getCurrentWeek, togglePopup, week_id, days } = this.props;
		const { day, name } = this.state;
		try {
			const newDay = await axios.patch(`/weeks/${week_id}`, { days, day, name });
			await getCurrentWeek();
			await this.addToWorkoutRoute(newDay);
		} catch (err) {
			console.log(err);
		}
		togglePopup();
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
							max={7}
							defaultValue={this.state.days.length + 1}
							ref="day"
						/>
					</label>
					<br />
					<label htmlFor="name">
						Workout Name
						<input onChange={this.handleChange} type="text" name="name" id="name" ref="name" required />
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
