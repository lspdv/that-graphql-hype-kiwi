import * as React from 'react';

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons();
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import { getFlights } from '../api/graphql';

type FlightsShape = {edges: any[]};

type SearchProps = {
  from: string,
  to: string
};

export class SearchButton extends React.Component<(SearchProps & IButtonProps), {data: {allFlights?: FlightsShape; }}> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      data: {
        allFlights: {
          edges: []
        }
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {from, to}: SearchProps = this.props;
    {console.log(from, to, 'state'); }
    getFlights(from, to).then((result) => {
      this.setState({data: result.data});
      const {data} = this.state;
      console.log(`Fetched data: ${ data && data.allFlights && data.allFlights.edges && data.allFlights.edges.length} flights`);
    });
  }

  render() {
    const {disabled, checked} = this.props;

    return (
      <div>
        <DefaultButton
          disabled={disabled}
          checked={checked}
          text="SEARCH"
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}
