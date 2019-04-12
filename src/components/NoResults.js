import React, { Component } from 'react';

export class NoResults extends Component {
	render() {
		return (
			<div>
				<p>No Results</p>
				<button onClick={this.props.addNewToggle}>Add Exercise</button>
			</div>
		);
	}
}

export default NoResults;
