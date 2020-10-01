import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Select from 'react-select'
import './App.css';
import Multi from './multi'
import 'semantic-ui-css/semantic.min.css';


/************api eksempel med random advice***************/
class App extends React.Component {
  state = { advice: '' };
  componentDidMount() {
    this.fetchAdvice();
  }
  fetchAdvice = () => {
    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice }
        );
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { advice } = this.state

    return (
      <div className="app">
        <div className="card">
          <h1 className="heading">{advice}</h1>
        </div>
      </div>
    );
  }
}

/***************************** form uden api************************************************/

class TypeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'trinket' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('Type: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="app">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Type:
          <select value={this.state.value} onChange={this.handleChange}>
                <option value="weapon">Weapon</option>
                <option value="armor">Armor</option>
                <option value="trinket">Trinket</option>
                <option value="back item">Back item</option>
              </select>
            </label>
            <label>
              Level:
          <select value={this.state.value} onChange={this.handleChange}>
                <option value="1-9">1-9</option>
                <option value="10-19">10-19</option>
                <option value="20-29">20-29</option>
                <option value="30-39">30-39</option>
                <option value="40-49">40-49</option>
                <option value="50-59">50-59</option>
                <option value="60-69">60-69</option>
                <option value="70-79">70-79</option>
                <option value="80">80</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <TypeForm />,
  document.getElementById('type')
);



/*******************form med select fra en api***************/


class Form extends React.Component {

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
  <Form />,
  document.getElementById('map')
);





export default App;