import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

import './global.css';

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',

  isRequiredErrorMessage: 'Date is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

export type State =  {
  firstDayOfWeek?: DayOfWeek;
  value?: Date | null;
};

export class DateCalendarPicker extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      firstDayOfWeek: DayOfWeek.Monday,
      value: null
    };
  }

  render() {
    const { firstDayOfWeek, value } = this.state;
    return (
      <div>
        <DatePicker
          isRequired
          allowTextInput={false}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          value={value!}
          onSelectDate={this.onSelectDate}
        />
        <DefaultButton onClick={this.onClick} text="CLEAR DATE" />
      </div>
    );
  }

  @autobind
  onSelectDate(date: Date | null | undefined): void {
    this.setState({ value: date });
  }

  @autobind
  onClick(): void {
    this.setState({ value: null });
  }
}
