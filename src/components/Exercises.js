import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddLoggedExercise from './AddLoggedExercise';
import ExerciseInfo from './ExerciseInfo';
import FindExercise from './FindExercise';
import AddExercise from './AddExercise';
import CatchAll from './CatchAll';

export class Exercises extends Component {
	state = {
		exercises: [],
		currentDay: null,
		displayPopup: false,
		loggedExercise: {
			setsPlanned: 3,
			repsPlanned: [],
			repsActual: [],
			setsActual: null,
			exercise: null,
			modification: null,
			tempo: '1-0-1-0',
			rest: 60,
			comments: ''
		},
		loading: true,
		addNew: false,
		queriedExercise: null
	};

	formatRepsActual = () => {
		const repsActual = [];
		const { loggedExercise } = this.state;
		const { setsPlanned } = loggedExercise;
		for (let set = 0; set < setsPlanned; set++) {
			repsActual.push({ set: set + 1, reps: null, weight: null });
		}
		loggedExercise.repsActual = repsActual;
		loggedExercise.setsActual = repsActual.length;
		this.setState({ loggedExercise });
	};

	getCurrentDay = async () => {
		try {
			const { day_id } = this.props.match.params;
			const currentDay = await axios({
				method: 'get',
				url: `/workouts/${day_id}`,
				timeout: 3 * 1000
			});
			await this.setState({ currentDay: currentDay.data.data });
		} catch (error) {
			console.log(error);
		}
	};

	getExercises = async () => {
		try {
			const { day_id } = this.props.match.params;
			const res = await axios({
				method: 'get',
				url: `/workouts/${day_id}`,
				timeout: 3 * 1000
			});
			this.setState({ exercises: res.data.data.exercises });
		} catch (error) {
			console.log(error);
		}
	};

	async componentDidMount() {
		await this.getExercises();
		await this.getCurrentDay();
		this.setState({ loading: false });
	}

	togglePopup = () => {
		this.setState({ displayPopup: !this.state.displayPopup });
	};

	clearInputs = () => {
		const loggedExercise = {
			setsPlanned: 3,
			repsPlanned: [],
			exercise: null,
			modification: 'none',
			tempo: '1-0-1-0',
			rest: 60,
			comments: ''
		};
		this.setState({
			loggedExercise
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

	addQueriedExercise = (exercise) => {
		const { loggedExercise } = this.state;
		loggedExercise.exercise = exercise;
		this.setState({ loggedExercise });
	};

	addExerciseToLibrary = async (
		setsPlanned,
		repsPlanned,
		repsActual,
		setsActual,
		exercise,
		modification,
		tempo,
		rest
	) => {
		try {
			const res = await axios.post('/exercises', {
				setsPlanned,
				repsPlanned,
				repsActual,
				setsActual,
				exercise,
				modification,
				tempo,
				rest
			});
			return res.data.data;
		} catch (error) {
			console.log(error);
		}
	};

	addLoggedExercise = async (e) => {
		e.preventDefault();
		try {
			await this.formatRepsActual();
			const {
				setsPlanned,
				repsPlanned,
				repsActual,
				setsActual,
				exercise,
				modification,
				tempo,
				rest
			} = this.state.loggedExercise;
			const currentDayId = this.state.currentDay._id;
			const newLoggedExercise = await this.addExerciseToLibrary(
				parseInt(setsPlanned),
				repsPlanned,
				repsActual,
				setsActual,
				exercise,
				modification,
				tempo,
				parseInt(rest)
			);
			const { exercises } = this.state;
			exercises.push(newLoggedExercise);
			console.log(exercises);
			const res = await axios.patch(`/workouts/add-workout/${currentDayId}`, {
				exercises
			});
			console.log(res.data.data);
			await this.getExercises();
			await this.clearInputs();
			await this.togglePopup();
		} catch (error) {
			console.log(error);
		}
	};

	cancelLog = () => {
		const { loggedExercise } = this.state;
		loggedExercise.exercise = null;
		this.setState({ displayPopup: false, loggedExercise, addNew: false });
	};

	addNewToggle = () => {
		console.log('clicked');
		this.setState({ addNew: !this.state.addnew });
	};

	updateQueriedExercise = (e) => {
		if (e.target.name === 'name') {
			this.setState({ queriedExercise: e.target.value });
		}
	};

	render() {
		const { exercises, currentDay, displayPopup, loggedExercise, loading, addNew } = this.state;
		if (exercises && currentDay) {
			const { name, day } = currentDay;
			return (
				<div>
					<h1>{`Day ${day} - ${name}`}</h1>
					<ul>
						{exercises.map((exercise, index) => {
							return (
								<ExerciseInfo
									getExercises={this.getExercises}
									key={index}
									exercise={exercise}
									index={index}
									exercises={exercises}
									day_id={this.state.currentDay._id}
								/>
							);
						})}
					</ul>
					<div>
						<button onClick={this.togglePopup}>Add Exercise</button>
					</div>
					<div>
						<Link to={`/${this.props.match.params.week_id}`}>Back</Link>
					</div>

					{displayPopup && !loggedExercise.exercise ? !addNew ? (
						<React.Fragment>
							<FindExercise
								addQueriedExercise={this.addQueriedExercise}
								addNewToggle={this.addNewToggle}
								updateQueriedExercise={this.updateQueriedExercise}
							/>
							<button onClick={this.cancelLog}>Cancel</button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<AddExercise
								getSubmittedValues={this.getSubmittedValues}
								addNewToggle={this.addNewToggle}
								queriedExercise={this.state.queriedExercise}
							/>
							<button onClick={this.cancelLog}>Cancel</button>
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
							<button onClick={this.cancelLog}>Cancel</button>
						</React.Fragment>
					) : null}
				</div>
			);
		}
		if (loading) {
			return (
				<div>
					<h1>Loading</h1>
					<div>
						<Link to={`/${this.props.match.params.week_id}`}>Back</Link>
					</div>
				</div>
			);
		}
		return <CatchAll />;
	}
}

export default Exercises;
