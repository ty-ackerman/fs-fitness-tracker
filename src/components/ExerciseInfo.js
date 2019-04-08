import React, { Component } from 'react';
import ExerciseMoreDetails from './ExerciseMoreDetails';
import axios from 'axios';

export class ExerciseInfo extends Component {
	state = {
		expandedView: false
	};

	expand = () => {
		this.setState({ expandedView: !this.state.expandedView });
	};

	deleteExercise = async () => {
		try {
			const { _id } = this.props.exercise;
			const res = await axios({
				method: 'delete',
				url: `/exercises/${_id}`
			});
			await this.patchWorkout();
			await this.props.getExercises();
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	patchWorkout = async () => {
		const { exercises, index, day_id } = this.props;
		exercises.splice(index, 1);
		try {
			const res = await axios.patch(`/workouts/delete-exercise/${day_id}`, { exercises });
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { exercise } = this.props;
		const { expandedView } = this.state;
		if (exercise) {
			return (
				<div onClick={this.expand}>
					<p>{exercise.exercise.name}</p>
					{expandedView ? <ExerciseMoreDetails exercise={exercise} /> : null}
					<button onClick={this.deleteExercise}>X</button>
				</div>
			);
		}
	}
}

export default ExerciseInfo;
