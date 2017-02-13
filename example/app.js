require('../src/less/input-moment.less');
require('./app.less');

var moment = require('moment');
var React = require('react');
var ReactDOM = require('react-dom');
var InputMoment = require('../src/input-moment');
var packageJson = require('../package.json');

var App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      m: null
    };
  },

  render() {
    return (
      <div className="app">
        <h1>{packageJson.name}</h1>
        <h2>{packageJson.description}</h2>
        <form>
        <div className="input">
          <input
            type="text"
            value={String(this.state.m)}
            readOnly
          />
        </div>
        <InputMoment
          value={this.state.m}
          onChange={this.handleChange}
        />
        </form>
      </div>
    );
  },

  handleChange(value) {
    this.setState({
        m: moment(value)
    });
  },

});

ReactDOM.render(<App/>, document.getElementById('app'));
