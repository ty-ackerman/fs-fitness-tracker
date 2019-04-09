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

	patchWorkout = async () => {
		const { exercises, index, day_id } = this.props;
		exercises.splice(index, 1);
		try {
			const res = await axios.patch(`/workouts/delete-exercise/${day_id}`, { exercises });
			await this.props.getExercises();
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
				<div>
					<p style={{ color: 'royalblue', cursor: 'pointer' }} onClick={this.expand}>
						{exercise.exercise.name}
					</p>
					{expandedView ? (
						<ExerciseMoreDetails
							patchWorkout={this.patchWorkout}
							exercise={exercise}
							day_id={this.props.day_id}
						/>
					) : null}
				</div>
			);
		}
	}
}

export default ExerciseInfo;
