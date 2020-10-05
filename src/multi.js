import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import './App.css';
import 'semantic-ui-css/semantic.min.css';

export default class Multi extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectOptions: [],
            value: []
        }
    }

    async getOptions() {
        const res = await axios.get('https://api.guildwars2.com/v2/items?ids=112, 113, 114, 115, 116, 117, 118, 119, 120 ')
        const data = res.data

        const options = data.map(d => ({
            "value": d.id,
            "label": d.name

        }))

        this.setState({ selectOptions: options })

    }

    handleChange(e) {
        console.log(e)
        this.setState({ value: e })
    }

    componentDidMount() {
        this.getOptions()
    }

    render() {
        console.log(this.state.value)
        return (
            <div>
                <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} isMulti />
                {
                    this.state.value === null ? "" : this.state.value.map(v => <h4>{v.label}</h4>)
                }
            </div>
        )
    }
}