import * as React from 'react';
import idx from 'idx';

import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import { darkBlack, darkWhite, fullBlack } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './global.css';

type Props = {
  dataSource: {allLocations: LocationsShape},
  error: boolean,
  handleDate: (e: any, date: Date) => void,
  handleOnChange: any,
  handleSubmit: any
};

type LocationsShape = {edges: any[]};

const formFields = [
  { title: 'From (required)', stateName: 'from' },
  { title: 'To (required)', stateName: 'to'}
];

const muiThemeAutoComplete = getMuiTheme({
  palette: {
    textColor: darkBlack,
    shadowColor: fullBlack,
    canvasColor: darkWhite,
    borderColor: fullBlack,
    primary1Color: darkWhite
  }
});

const Heading = ({dataSource}) => {
  const edges = idx(dataSource, _ => _.allLocations.edges) || [];
  return(
    edges && edges.length ?
      <h2 className="green-heading">No idea? We found {edges.length} locations where you could travel to.</h2>
      : <h1>Where would you like to go?</h1>
  );
};

const GitHubLink = () => {
  return (
  <p>
  Curious about the source code? Close your eyes and click {''}
  <a href="https://github.com/lspdv/that-graphql-hype-kiwi" target="_blank" rel="noopener noreferrer"> this link</a>.
  </p>
  );
};

export const Search = (props: Props) => {

  const { dataSource, error, handleDate, handleOnChange, handleSubmit } = props;

  const edges = idx(dataSource, _ => _.allLocations.edges) || [];
  const datasourceMap = edges && edges.map((location) => location.node.name);
  const errorText = error && 'All fields are required';
  return(
    <div className="container">
      <Heading dataSource={dataSource}/>
      <GitHubLink />
      <div className="input">
        <form>
          { edges
          && formFields.map((field, key) =>
          <MuiThemeProvider muiTheme={muiThemeAutoComplete} key={key}>
            <AutoComplete
              onUpdateInput={(value: string) => handleOnChange(`${field.stateName}`, value)}
              floatingLabelText={field.title}
              filter={AutoComplete.fuzzyFilter}
              dataSource= {datasourceMap}
              maxSearchResults={10}
              name={field.stateName}
              errorText={errorText}
              hintText="Start typing"
            />
            </MuiThemeProvider>
            )
          }
          <DatePicker
            onChange={handleDate}
            hintText="Choose departure date (required)"
            mode="landscape"
            errorText={errorText}
            autoOk
          />
        </form>
        <p>Hint: Did you fill all required fields?</p>
        <div className="search-button">
          <RaisedButton
            onClick={handleSubmit}
            label="Search"
          />
        </div>
      </div>
    </div>
  );
};
