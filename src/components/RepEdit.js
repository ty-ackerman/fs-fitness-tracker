import React, { Component } from 'react';
import axios from 'axios';

export class RepEdit extends Component {
	state = {
		reps: this.props.rep,
		weight: null
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: parseInt(e.target.value)
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { reps, weight } = this.state;
		const { exercise, toggleEditView, index } = this.props;
		try {
			const res = await axios.patch(`/exercises/log-exercise/${exercise._id}`, { reps, weight });
			console.log(res.data.data);
			toggleEditView(index);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { rep } = this.props;
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="reps">
					Reps:
					<input
						onChange={this.handleChange}
						type="number"
						defaultValue={rep}
						min={1}
						id="reps"
						name="reps"
						required
					/>
				</label>
				<label htmlFor="weight">
					Weight (lbs):
					<input onChange={this.handleChange} type="number" min={0} id="weight" name="weight" required />
				</label>
				<input type="submit" value="Log" />
			</form>
		);
	}
}

export default RepEdit;
