const cx          = require('classnames');
const React       = require('react');
const SuperSlider = require('./super-slider');

module.exports = React.createClass({

    displayName: 'Time',

    getInitialState() {
        return {
            invalidHours: false,
            hoursInInput: this.props.value.hour()
        };
    },

    render() {
        const m       = this.props.value;
        const minutes = m.minute();

        const { invalidHours, hoursInInput } = this.state;

        const renderChunk = min => (
            <span
                className={cx('time__chunk', { 'time__chunk_active': minutes === min })}
                onClick={() => this.changeMinutes(min)}
            >
                {min === 0 ? '00' : min}
            </span>
        );

        return (
            <div className={cx('m-time', this.props.className)}>
                <div className="showtime">
                    <input
                        className={cx('time time_hours', { 'time_invalid': invalidHours })}
                        value={hoursInInput}
                        maxLength={2}
                        onChange={this.changeHoursDirect}
                    />
                    <span className="separater">:</span>
                    <span className="time time_minutes">
                        <div className="time__line time__line_first">
                            {renderChunk(0)}
                            {renderChunk(15)}
                        </div>
                        <div className="time__line">
                            {renderChunk(30)}
                            {renderChunk(45)}
                        </div>
                    </span>
                </div>

                <div className="sliders">
                    <SuperSlider
                        min={10}
                        max={19}
                        value={m.hour()}
                        onChange={this.changeHours}
                    />
                </div>
            </div>
        );
    },

    changeHours(value) {
        const m = this.props.value;

        m.hours(value);

        this.setState({
            hoursInInput: value
        });

        this.props.onChange(m);
    },

    changeHoursDirect(e) {
        const value = e.currentTarget.value;

        if (value === this.state.hoursInInput) {
            return;
        }

        if (/^\d{1,2}$/.test(value)) {
            const number = Number(value);

            if (number < 24) {
                this.setState({
                    invalidHours: false,
                    hoursInInput: value
                });

                const m = this.props.value;
                m.hours(number);
                this.props.onChange(m);
                return;
            }
        }

        this.setState({
            invalidHours: true,
            hoursInInput: value
        });
    },

    changeMinutes(minutes) {
        const m = this.props.value;
        m.minutes(minutes);
        this.props.onChange(m);
    }
});
