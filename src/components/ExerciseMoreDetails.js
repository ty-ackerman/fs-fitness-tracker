import React, { Component } from 'react';

export class ExerciseMoreDetails extends Component {
	state = {
		editView: false
	};

	render() {
		const { editView } = this.state;
		const { exercise } = this.props.exercise;
		if (!editView) {
			return (
				<div>
					<p>Sets: </p>
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
