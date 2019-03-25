import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Exercises extends Component {
	state = {
		exercises: []
	};

	getExercises = async () => {
		const { day_id } = this.props.match.params;
		const res = await axios.get(`/workouts/${day_id}`);
		this.setState({ exercises: res.data.data.exercises });
	};

	componentDidMount() {
		this.getExercises();
	}

	render() {
		const { exercises } = this.state;
		if (exercises.length) {
			return (
				<div>
					<h1>Exercises</h1>
					<ul>
						{exercises.map((exercise, index) => {
							return <li key={index}>{exercise.exercise.name}</li>;
						})}
					</ul>
					<div>
						<Link to="/">Back Home</Link>
					</div>
				</div>
			);
		}
		return (
			<div>
				<h1>Loading</h1>
				<div>
					<Link to="/">Back Home</Link>
				</div>
			</div>
		);
	}
}

export default Exercises;
