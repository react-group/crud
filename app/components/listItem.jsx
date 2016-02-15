'use strict';

import React from 'react';
import superAgent from 'superagent';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    eats: React.PropTypes.string,
    creates: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    index: React.PropTypes.number,
    handleDelete: React.PropTypes.func
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  toggleEdit() {
    this.setState({ editing: !this.state.editing });
  },

  handleChange(event, propName) {
    this.props.handleChange(this.props.index, propName,
      event.target.value);
  },

  handleSubmit(event) {
    event.preventDefault();
    superAgent
      .put('http://localhost:3000/api/kittens/' + this.props.id)
      .send({
        _id: this.props.id,
        name: this.props.name,
        eats: this.props.eats,
        creates: this.props.creates
      })
      .end((err) => {
        if (err) return console.log(err);
        this.toggleEdit();
      });
  },

  handleDelete() {
    superAgent
      .delete('http://localhost:3000/api/kittens/' + this.props.id)
      .end((err) => {
        if (err) return console.log(err);
        this.props.handleDelete(this.props.id);
      });
  },

  render() {
    let form;
    if (this.state.editing) {
      form = (<form onSubmit={this.handleSubmit}>
        <label>Name: </label>
        <input type="text"
          placeholder="name"
          value={this.props.name}
          onChange={(event) => this.handleChange(event, 'name')}
          className="name"></input>
        <label>Eats: </label>
        <input type="text"
          placeholder="eats"
          value={this.props.eats}
          onChange={(event) => this.handleChange(event, 'eats')}
          className="eats"></input>
        <button type="submit">Submit</button>
    </form>);
    } else {
      form = null;
    }

    return (
      <li>
        <span>Name: {this.props.name}&nbsp;</span><br />
        <span>Eats: {this.props.eats}&nbsp;</span>
        <button onClick={this.toggleEdit}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
        {form}
      </li>
    );
  }
});
