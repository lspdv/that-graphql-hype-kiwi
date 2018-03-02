import * as React from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import { darkBlack, darkWhite, fullBlack } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './global.css';

type Props = {
  dataSource: any,
  handleDate: any,
  handleOnChange: any,
  handleSubmit: any
};

const formFields = [
  { title: 'From*:', stateName: 'from' },
  { title: 'To*:', stateName: 'to'}
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
  return(
    dataSource && dataSource.allLocations.edges.length ?
      <h2 className="that-ugly-green-title">No idea? We found {dataSource
      && dataSource.allLocations
      && dataSource.allLocations.edges
      && dataSource.allLocations.edges.length} locations where you could travel to.</h2>
      : <h1>Where would you like to go?</h1>
  );
};

const SorryProste = () => {
  return(
    <p>* All fields in search are required, otherwise you will get just very ugly never ending spinning spinner.
      #sorryProste time is money</p>
  );
};

const GitHubLink = () => {
  return (
  <p>
  **Curious about the source code? Close your eyes and click {''}
  <a href="https://github.com/lspdv/that-graphql-hype-kiwi" target="_blank" rel="noopener noreferrer"> this link</a>.
  </p>
  );
};

export const Search = (props: Props) => {

  const { dataSource, handleDate, handleOnChange, handleSubmit } = props;

  const dataSourceShortcut = dataSource
    && dataSource.allLocations
    && dataSource.allLocations.edges;
  const datasourceMap = dataSourceShortcut && dataSource.allLocations.edges.map((location) => location.node.name);
  return(
    <div className="container">
      <Heading dataSource={dataSource}/>
      <SorryProste />
      <GitHubLink />
      <div className="input">
        <form>
        { dataSourceShortcut
        && formFields.map((field, idx) =>
        <MuiThemeProvider muiTheme={muiThemeAutoComplete} key={idx}>
          <AutoComplete
            onUpdateInput={(value: string) => handleOnChange(`${field.stateName}`, value)}
            floatingLabelText={field.title}
            filter={AutoComplete.fuzzyFilter}
            dataSource= {datasourceMap}
            maxSearchResults={10}
            name={field.stateName}
          />
          </MuiThemeProvider>
          )
        }
          <DatePicker
            onChange={handleDate}
            hintText="Choose date*"
            mode="landscape"
          />
        </form>
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
