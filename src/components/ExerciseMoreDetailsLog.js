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

	setEditViewState = (reps) => {
		const editView = [];
		const { repsActual } = this.props.exercise;
		repsActual.map((rep, index) => {
			editView.push({ edit: false });
		});
		this.setState({ editView });
	};

	toggleEditView = (index) => {
		console.log(index, this.state.editView);
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

	updateWorkoutDay = async () => {
		//This function will be called when the user updates the reps for their workout
		const { allExercises, day_id } = this.props;
		try {
			const res = await axios.patch(`/workouts/add-workout/${day_id}`, { exercises: allExercises });
		} catch (err) {
			console.log(err);
		}
	};

	updateExerciseRepsActual = async (repsActual, exercise_id, index) => {
		try {
			const res = await axios.patch(`/exercises/log-exercise/${exercise_id}`, { repsActual });
			await this.setEditViewState();
			this.toggleEditView(index);
			this.checkIfCompleted();
			await this.updateWorkoutDay();
			return res.data.data;
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { exercise } = this.props;
		const { editView, completed, addingNewSet } = this.state;
		if (editView.length) {
			return (
				<div>
					Click the Set to Log:
					<div>
						{exercise.repsActual.map((rep, index) => {
							return editView[index].edit ? (
								<RepEdit
									key={index}
									index={index}
									rep={rep}
									day_id={this.props.day_id}
									exercise={exercise}
									allExercises={this.props.allExercises}
									exerciseOrder={this.props.exerciseOrder}
									updateExerciseRepsActual={this.updateExerciseRepsActual}
									toggleEditView={this.toggleEditView}
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
						{addingNewSet ? (
							<AppendSet
								updateWorkoutDay={this.updateWorkoutDay}
								exercise={exercise}
								updateExerciseRepsActual={this.updateExerciseRepsActual}
								index={exercise.repsActual.length}
							/>
						) : null}
					</div>
					{completed ? <button onClick={this.toggleNewSet}>Add New Set</button> : null}
				</div>
			);
		}
		return <div>Loading</div>;
	}
}

export default ExerciseMoreDetailsLog;
