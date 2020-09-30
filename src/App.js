import React from 'react'
import axios from 'axios';

import './App.css';

class App extends React.Component {

  state =  {stashes : '' };


  componentDidMount() {
      this.fetchAdivice();
  }

  fetchAdivice = () => {
    axios.get('http://api.pathofexile.com/public-stash-tabs ')
      .then((response) => {
        const {stashes} = response.data;
        this.setState({stashes});
        console.log(stashes)

      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    return (<h1>asad</h1>);
  }
}

export default App;
