import React, { Component } from 'react';
import ExerciseMoreDetails from './ExerciseMoreDetails';

export class ExerciseInfo extends Component {
	state = {
		expandedView: false
	};

	expand = () => {
		this.setState({ expandedView: !this.state.expandedView });
	};
	render() {
		const { exercise } = this.props;
		const { expandedView } = this.state;
		if (exercise) {
			return (
				<div onClick={this.expand}>
					<p>{exercise.exercise.name}</p>
					{expandedView ? <ExerciseMoreDetails exercise={exercise} /> : null}
				</div>
			);
		}
	}
}

export default ExerciseInfo;
