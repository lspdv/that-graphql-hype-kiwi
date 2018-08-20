import * as React from 'react';

import { darkBlack, darkWhite, fullBlack, tealA700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SearchForm } from './components/SearchForm';
import { ErrorBoundary } from './components/ErrorBoundary';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    textColor: darkBlack,
    shadowColor: fullBlack,
    primary1Color: darkWhite,
    primary2Color: tealA700,
    primary3Color: tealA700,
    accent1Color: darkWhite,
    accent2Color: tealA700,
    accent3Color: tealA700,
    alternateTextColor: darkWhite,
    canvasColor: tealA700,
    borderColor: fullBlack,
    pickerHeaderColor: tealA700
  }
});
export default class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    }

render() {
  return (
        <div>
          <MuiThemeProvider muiTheme={muiTheme}>
            <ErrorBoundary>
              <SearchForm />
            </ErrorBoundary>
          </MuiThemeProvider>
        </div>
      );
    }
  }
