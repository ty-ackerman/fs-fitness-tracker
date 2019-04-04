import React, { Component } from 'react'
import axios from "axios"

export class FindExercise extends Component {
    state = {
        name: "",
        primaryMuscle: "",
        secondaryMuscle:""
    }

    // perform axios get request to query for an exercise with a matching name/prumary muscle/secondary muscle
    // create /GET route to query for that specific element
    // return all exercises that match the specifications
    // allow user to select the specific exercise and change the state of exercise in parent component
    // if nothing is returned, have an error handling message
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit = async (e) => {
        e.preventDefault()
      const {name} = this.state
       const res = await axios.get(`/all-exercises/search/${name}`)
       console.log(res.data.data)
    }
  render() {
    return (
      <div>
        <h1>Find Exercise</h1>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="name" >
            Exercise Name: 
            <input type="text" name="name" id="name" onChange={this.handleChange}/>
            <input type="submit" value="Search For Exercise"/>
            </label>
        </form>
      </div>
    )
  }
}

export default FindExercise
