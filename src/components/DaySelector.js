import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddDay from './AddDay';
import CatchAll from './CatchAll';

export class DaySelector extends Component {
	state = {
		currentWeek: null,
		days: [],
		displayPopup: false,
		loading: true
	};

	getCurrentWeek = async () => {
		try {
			const { week_id } = this.props.match.params;
			const currentWeek = await axios({
				method: 'get',
				url: `/weeks/${week_id}`,
				timeout: 4 * 1000
			});
			this.setState({
				currentWeek: currentWeek.data.data,
				days: currentWeek.data.data.days
			});
		} catch (error) {
			console.log(error);
		}
	};

	async componentDidMount() {
		await this.getCurrentWeek();
		this.setState({ loading: false });
	}

	togglePopup = () => {
		const { displayPopup } = this.state;
		this.setState({ displayPopup: !displayPopup });
	};

	cancelAddDay = () => {
		this.setState({ displayPopup: false });
	};

	render() {
		const { days, displayPopup, currentWeek, loading } = this.state;
		if (days && currentWeek) {
			return (
				<div>
					<h1>{`Week ${currentWeek.week}`}</h1>
					<ul>
						{days.map((day, index) => {
							return (
								<li key={index}>
									<Link
										to={`/${this.props.match.params.week_id}/${day._id}`}
									>{`Day ${day.day} - ${day.name}`}</Link>
								</li>
							);
						})}
					</ul>
					<div>
						<button onClick={this.togglePopup}>{displayPopup ? 'Cancel' : 'Add Day'}</button>
					</div>
					<div>
						<Link to="/">Back</Link>
					</div>
					{displayPopup ? (
						<React.Fragment>
							<AddDay
								days={this.state.days}
								week_id={this.props.match.params.week_id}
								togglePopup={this.togglePopup}
								getCurrentWeek={this.getCurrentWeek}
							/>
							<button onClick={this.cancelAddDay}>Cancel</button>
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
						<Link to="/">Back</Link>
					</div>
				</div>
			);
		}
		return <CatchAll />;
	}
}

export default DaySelector;
