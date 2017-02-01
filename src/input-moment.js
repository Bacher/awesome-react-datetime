const cx        = require('classnames');
const blacklist = require('blacklist');
const moment    = require('moment');
const React     = require('react');
const Calendar  = require('./calendar');
const Time      = require('./time');

module.exports = React.createClass({
    displayName: 'InputMoment',

    getDefaultProps() {
        return {
            prevMonthIcon: 'ion-ios-arrow-left',
            nextMonthIcon: 'ion-ios-arrow-right'
        };
    },

    render() {
        const m     = this.props.moment;
        const props = blacklist(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'onSave');

        props.className = cx('m-input-moment', this.props.className);

        return (
            <div {...props}>
                <div className="tabs">
                    <Calendar
                        className="tab is-active"
                        moment={m}
                        onChange={this.props.onChange}
                        prevMonthIcon={this.props.prevMonthIcon}
                        nextMonthIcon={this.props.nextMonthIcon}
                    />
                    <Time
                        className="tab is-active"
                        moment={m}
                        onChange={this.props.onChange}
                    />
                </div>

                <button type="button" className="im-btn btn-save ion-checkmark"
                        onClick={this.handleSave}>
                    Save
                </button>
            </div>
        );
    },

    handleSave(e) {
        e.preventDefault();
        if (this.props.onSave) this.props.onSave();
    }
});
