import React, { Component } from 'react';
import ExerciseMoreDetailsPlanned from './ExerciseMoreDetailsPlanned';
import ExerciseMoreDetailsLog from './ExerciseMoreDetailsLog';

export class ExerciseMoreDetails extends Component {
	state = {
		editView: false
	};

	toggleEditView = () => {
		this.setState({ editView: !this.state.editView });
	};

	renderReps = (repsArray) => {
		const repsString = repsArray.join('-');
		return repsString;
	};

	render() {
		const { editView } = this.state;
		const { exercise } = this.props;
		return (
			<div>
				<ExerciseMoreDetailsPlanned
					exercise={exercise}
					toggleEditView={this.toggleEditView}
					patchWorkout={this.props.patchWorkout}
					renderReps={this.renderReps}
					allExercises={this.props.allExercises}
				/>
				{editView === true ? (
					<ExerciseMoreDetailsLog
						exercise={exercise}
						day_id={this.props.day_id}
						allExercises={this.props.allExercises}
						exerciseOrder={this.props.exerciseOrder}
					/>
				) : null}
			</div>
		);
	}
}

export default ExerciseMoreDetails;
