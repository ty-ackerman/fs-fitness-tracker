import React, { Component } from 'react';
import axios from 'axios';
import SearchedExercise from './SearchedExercise';
import NoResults from './NoResults';

export class FindExercise extends Component {
	state = {
		name: '',
		primaryMuscle: '',
		secondaryMuscle: '',
		res: [],
		loading: false,
		queried: false
	};

	// perform axios get request to query for an exercise with a matching name/prumary muscle/secondary muscle
	// create /GET route to query for that specific element
	// return all exercises that match the specifications
	// allow user to select the specific exercise and change the state of exercise in parent component
	// if nothing is returned, have an error handling message
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
		this.props.updateQueriedExercise(e);
	};

	handleLoading = async () => {
		await this.setState({ loading: true });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		this.handleLoading();
		try {
			const { name } = this.state;
			const res = await axios.get(`/all-exercises/search/${name}`);
			this.setState({ res: res.data.data, loading: false, queried: true });
		} catch (err) {
			console.log(err);
			this.setState({ loading: false, queried: true });
		}
	};
	render() {
		const { res, loading, queried, name } = this.state;
		return (
			<div>
				<h1>Find Exercise</h1>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="name">
						Exercise Name:
						<input
							type="text"
							name="name"
							id="name"
							onChange={this.handleChange}
							autoComplete="off"
							required
						/>
						<input type="submit" value="Search For Exercise" />
					</label>
				</form>
				{res.map((exercise, index) => {
					return (
						<SearchedExercise
							addQueriedExercise={this.props.addQueriedExercise}
							exercise={exercise}
							key={index}
						/>
					);
				})}
				{loading && !queried ? <p>Loading</p> : null}
				{!loading && queried && res.length === 0 ? <NoResults addNewToggle={this.props.addNewToggle} /> : null}
			</div>
		);
	}
}

export default FindExercise;
