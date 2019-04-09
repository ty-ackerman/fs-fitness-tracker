import React, { Component } from 'react';

export class ExerciseMoreDetailsPlanned extends Component {
	render() {
		const { exercise } = this.props;

		return (
			<div>
				<p>{`Target Sets: ${exercise.setsPlanned}`}</p>
				<p>{`Target Reps: ${this.props.renderReps(exercise.repsPlanned)}`}</p>
				<p>{`Tempo: ${exercise.tempo}`}</p>
				<p>{`Rest: ${exercise.rest}s.`}</p>
				{exercise.modification ? <p>{`Modification: ${exercise.modification.acronym}`}</p> : null}
				<button onClick={this.props.patchWorkout}>Delete Exercise</button>
				<button onClick={this.props.toggleEditView}>Log Exercise</button>
			</div>
		);
	}
}

export default ExerciseMoreDetailsPlanned;
