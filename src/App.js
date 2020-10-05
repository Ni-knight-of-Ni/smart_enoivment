import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Select from 'react-select'
import './App.css';
import Multi from './multi'
import 'semantic-ui-css/semantic.min.css';

/*******************form med select fra en api***************/

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectOptions: [],
      level: "",
      name: '',
      Type: '',
    }
  }

  async getOptions() {
    const res = await axios.get('https://api.guildwars2.com/v2/items?ids=112, 113, 114, 115, 116, 117, 118, 119, 120')
    const data = res.data

    const options = data.map(d => ({
      "value": d.level,
      "label": d.name,
      "label2": d.type

    }))

    this.setState({ selectOptions: options })

  }

  handleChange(e) {
    console.log(e)
    this.setState({ level: e.value, name: e.label, type: e.label2 })
  }

  componentDidMount() {
    this.getOptions()
  }

  render() {
    console.log(this.state.selectOptions)
    return (
      <div className="app">
        <div className="map">
          <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
          <p>You have selected <strong>{this.state.name}</strong> whose level is <strong>{this.state.level}</strong> and type is <strong>{this.state.type}</strong></p>
          <Multi />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;