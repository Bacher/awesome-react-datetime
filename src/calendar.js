const cx        = require('classnames');
const blacklist = require('blacklist');
const moment    = require('moment');
const React     = require('react');
const range     = require('lodash/utility/range');
const chunk     = require('lodash/array/chunk');

const Day = React.createClass({
    displayName: 'Day',

    render() {
        const { i, isCurrentDate, isCurrentMonth, selected } = this.props;

        const props = blacklist(this.props, 'className', 'i', 'isCurrentDate', 'isCurrentMonth', 'selected');

        props.className = cx({
            'prev-month':   !isCurrentMonth,
            'current-day':  isCurrentDate,
            'selected-day': selected,
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

        const m  = this.props.moment;
        const d  = m.date();
        const d1 = m.clone().subtract(1, 'month').endOf('month').date();
        const d2 = m.clone().date(1).isoWeekday();
        const d3 = m.clone().endOf('month').date();

        const d2_ = (d2 === 1 ? 7 : d2 - 1);

        const month     = m.month();
        const prevMonth = month - 1;
        const nextMonth = month + 1;

        const days = [].concat(
            range(d1 - d2_ + 1, d1 + 1).map(date => ({ month: prevMonth, date })),
            range(1, d3 + 1)          .map(date => ({ month, date })),
            range(1, 42 - d3 - d2_ + 1).map(date => ({ month: nextMonth, date }))
        );

        const weeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        return (
            <div className={cx('m-calendar', this.props.className)}>
                <div className="toolbar">
                    <button type="button" className="prev-month" onClick={this.prevMonth}>
                        &lt;
                    </button>
                    <span className="current-date">{m.format('MMMM YYYY')}</span>
                    <button type="button" className="next-month" onClick={this.nextMonth}>
                        &gt;
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            {weeks.map((w, i) => <td key={i}>{w}</td>)}
                        </tr>
                    </thead>

                    <tbody>
                    {chunk(days, 7).map((row, w) => (
                        <tr key={w}>
                            {row.map(dayInfo => (
                                <Day
                                    key={dayInfo.date}
                                    i={dayInfo.date}
                                    isCurrentMonth={month === dayInfo.month}
                                    isCurrentDate={currentMonth === dayInfo.month && currentDate === dayInfo.date}
                                    selected={dayInfo.month === month && dayInfo.date === d}
                                    onClick={() => this.selectDate(dayInfo)}
                                />
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    },

    selectDate(dayInfo) {
        const m = this.props.moment;

        m.month(dayInfo.month);
        m.date(dayInfo.date);

        this.props.onChange(m);
    },

    prevMonth(e) {
        e.preventDefault();
        this.props.onChange(this.props.moment.subtract(1, 'month'));
    },

    nextMonth(e) {
        e.preventDefault();
        this.props.onChange(this.props.moment.add(1, 'month'));
    }
});
