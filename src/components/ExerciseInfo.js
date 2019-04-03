import React, { Component } from 'react';

export class ExerciseInfo extends Component {
	componentDidMount() {
		console.log(this.props.exercise);
	}
	render() {
		return (
			<li>
				<p>Exercice</p>
			</li>
		);
	}
}

export default ExerciseInfo;
