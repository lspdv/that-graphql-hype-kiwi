import * as React from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import { getFlights, getLocations } from '../api/graphql';

import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import './global.css';

const formFields = [
  { title: 'From:', stateName: 'from' },
  { title: 'To:', stateName: 'to'}
];

type State = {
  dataSource: any,
  data: {allFlights?: LocationsShape},
  newFormValues: {
    from: string,
    to: string,
    date: string
  };
};

type LocationsShape = {edges: any[]};

export class SearchForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      dataSource: {
        allLocations: {
          edges: []
        }
      },
      data: {
        allFlights: {
          edges: []
        }
      },
      newFormValues: {
        from: '',
        to: '',
        date: ''
      }
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  componentDidMount() {
    getLocations().then((result) => {
        this.setState({dataSource: result.data});
        const {dataSource} = this.state;
        console.log(`Fetched data: ${ dataSource
          && dataSource.allLocations && dataSource.allLocations.edges && dataSource.allLocations.edges.length} locations`);
      });
    }

  handleSubmit() {
    const { from, to, date } = this.state.newFormValues;
    getFlights(from, to, date).then((result) => {
      this.setState({data: result.data});
      const {data} = this.state;
      console.log(`Fetched data: ${ data && data.allFlights && data.allFlights.edges && data.allFlights.edges.length} flights`);
      console.log(`${ data && data.allFlights && data.allFlights.edges && data.allFlights.edges} debug`);
    });
  }

  handleOnChange(name: string, value: string) {
    const values = this.state.newFormValues;
    values[name] = value;

    this.setState({
      newFormValues: values
    });
  }

  handleDate(event: any, date: any) {
    const values = this.state.newFormValues;
    values.date = date;
    this.setState({ newFormValues: values});
  }

  render() {
    const {dataSource} = this.state;
    const dataSourceShortcut = dataSource
      && dataSource.allLocations
      && dataSource.allLocations.edges;

    return (
      <div className="container">
          <div className="input">
            <form>
            { dataSourceShortcut
            && formFields.map((field, idx) =>
              <AutoComplete
                key={idx}
                onUpdateInput={(value: string) => this.handleOnChange(`${field.stateName}`, value)}
                floatingLabelText={field.title}
                filter={AutoComplete.fuzzyFilter}
                dataSource= {dataSourceShortcut && dataSource.allLocations.edges.map((location) => location.name)}
                maxSearchResults={10}
                name={field.stateName}
              />)
            }
              <DatePicker
                onChange={this.handleDate}
                hintText="Choose date"
                mode="landscape"
              />
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
