import React, { Component } from 'react';

export class RepDisplay extends Component {
	componentDidMount() {
		console.log(this.props.exercise.repsActual[this.props.index]);
	}

	render() {
		const { rep, index, toggleEditView, exercise } = this.props;
		if (exercise.repsActual[index].reps) {
			return (
				<div>
					<p
						onClick={() => toggleEditView(index)}
						style={{ color: 'green', cursor: 'pointer' }}
						key={index}
					>{`Set #${index + 1} - Reps Completed: ${exercise.repsActual[index].reps} - Weight Used: ${exercise
						.repsActual[index].weight}`}</p>
				</div>
			);
		}
		return (
			<div>
				<p
					onClick={() => toggleEditView(index)}
					style={{ color: 'red', cursor: 'pointer' }}
					key={index}
				>{`Set #${index + 1} - Target Reps: ${rep}`}</p>
			</div>
		);
	}
}

export default RepDisplay;
