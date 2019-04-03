import React, { Component } from 'react';
import AddExercise from './AddExercise';
import axios from 'axios';

export class AddLoggedExercise extends Component {
	state = {
		displayPopup: false,
		setsPlanned: 3,
		repsPlanned: [],
		exercise: {},
		modification: '',
		tempo: '1-0-1-0',
		rest: 60,
		comments: ''
	};

	clearInputs = () => {
		this.setState({
			setsPlanned: '',
			repsPlanned: '',
			exercise: {},
			modification: '',
			comments: ''
		});
	};

	togglePopup = () => {
		this.setState({ displayPopup: !this.state.displayPopup });
	};

	getSubmittedValues = async (values) => {
		const { _id } = values;
		const exercise = await axios.get(`/all-exercises/${_id}`);
		this.setState({ exercise: exercise.data.data });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleRepChange = (e) => {
		const {repsPlanned} = this.state
		repsPlanned[parseInt(e.target.name)] = parseInt(e.target.value);
		this.setState({repsPlanned})
	}

	addLoggedExercise = async (e) => {
		e.preventDefault();
		try {
			const { setsPlanned, repsPlanned, exercise, modification, tempo, rest } = this.state;
			const { currentDayId, allExercises, getExercises } = this.props;
			const newLoggedExercise = await axios.patch(`/workouts/${currentDayId}`, {
				setsPlanned: parseInt(setsPlanned),
				repsPlanned: repsPlanned,
				exercise,
				modification,
				tempo,
				rest: parseInt(rest),
				allExercises
			});
			await getExercises();
			await this.clearInputs();
			await this.props.togglePopup();
		} catch (error) {
			console.log(error);
		}
	};
	

	render() {
		const { displayPopup, exercise, setsPlanned } = this.state;

		let reps = [];
		for (let set = 0; set < setsPlanned; set++) {
			reps.push(<p>One Set</p>)
		}
		return (
			<div>
				<h1>Add Logged Exercise</h1>
				<div>
					<button onClick={this.togglePopup}>Create New Exercise</button>
				</div>
				{displayPopup ? (
					<AddExercise
						getExercises={this.props.getExercises}
						togglePopup={this.togglePopup}
						getSubmittedValues={this.getSubmittedValues}
					/>
				) : null}
				<form onSubmit={this.addLoggedExercise}>
					<label htmlFor="exercise">
						Exercise Name
						<input
							onChange={this.handleChange}
							type="text"
							defaultValue={exercise.name ? exercise.name : null}
							id="exercise"
							name="exercise"
							required
						/>
					</label>
					<br />
					<label htmlFor="setsPlanned">
						Sets
						<input
							onChange={this.handleChange}
							type="number"
							id="setsPlanned"
							name="setsPlanned"
							defaultValue={3}
							min={1}
							max={10}
							required
						/>
					</label>
					<br />
					{reps.map((set, index) => {
					return <label key={index} htmlFor="repsPlanned">
						Reps
						<input
							onChange={this.handleRepChange}
							type="number"
							id={`repsPlanned${index}`}
							name={index}
							min={1}
							required
						/>
					</label>

					})}
				
					<label htmlFor="tempo">
						Tempo
						<input onChange={this.handleChange} type="text" id="tempo" name="tempo" placeholder="1-0-1-0" />
					</label>
					<label htmlFor="rest">
						Rest in Seconds
						<input onChange={this.handleChange} type="number" id="rest" name="rest" defaultValue={60} min={0}/>
					</label>
					<div>
						<input type="submit" value="Save Exercise" />
					</div>
				</form>
			</div>
		);
	}
}

export default AddLoggedExercise;
