import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    complete: false,
    firstName: '',
    starWars: {}
  }

  async componentDidMount() {
    const data = await fetch('https://swapi.co/api/people/1/').then(res => res.json());
    this.setState({starWars: data})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h3 data-testid="starWars">{this.state.starWars.url ? 'Received StarWars data!' : 'Something went wrong'}</h3>
      </div>
    );
  }
}

export default App;
