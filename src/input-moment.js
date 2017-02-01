const cx        = require('classnames');
const blacklist = require('blacklist');
const moment    = require('moment');
const React     = require('react');
const Calendar  = require('./calendar');
const Time      = require('./time');

module.exports = React.createClass({

    displayName: 'InputMoment',

    render() {
        const m = moment(this.props.value);
        const props = blacklist(this.props, 'className', 'value', 'onChange');

        return (
            <div className={cx('m-input-moment', this.props.className)} {...props}>
                <Calendar value={m} onChange={this.props.onChange} />
                <Time value={m} onChange={this.props.onChange} />
            </div>
        );
    }

});
