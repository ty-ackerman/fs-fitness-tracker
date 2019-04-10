import React, { Component } from 'react';
import axios from 'axios';
import RepEdit from './RepEdit';
import RepDisplay from './RepDisplay';
import AppendSet from './AppendSet';

export class ExerciseMoreDetailsLog extends Component {
	state = {
		editView: [],
		completed: false,
		addingNewSet: false
	};

	componentDidMount() {
		this.setEditViewState();
		this.checkIfCompleted();
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

	checkIfCompleted = () => {
		const { repsActual } = this.props.exercise;
		let completed = true;
		repsActual.map((set) => {
			if (!set.reps) {
				completed = false;
			}
		});
		this.setState({ completed });
	};

	toggleNewSet = () => {
		this.setState({ addingNewSet: !this.state.addingNewSet });
	};

	render() {
		const { exercise } = this.props;
		const { editView, completed, addingNewSet } = this.state;
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
									checkIfCompleted={this.checkIfCompleted}
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
						{addingNewSet ? <AppendSet exercise={exercise} /> : null}
					</div>
					{completed ? <button onClick={this.toggleNewSet}>Add New Set</button> : null}
				</div>
			);
		}
		return <div>Loading</div>;
	}
}

export default ExerciseMoreDetailsLog;
