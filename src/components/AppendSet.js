import React, { Component } from 'react';
import axios from 'axios';

export class AppendSet extends Component {
	state = {
		reps: 8,
		weight: null,
		set: this.props.exercise.repsActual.length + 1
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: parseInt(e.target.value) });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { reps, weight, set } = this.state;
		const { repsActual, _id } = this.props.exercise;
		const { index, updateExerciseRepsActual, toggleEditView, toggleNewSet } = this.props;
		const newSet = {
			reps,
			weight,
			set
		};
		repsActual.push(newSet);
		try {
			const res = await updateExerciseRepsActual(repsActual, _id, index);
			console.log(res);
			toggleEditView(index);
			toggleNewSet();
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { exercise } = this.props;
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="reps">
					Reps:
					<input
						onChange={this.handleChange}
						type="number"
						min={1}
						name="reps"
						id="reps"
						defaultValue={8}
						required
					/>
				</label>
				<label htmlFor="weight">
					Weight:
					<input onChange={this.handleChange} type="number" min={0} name="weight" id="weight" required />
				</label>
				<input type="submit" value="Log New Set" />
				<button onClick={this.props.toggleNewSet}>Cancel</button>
			</form>
		);
	}
}

export default AppendSet;
