import React, { Component } from 'react';

export class SearchedExercise extends Component {
	render() {
		const { exercise } = this.props;
		return (
			<div>
				<p>{exercise.name}</p>
				<ul>
					<li>{exercise.primaryMuscle}</li>
					{exercise.secondaryMuscle ? <li>{exercise.secondaryMuscle}</li> : null}
					<button onClick={() => this.props.addQueriedExercise(exercise)}>Select Exercise</button>
				</ul>
			</div>
		);
	}
}

export default SearchedExercise;
