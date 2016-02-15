'use strict';

import React from 'react';
/* eslint-disable no-unused-vars */
import ListItem from './listItem.jsx';
/* eslint-enable no-unused-vars */
import superAgent from 'superagent';

export default React.createClass({
  propTypes: {
    resource: React.PropTypes.string
  },

  getInitialState() {
    return {
      data: [],
      newKitten: {}
    };
  },

  componentWillMount() {
    superAgent
      .get('http://localhost:3000/api/' + this.props.resource)
      .end((err, res) => {
        if (err) return console.log(err);
        this.setState({ data: res.body });
      });
  },

  handleChange(index, key, newValue) {
    let newState = {
      ...this.state,
      data: [...this.state.data]
    };
    newState.data[index][key] = newValue;
    this.setState(newState);
  },

  handleDelete(id) {
    let newState = {
      ...this.state,
      data: this.state.data.filter((item) => item._id !== id)
    };
    this.setState(newState);
  },

  handleNewItemChange(event, key) {
    let newState = {
      ...this.state,
      newKitten: {
        ...this.state.newKitten,
        [key]: event.target.value
      }
    };
    this.setState(newState);
  },

  addItem(event) {
    event.preventDefault();
    superAgent
      .post('http://localhost:3000/api/kittens')
      .send(this.state.newKitten)
      .end((err, res) => {
        if (err) return console.log(err);
        let newData = this.state.data;
        newData.push(res.body);
        this.setState({
          ...this.state,
          data: newData
        });
      });
  },

  render() {
    const listItemElements = this.state.data.map((itemData, idx) => {
      return <ListItem
              name={itemData.name}
              eats={itemData.eats}
              creates={itemData.creates}
              id={itemData._id}
              key={idx}
              index={idx}
              handleChange={this.handleChange}
              handleDelete={this.handleDelete}
              />;
    });

    return (
      <div>
        {listItemElements}
        <form onSubmit={this.addItem}>
          <label>Name: </label>
          <input type="text"
            placeholder="name"
            className="name"
            value={this.state.newKitten.name}
            onChange={(event) => this.handleNewItemChange(event, 'name')}>
          </input>
          <label>Eats: </label>
          <input type="text"
            placeholder="eats"
            className="eats"
            value={this.state.newKitten.eats}
            onChange={(event) => this.handleNewItemChange(event, 'eats')}>
          </input>
          <button type="submit">Add Kitten</button>
      </form>
      </div>
    );
  }
});
