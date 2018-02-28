import * as React from 'react';

import { getFlights } from '../api/graphql';

import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './global.css';

export class InputField extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);

    this.state = {
      from: '',
      date: null,
      to: '',
      value: 1
    };

    this.handleFrom = this.handleFrom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleTo = this.handleTo.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
  }

  getErrorMessage(value: string) {
    return value.length > 0
      ? ''
      : `Field can't be empty.`;
  }

  handleFrom(event) {
    this.setState({
        from: event.target.value
      });
    }

  handleTo(event, to) {
    this.setState({to});
  }
  handleDate(event, date) {
    this.setState({date});
  }

  handleSubmit() {
    const {from, to, date} = this.state;
    {console.log(from, to, date, 'state'); }
    getFlights(from, to, date).then((result) => {
      this.setState({data: result.data});
      const {data} = this.state;
      console.log(`Fetched data: ${ data && data.allFlights && data.allFlights.edges && data.allFlights.edges.length} flights`);
    });
  }

  render() {
    return (
      <div className="container">
          <div className="input">
            <form>
              <TextField
                value={this.state.from}
                onChange={this.handleFrom}
                floatingLabelText={'From: '}>
                {/* {this.props.allDestinations.edges.map(function(destination) {
                  return <MenuItem value={destination.node.name} primaryText={ destination.node.name }/>;
                })} */}
              </TextField>

              <TextField
                value={this.state.to}
                onChange={this.handleTo}
                floatingLabelText={'To: '}>
                {/* {this.props.allDestinations.edges.map(function(destination) {
                  return <MenuItem value={destination.node.name} primaryText={ destination.node.name }/>;
                })} */}
              </TextField>
              <DatePicker onChange={this.handleDate} value ={this.state.date} hintText="Choose date" />

            </form>
        <RaisedButton
          onClick={this.handleSubmit}
          label="Search"
        />
      </div>
      </div>
    );
  }
}
