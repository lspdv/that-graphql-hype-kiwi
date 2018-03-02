import * as React from 'react';

import { getFlights, getLocations } from '../api/graphql';
import { FlightsCard } from './FlightsCard';
// import { ProgressBar } from './ProgressBar';
import { Search } from './Search';

import './global.css';
import { Spinner } from './Spinner';

type State = {
  loading: boolean,
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
      loading: false,
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
      });
    }

  handleSubmit() {
    const { from, to, date } = this.state.newFormValues;
    this.setState({ loading: true });
    getFlights(from, to, date).then((result) => {
      this.setState({ data: result.data, loading: false });
      }
    );
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
    const { dataSource, data, loading } = this.state;
    return (
      <div>
        <Search
          dataSource={dataSource}
          handleDate={this.handleDate}
          handleOnChange={this.handleOnChange}
          handleSubmit={this.handleSubmit}
        />
        {loading && <Spinner />}
        {data && data.allFlights
          && data.allFlights.edges &&
          data.allFlights.edges.map((flight, idx) => <FlightsCard {...flight} key={idx} />)}
      </div>
    );
  }
}
