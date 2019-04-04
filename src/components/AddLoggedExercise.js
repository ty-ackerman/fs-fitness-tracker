import React, { Component } from 'react';

export class AddLoggedExercise extends Component {
	render() {
		const { handleChange, handleRepChange } = this.props;
		const { setsPlanned, repsPlanned, exercise } = this.props.loggedExercise;

		let reps = [];
		for (let set = 0; set < setsPlanned; set++) {
			reps.push(<p>One Set</p>);
		}
		return (
			<div>
				<h1>Add Logged Exercise</h1>
				<form onSubmit={this.props.addLoggedExercise}>
					<label htmlFor="exercise">
						Exercise Name
						<input
							onChange={handleChange}
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
							onChange={handleChange}
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
						return (
							<label key={index} htmlFor="repsPlanned">
								Reps
								<input
									onChange={handleRepChange}
									type="number"
									id={`repsPlanned${index}`}
									name={index}
									min={1}
									defaultValue={index !== 0 ? repsPlanned[0] : null}
									required
								/>
							</label>
						);
					})}

					<label htmlFor="tempo">
						Tempo
						<input onChange={handleChange} type="text" id="tempo" name="tempo" placeholder="1-0-1-0" />
					</label>
					<label htmlFor="rest">
						Rest in Seconds
						<input onChange={handleChange} type="number" id="rest" name="rest" defaultValue={60} min={0} />
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
