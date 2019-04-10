import React, { Component } from 'react';
import axios from 'axios';
import RepEdit from './RepEdit';
import RepDisplay from './RepDisplay';

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

		// NOTE - There should be separate components for edit view and regular view, as well as to handle the view for when a workout has been added
		const { exercise } = this.props;
		const { editView } = this.state;
		if (editView.length) {
			return (
				<div>
					Click the Set to Log:
					<div>
						{exercise.repsPlanned.map((rep, index) => {
							return editView[index].edit ? (
								<RepEdit
									key={index}
									index={index}
									rep={rep}
									day_id={this.props.day_id}
									toggleEditView={this.toggleEditView}
									exercise={exercise}
									allExercises={this.props.allExercises}
									exerciseOrder={this.props.exerciseOrder}
								/>
							) : (
								<RepDisplay
									key={index}
									toggleEditView={this.toggleEditView}
									index={index}
									rep={rep}
									exercise={exercise}
								/>
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
