import * as React from 'react';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DateCalendarPicker } from './DateCalendarPicker';
import { SearchButton } from './SearchButton';

import './global.css';

export class InputField extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);

    this.state = {
      value: '',
      from: '',
      to: ''
    };

    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  getErrorMessage(value: string) {
    return value.length > 0
      ? ''
      : `Field can't be empty.`;
  }

//   handleOnChange(event): void {
//     const target = event.target;
//     this.setState({[event.target.label]: target.value});
//     {console.log(target.label, target.value, 'setstate target'); }
//     {console.log(this.state.from, this.state.to, 'setstate FORM'); }
// }

handleOnChange({target}) {
  console.log(target, 'target');
  const value = target.value;
  const name = target.label === 'from' ? 'from' : 'to';

  this.setState({
    [name]: value
  });
}

  render() {
    return (
      <div>
        <div className="input">
          <div className="field">
            <TextField
              label="from"
              underlined
              required={true}
              onGetErrorMessage={this.getErrorMessage}
              validateOnLoad={false}
              validateOnFocusOut
              value={this.state.from}
              onChanged={this.handleOnChange}
            />
            </div>
          <div className="field">
          <TextField
            label="to"
            underlined
            required={true}
            onGetErrorMessage={this.getErrorMessage}
            validateOnLoad={false}
            validateOnFocusOut
            value={this.state.to}
            onChanged={this.handleOnChange}
          />
          </div>
          <div className="field">
          <DateCalendarPicker
          />
          </div>
        </div>
        <div className="search-button">
          <SearchButton from={this.state.from} to={this.state.to}/>
        </div>
      </div>
    );
  }
}
