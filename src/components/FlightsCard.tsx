import * as React from 'react';

import { darkBlack, darkWhite, fullBlack } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as moment from 'moment';

import {Card, CardHeader, CardText} from 'material-ui/Card';

const muiThemeFlightCard = getMuiTheme({
  palette: {
    textColor: darkBlack,
    shadowColor: fullBlack,
    canvasColor: darkWhite,
    borderColor: fullBlack
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
        airline: {
        name: string,
        code: string,
        logoUrl: string,
        isLowCost: string
      },
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

const Description = ({ airline, departure, arrival}) => {
  return (
    <div>
      <div>
        <img src={airline.logoUrl} title={airline.name} />
      </div>
      <div>
        {departure.airport.name}
      </div>
      <div>
        {arrival.airport.name}
      </div>
    </div>
  );
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
            {flight.node.legs.map((leg, idx) => <Description key={idx} {...leg} />)}
            </CardText>
          </div>
          <div>
          { flight.node.price.amount }
          { flight.node.price.currency }
          </div>
        </div>
      </Card>
    </div>;
  </MuiThemeProvider>;
