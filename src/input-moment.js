const cx        = require('classnames');
const blacklist = require('blacklist');
const React     = require('react');
const moment    = require('moment');
const Calendar  = require('./calendar');
const Time      = require('./time');

module.exports = React.createClass({

    displayName: 'InputMoment',

    render() {
        const props = blacklist(this.props, 'className', 'value', 'onChange');

        if (this.props.width) {
            props.style = { width: `${this.props.width}px` };
        }

        let timeValue;

        if (this.props.value == null) {
            timeValue = moment();
            timeValue.minutes(0);
            timeValue.seconds(0);
            timeValue.milliseconds(0);
        } else {
            timeValue = moment(this.props.value);
        }

        return (
            <div className={cx('m-input-moment', this.props.className)} {...props}>
                <Calendar value={this.props.value} onChange={value => this._onChange(value)} />
                <Time value={timeValue} onChange={value => this._onChange(value)} />
            </div>
        );
    },

    _onChange(moment) {
        if (this.props.onChange) {
            this.props.onChange(moment.toDate());
        }
    }

});
