const cx        = require('classnames');
const blacklist = require('blacklist');
const moment    = require('moment');
const React     = require('react');
const Calendar  = require('./calendar');
const Time      = require('./time');

module.exports = React.createClass({

    displayName: 'InputMoment',

    render() {
        const m     = this.props.moment;
        const props = blacklist(this.props, 'className', 'moment', 'onSave', 'onChange');

        props.className = cx('m-input-moment', this.props.className);

        return (
            <div {...props}>
                <Calendar
                    moment={m}
                    onChange={this.props.onChange}
                />
                <Time
                    moment={m}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }

});
