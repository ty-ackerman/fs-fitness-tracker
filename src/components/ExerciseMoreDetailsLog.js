import React, { Component } from 'react';
import axios from 'axios';

export class ExerciseMoreDetailsLog extends Component {
	state = {
		editView: []
	};

	componentDidMount() {
		this.setEditViewState();
	}

	setEditViewState = () => {
		const editView = [];
		const { repsPlanned } = this.props.exercise;
		repsPlanned.map((rep, index) => {
			editView.push({ edit: false });
		});
		this.setState({ editView });
	};

	toggleEditView = (index) => {
		const { editView } = this.state;
		editView[index].edit = !editView[index].edit;
		this.setState({ editView });
	};
	render() {
		// Scenarios:
		// 1 - User enters reps from scratch (nothing previously logged)
		// 2 - User edits reps previously entered
		// 3 - User does additional reps and therefore needs to add
		// 4 - User doesn't do planned amount of reps (maybe just leave blank?)
		const { exercise } = this.props;
		const { editView } = this.state;
		if (editView.length) {
			return (
				<div>
					Click the Set to Log:
					<div>
						{exercise.repsPlanned.map((rep, index) => {
							return editView[index].edit ? (
								<div key={index}>Works</div>
							) : (
								<p
									onClick={() => this.toggleEditView(index)}
									style={{ color: 'limegreen', cursor: 'pointer' }}
									key={index}
								>{`Set #${index + 1} - Target Reps: ${rep}`}</p>
							);
						})}
					</div>
				</div>
			);
		}
		return <div>Loading</div>;
	}
}

export default ExerciseMoreDetailsLog;
