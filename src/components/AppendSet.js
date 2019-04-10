import React, { Component } from 'react';

export class AppendSet extends Component {
	state = {
		reps: 8,
		weight: null
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: parseInt(e.target.value) });
	};

	handleSubmit = (e) => {
		e.preventDefault();
	};

	render() {
		const { exercise } = this.props;
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="reps">
					Reps:
					<input
						onChange={this.handleChange}
						type="number"
						min={1}
						name="reps"
						id="reps"
						defaultValue={8}
						required
					/>
				</label>
				<label htmlFor="weight">
					Weight:
					<input onChange={this.handleChange} type="number" min={0} name="weight" id="weight" required />
				</label>
				<input type="submit" value="Log New Set" />
				<button>Cancel</button>
			</form>
		);
	}
}

export default AppendSet;
