import * as React from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import {  getLocations } from '../api/graphql';

type FlightsShape = {edges: any[]};

export class AutoCompleteFilter extends React.Component<{}, {data: {allLocations?: FlightsShape }}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: {
        allLocations: {
          edges: []
        }
      }
    };
  }

componentDidMount() {
  getLocations().then((result) => {
      this.setState({data: result.data});
      const {data} = this.state;
      console.log(`Fetched data: ${ data && data.allLocations && data.allLocations.edges && data.allLocations.edges.length} locations`);
    });
  }

render() {
    const {data} = this.state;
    return (
        <div>
          {data
            && data.allLocations
            && data.allLocations.edges
            && data.allLocations.edges.map((locations, idx) =>
              <AutoComplete {...locations} key={idx}
                //   floatingLabelText=""
                filter={AutoComplete.fuzzyFilter}
                dataSource={locations}
                maxSearchResults={10}
              />
            )
          }
        </div>
      );
    }
  }
