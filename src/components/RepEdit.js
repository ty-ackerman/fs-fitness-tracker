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

	// updateEntireExercise = () => {
	// 	const { index, allExercises, exercise } = this.props;
	// 	const repsActual = this.updateRepsActual(index + 1);
	// 	allExercises.map((item) => {
	// 		if (item._id === exercise._id) {
	// 			item.repsActual = repsActual;
	// 		}
	// 	});
	// 	return allExercises;
	// };

	handleSubmit = async (e) => {
		e.preventDefault();
		// const exercises = this.updateEntireExercise();
		const { index, toggleEditView, checkIfCompleted, updateWorkoutDay } = this.props;
		const repsActual = this.updateRepsActual(index + 1);
		const exercise_id = this.props.exercise._id;
		try {
			// remember to get rid of workouts/log-exercises
			const res = await axios.patch(`/exercises/log-exercise/${exercise_id}`, { repsActual });
			toggleEditView(index);
			checkIfCompleted();
			await updateWorkoutDay();

			//Here I will put the formula to uptdate the exercises in this days workouts passed through props from exercisemoredetailslog
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
