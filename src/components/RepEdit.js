import React, { Component } from 'react';
import axios from 'axios';

export class RepEdit extends Component {
	state = {
		reps: this.props.rep,
		weight: null
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: parseInt(e.target.value)
		});
	};

	updateRepsActual = (index) => {
		const { repsActual } = this.props.exercise;
		const { reps, weight } = this.state;
		console.log(repsActual, reps, weight, index);
		repsActual.map((set) => {
			if (set.set === index) {
				console.log(set);
				set.reps = reps;
				set.weight = weight;
			}
		});
		return repsActual;
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		// const exercises = this.updateEntireExercise();
		const { index, updateExerciseRepsActual } = this.props;
		const repsActual = this.updateRepsActual(index + 1);
		const exercise_id = this.props.exercise._id;
		try {
			const res = updateExerciseRepsActual(repsActual, exercise_id, index);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { rep, index } = this.props;
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="reps">
					Reps:
					<input
						onChange={this.handleChange}
						type="number"
						defaultValue={rep}
						min={1}
						id="reps"
						name="reps"
						required
					/>
				</label>
				<label htmlFor="weight">
					Weight (lbs):
					<input onChange={this.handleChange} type="number" min={0} id="weight" name="weight" required />
				</label>
				<input type="submit" value="Log" />
				<button onClick={() => this.props.toggleEditView(index)}>Cancel</button>
			</form>
		);
	}
}

export default RepEdit;
