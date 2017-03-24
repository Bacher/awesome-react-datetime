const cx        = require('classnames');
const blacklist = require('blacklist');
const React     = require('react');
const moment    = require('moment');
const Calendar  = require('./calendar');
const Time      = require('./time');

module.exports = React.createClass({

    displayName: 'InputMoment',

    render() {
        const passProps = blacklist(this.props, 'className', 'value', 'onlyFuture', 'onlyWorkDays', 'defaultTime', 'onChange');

        if (this.props.width) {
            passProps.style = { width: `${this.props.width}px` };
        }

        let m;

        if (this.props.value == null) {
            m = moment();

            if (this.props.defaultTime) {
                const [hours, minutes] = this.props.defaultTime.split(':').map(Number);
                m.hours(hours);
                m.minutes(minutes);
            } else {
                m.minutes(0);
            }

            m.seconds(0);
            m.milliseconds(0);

        } else {
            m = moment(this.props.value);
        }

        return (
            <div className={cx('m-input-moment', this.props.className)} {...passProps}>
                <Calendar
                    value={m}
                    isEmpty={this.props.value == null}
                    onlyFuture={this.props.onlyFuture}
                    onlyWorkDays={this.props.onlyWorkDays}
                    onChange={value => this._onChange(value)}
                />
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
