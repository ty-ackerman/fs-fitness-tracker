import React, { Component } from 'react';
import axios from 'axios';

export class AddWeek extends Component {
	state = {
		week: this.props.weeks.length + 1
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: parseInt(e.target.value) });
	};

	addWeek = async (e) => {
		e.preventDefault();
		const { week } = this.state;
		const { refresh, togglePopup, enterNewWeek } = this.props;
		try {
			const newWeek = await axios.post('/weeks', { week });
			console.log(newWeek);
			await refresh();
			togglePopup();
			enterNewWeek(newWeek);
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<div>
				<h1>Add Week</h1>
				<form onSubmit={this.addWeek}>
					<label htmlFor="week">
						Week Number
						<input
							type="number"
							id="week"
							name="week"
							defaultValue={this.props.weeks.length + 1}
							onChange={this.handleChange}
							min={1}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default AddWeek;
