import * as React from 'react';

import { darkBlack, darkWhite, fullBlack, tealA700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as moment from 'moment';

import {Card, CardHeader, CardText} from 'material-ui/Card';

const muiThemeFlightCard = getMuiTheme({
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
    canvasColor: darkWhite,
    borderColor: fullBlack,
    pickerHeaderColor: tealA700
  }
});

export type FlightsProps = {
  node: {
    departure: {
      time: string,
      localTime: string
    },
    arrival: {
      time: string,
      localTime: string
    },
    legs: [
      {
        flightNumber: number,
        departure: {
          airport: {
            name: string,
            city: {
              name: string
            }
          }
        },
        arrival: {
          airport: {
            name: string,
            city: {
              name: string
            }
          }
        }
      }
    ],
    duration: number,
    airlines: [
      {
        name: string
      }
    ],
    price: {
      amount: number,
      currency: string;
    }
  }
};

const FlightDuration = ({ flight }) => {
  const duration = moment.duration(flight.node.duration, 'minutes');
  return <span>{Math.floor(duration.asHours())}h {duration.minutes()}m</span>;
};

export const FlightsCard = (flight: FlightsProps) =>
  <MuiThemeProvider muiTheme={muiThemeFlightCard}>
    <div className="flights-card-container">
      <Card>
        <div className="flights-card-boxes">
          <div className="flights-card-times">
            <CardHeader
              title="Departure"
              subtitle={moment(flight.node.departure.time).format('D. M. YYYY')}
            />
            <CardHeader
              title="Arrival"
              subtitle={moment(flight.node.arrival.time).format('D. M. YYYY')}
            />
            <FlightDuration flight={flight}/>
          </div>
          <div className="flights-card-details">
            <CardText>
            </CardText>
          </div>
        </div>
      </Card>
    </div>;
  </MuiThemeProvider>;
