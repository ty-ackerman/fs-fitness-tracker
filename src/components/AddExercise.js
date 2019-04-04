import React, { Component } from 'react';
import axios from 'axios';

export class AddExercise extends Component {
	state = {
		name: 'Front Squat',
		primaryMuscle: 'Quadriceps',
		secondaryMuscle: 'Hamstrings',
		comments: 'Ass to the grass'
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	// This function will add the new exercise activity to the library of all available exercises
	//The user will the have to create their logged exercise based on the available exercises
	addExercise = async (e) => {
		e.preventDefault();
		const { name, primaryMuscle, secondaryMuscle, comments } = this.state;
		try {
			const submittedValue = await axios.post('/all-exercises', {
				name,
				primaryMuscle,
				secondaryMuscle,
				comments
			});
			this.props.getSubmittedValues(submittedValue.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<div>
				<h2>Add Exercise</h2>
				<form onSubmit={this.addExercise}>
					<label htmlFor="name">
						Exercise Name
						<input
							onChange={this.handleChange}
							type="text"
							id="name"
							name="name"
							defaultValue="Front Squat"
							required
						/>
					</label>
					<br />
					<label htmlFor="primaryMuscle">
						Primary Muscle
						<input
							onChange={this.handleChange}
							type="text"
							id="primaryMuscle"
							name="primaryMuscle"
							defaultValue="Quadriceps"
							required
						/>
					</label>
					<br />
					<label htmlFor="secondaryMuscle">
						Secondary Muscle
						<input
							onChange={this.handleChange}
							type="text"
							id="secondaryMuscle"
							name="secondaryMuscle"
							defaultValue="Hamstrings"
						/>
					</label>
					<br />
					<label htmlFor="comments">
						Comments
						<textarea
							onChange={this.handleChange}
							name="comments"
							id="comments"
							cols="30"
							rows="10"
							defaultValue="Ass to the grass"
						/>
					</label>
					<div>
						<input type="submit" value="Add Exercise" />
					</div>
				</form>
			</div>
		);
	}
}

export default AddExercise;
