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
		repsActual.map((set) => {
			if (set.set === index) {
				set.reps = reps;
				set.weight = weight;
			}
		});
		return repsActual;
	};

	updateEntireExercise = () => {
		const { index, allExercises, exercise } = this.props;
		const repsActual = this.updateRepsActual(index + 1);
		allExercises.map((item) => {
			if (item._id === exercise._id) {
				item.repsActual = repsActual;
			}
		});
		return allExercises;
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const exercises = this.updateEntireExercise();
		const { day_id, index, toggleEditView } = this.props;
		try {
			const res = await axios.patch(`/workouts/log-exercise/${day_id}`, { exercises });
			toggleEditView(index);
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
