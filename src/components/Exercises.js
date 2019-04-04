import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddLoggedExercise from './AddLoggedExercise';
import ExerciseInfo from './ExerciseInfo';
import FindExercise from './FindExercise';
import AddExercise from './AddExercise';

export class Exercises extends Component {
	state = {
		exercises: [],
		currentDay: null,
		displayPopup: false,
		loggedExercise: {
			setsPlanned: 3,
			repsPlanned: [],
			exercise: null,
			modification: '',
			tempo: '1-0-1-0',
			rest: 60,
			comments: ''
		}
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

	clearInputs = () => {
		this.setState({
			loggedExercise: {
				setsPlanned: '',
				repsPlanned: '',
				exercise: {},
				modification: '',
				comments: ''
			}
		});
	};

	handleChange = (e) => {
		const loggedExercise = this.state.loggedExercise;
		loggedExercise[e.target.name] = e.target.value;
		this.setState({ loggedExercise });
	};

	handleRepChange = (e) => {
		const { repsPlanned, setsPlanned } = this.state.loggedExercise;
		repsPlanned[parseInt(e.target.name)] = parseInt(e.target.value);
		if (parseInt(e.target.name) === 0) {
			for (let i = 1; i < setsPlanned; i++) {
				repsPlanned[i] = parseInt(e.target.value);
			}
		}
		this.setState({ repsPlanned });
	};

	getSubmittedValues = async (values) => {
		const { _id } = values;
		const { loggedExercise } = this.state;
		const exercise = await axios.get(`/all-exercises/${_id}`);
		loggedExercise.exercise = exercise.data.data;
		this.setState({ loggedExercise });
	};

	addLoggedExercise = async (e) => {
		e.preventDefault();
		try {
			const { setsPlanned, repsPlanned, exercise, modification, tempo, rest } = this.state.loggedExercise;
			// console.log(this.state.currentDay);
			const currentDayId = this.state.currentDay._id;
			const allExercises = this.state.exercises;
			const newLoggedExercise = await axios.patch(`/workouts/${currentDayId}`, {
				setsPlanned: parseInt(setsPlanned),
				repsPlanned,
				exercise,
				modification,
				tempo,
				rest: parseInt(rest),
				allExercises
			});
			console.log(newLoggedExercise);
			await this.getExercises();
			await this.clearInputs();
			await this.togglePopup();
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { exercises, currentDay, displayPopup, loggedExercise } = this.state;
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
					<div>
						<button onClick={this.togglePopup}>Add Exercise</button>
					</div>
					<div>
						<Link to={`/${this.props.match.params.week_id}`}>Back</Link>
					</div>
					{displayPopup && !loggedExercise.exercise ? (
						<React.Fragment>
							<FindExercise />
							<AddExercise getSubmittedValues={this.getSubmittedValues} />
						</React.Fragment>
					) : null}
					{displayPopup && loggedExercise.exercise ? (
						<React.Fragment>
							<AddLoggedExercise
								handleChange={this.handleChange}
								handleRepChange={this.handleRepChange}
								loggedExercise={this.state.loggedExercise}
								addLoggedExercise={this.addLoggedExercise}
							/>
						</React.Fragment>
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
