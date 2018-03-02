import * as React from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import './global.css';

type Props = {
  dataSource: any,
  handleDate: any,
  handleOnChange: any,
  handleSubmit: any
};

const formFields = [
  { title: 'From:', stateName: 'from' },
  { title: 'To:', stateName: 'to'}
];

export const Search = (props: Props) => {

  const { dataSource, handleDate, handleOnChange, handleSubmit } = props;

  const dataSourceShortcut = dataSource
    && dataSource.allLocations
    && dataSource.allLocations.edges;

  return(
    <div className="container">
      <div className="input">
        <form>
        { dataSourceShortcut
        && formFields.map((field, idx) =>
          <AutoComplete
            key={idx}
            onUpdateInput={(value: string) => handleOnChange(`${field.stateName}`, value)}
            floatingLabelText={field.title}
            filter={AutoComplete.fuzzyFilter}
            dataSource= {dataSourceShortcut && dataSource.allLocations.edges.map((location) => location.name)}
            maxSearchResults={10}
            name={field.stateName}
          />)
        }
          <DatePicker
            onChange={handleDate}
            hintText="Choose date"
            mode="landscape"
          />
        </form>
        <RaisedButton
          onClick={handleSubmit}
          label="Search"
        />
      </div>
    </div>
  );
};
