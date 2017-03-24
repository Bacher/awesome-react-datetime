const cx        = require('classnames');
const blacklist = require('blacklist');
const moment    = require('moment');
const React     = require('react');
const range     = require('lodash/utility/range');
const chunk     = require('lodash/array/chunk');

const Day = React.createClass({
    displayName: 'Day',

    render() {
        const { i, disabled, isCurrentDate, isSelectedMonth, selected } = this.props;

        const props = blacklist(this.props, 'className', 'i', 'isCurrentDate', 'isSelectedMonth', 'selected');

        props.className = cx({
            'prev-month':   !isSelectedMonth,
            'current-day':  isCurrentDate,
            'selected-day': selected,
            'm-disabled':   disabled,
            'm-enabled':    !disabled,
        });

        return <td {... props}>{i}</td>;
    }
});

module.exports = React.createClass({
    displayName: 'Calendar',

    render() {
        const currentMoment = moment();
        const currentMonth  = currentMoment.month();
        const currentDate   = currentMoment.date();
        const currentYear   = currentMoment.year();

        const onlyFuture   = this.props.onlyFuture;
        const onlyWorkDays = this.props.onlyWorkDays;

        const m  = this.props.value;
        const d  = m.date();
        const d1 = m.clone().subtract(1, 'month').endOf('month').date();
        const d2 = m.clone().date(1).isoWeekday();
        const d3 = m.clone().endOf('month').date();

        const d2_ = (d2 === 1 ? 7 : d2 - 1);

        const year      = m.year();

        const month     = m.month();
        const prevMonth = month - 1;
        const nextMonth = month + 1;

        const prevBounds = [d1 - d2_ + 1, d1 + 1];
        if (prevMonth[1] - prevMonth[0] > 7) {
            prevMonth[0] += 7;
        }

        const nextBounds = [1, 42 - d3 - d2_ + 1];
        if (nextBounds[1] - nextBounds[0] > 7) {
            nextBounds[1] -= 7;
        }

        const days = [].concat(
            range(prevBounds[0], prevBounds[1]).map(date => ({ month: prevMonth, date, year: (prevMonth === 12 ? year - 1 : year) })),
            range(1, d3 + 1)                   .map(date => ({ month, date, year })),
            range(nextBounds[0], nextBounds[1]).map(date => ({ month: nextMonth, date, year: (nextMonth === 1 ? year + 1 : year) }))
        );

        return (
            <div className={cx('m-calendar', this.props.className)}>
                <div className="m-toolbar">
                    { year > currentYear || (year === currentYear && month > currentMonth) ?
                        <button type="button" className="m-btn m-btn_prev" onClick={this.prevMonth}>
                            &lt;
                        </button> : null
                    }
                    <span className="current-date">{m.format('MMMM YYYY')}</span>
                    <button type="button" className="m-btn m-btn_next" onClick={this.nextMonth}>
                        &gt;
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            {range(1, 8).map(i => <td key={i}>{moment.weekdaysMin(i)}</td>)}
                        </tr>
                    </thead>

                    <tbody>
                    {chunk(days, 7).map((row, w) => (
                        <tr key={w}>
                            {row.map((dayInfo, i) => {
                                let disabled = false;

                                if (onlyWorkDays && !disabled) {
                                    if (i === 5 || i === 6) {
                                        disabled = true;
                                    }
                                }

                                if (onlyFuture && !disabled) {
                                    if (dayInfo.year < currentYear) {
                                        disabled = true;
                                    } else if (dayInfo.year === currentYear) {
                                        if (dayInfo.month < currentMonth) {
                                            disabled = true;
                                        } else if (dayInfo.month === currentMonth) {
                                            if (dayInfo.date < currentDate) {
                                                disabled = true;
                                            }
                                        }
                                    }
                                }

                                return (
                                    <Day
                                        key={dayInfo.date}
                                        i={dayInfo.date}
                                        disabled={disabled}
                                        isSelectedMonth={month === dayInfo.month}
                                        isCurrentDate={currentMonth === dayInfo.month && currentDate === dayInfo.date && currentYear === dayInfo.year}
                                        selected={dayInfo.month === month && dayInfo.date === d && !this.props.isEmpty}
                                        onClick={disabled ? null : () => this.selectDate(dayInfo)}
                                    />
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    },

    selectDate(dayInfo) {
        const m = this.props.value;

        m.month(dayInfo.month);
        m.date(dayInfo.date);

        this.props.onChange(m);
    },

    prevMonth(e) {
        e.preventDefault();
        this.props.onChange(this.props.value.subtract(1, 'month'));
    },

    nextMonth(e) {
        e.preventDefault();
        this.props.onChange(this.props.value.add(1, 'month'));
    },

});
