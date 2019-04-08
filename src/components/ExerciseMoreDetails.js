import React, { Component } from 'react';

export class ExerciseMoreDetails extends Component {
	state = {
		editView: false
	};

	toggleEditView = () => {
		this.setState({ editView: !this.state.editView });
	};

	renderReps = (repsArray) => {
		const repsString = repsArray.join(' - ');
		return repsString;
	};

	render() {
		const { editView } = this.state;
		const { exercise } = this.props;
		if (!editView) {
			return (
				<div>
					<p>{`Sets Planned: ${exercise.setsPlanned}`}</p>
					<p>{`Reps Planned: ${this.renderReps(exercise.repsPlanned)}`}</p>
					<button onClick={this.props.deleteExercise}>Delete Exercise</button>
					<button onClick={this.toggleEditView}>Log Exercise</button>
				</div>
			);
		}
		return (
			<div>
				<p>Edit View</p>
			</div>
		);
	}
}

export default ExerciseMoreDetails;
