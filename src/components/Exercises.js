import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddLoggedExercise from './AddLoggedExercise';
import ExerciseInfo from './ExerciseInfo';

export class Exercises extends Component {
	state = {
		exercises: [],
		currentDay: null,
		displayPopup: false
	};

	getCurrentDay = async () => {
		const { day_id } = this.props.match.params;
		const currentDay = await axios.get(`/workouts/${day_id}`);
		this.setState({ currentDay: currentDay.data.data });
	};

	getExercises = async () => {
		const { day_id } = this.props.match.params;
		const res = await axios.get(`/workouts/${day_id}`);
		this.setState({ exercises: res.data.data.exercises });
	};

	async componentDidMount() {
		await this.getExercises();
		await this.getCurrentDay();
	}

	togglePopup = () => {
		this.setState({ displayPopup: !this.state.displayPopup });
	};

	render() {
		const { exercises, currentDay, displayPopup } = this.state;
		if (exercises && currentDay) {
			const { name, day } = currentDay;
			return (
				<div>
					<h1>{`Day ${day} - ${name}`}</h1>
					<ul>
						{exercises.map((exercise, index) => {
							return <ExerciseInfo key={index} exercise={exercise} />;
						})}
					</ul>
					<ExerciseInfo exercises={exercises} />
					<div>
						<button onClick={this.togglePopup}>Add Exercise</button>
					</div>
					<div>
						<Link to={`/${this.props.match.params.week_id}`}>Back</Link>
					</div>
					{displayPopup ? (
						<AddLoggedExercise
							getExercises={this.getExercises}
							togglePopup={this.togglePopup}
							currentDayId={currentDay._id}
							allExercises={exercises}
						/>
					) : null}
				</div>
			);
		}
		return (
			<div>
				<h1>Loading</h1>
				<div>
					<Link to={`/${this.props.match.params.week_id}`}>Back</Link>
				</div>
			</div>
		);
	}
}

export default Exercises;
