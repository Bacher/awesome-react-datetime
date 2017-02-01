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

        if (this.props.width) {
            props.style = { width: `${this.props.width}px` };
        }

        return (
            <div className={cx('m-input-moment', this.props.className)} {...props}>
                <Calendar value={m} onChange={value => this._onChange(value)} />
                <Time value={m} onChange={value => this._onChange(value)} />
            </div>
        );
    },

    _onChange(moment) {
        if (this.props.onChange) {
            this.props.onChange(moment.toDate());
        }
    }

});
