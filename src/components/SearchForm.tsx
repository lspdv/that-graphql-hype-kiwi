import * as React from 'react';
import idx from 'idx';

import { getFlights, getLocations } from '../api/graphql';

import { FlightsCard } from './FlightsCard';
import { Search } from './Search';

import './global.css';
import { Spinner } from './Spinner';
import { GraphQLError } from '../../node_modules/@types/graphql';

type State = {
  loading: boolean,
  graphQlErrors: GraphQLError,
  error: boolean,
  dataSource: any,
  data: any,
  newFormValues: {
    from: string,
    to: string,
    date: Date | string
  };
};

export class SearchForm extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      loading: false,
      graphQlErrors: null,
      error: false,
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
  }

  componentDidMount() {
    getLocations().then((result) => {
      this.setState({ dataSource: result.data });
    }).catch((error) => {
      console.log(error);
      this.setState({ graphQlErrors: error });
    });
  }

  handleSubmit = () => {
    const { from, to, date } = this.state.newFormValues;
    if (!this.state.error) {
      this.setState({ loading: true });
      getFlights(from, to, date).then((result) => {
        this.setState({ data: result.data, loading: false });
        }
      ).catch((error) => {
        console.log(error);
        this.setState({ graphQlErrors: error, loading: false });
      });
    }
  }

  handleOnChange = (name: string, value: string) => {
    const values = this.state.newFormValues;
    values[name] = value;

    this.setState({
      newFormValues: values
    });
  }

  handleDate = (event: any, date: Date) => {
    const values = this.state.newFormValues;
    values.date = date;
    this.setState({ newFormValues: values});
  }

  render() {
    const { dataSource, data, error, graphQlErrors, loading } = this.state;
    const edges = idx(data, _ => _.allFlights.edges) || [];
    return (
      <div>
        <Search
          dataSource={dataSource}
          handleDate={this.handleDate}
          handleOnChange={this.handleOnChange}
          handleSubmit={this.handleSubmit}
          error={error}
        />
        {graphQlErrors}
        {!error && !graphQlErrors && loading && <Spinner />}
        {edges && edges.map((flight, key) => <FlightsCard {...flight} key={key} />)}
      </div>
    );
  }
}
