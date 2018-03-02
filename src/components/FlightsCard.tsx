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
  return <h4 className="flights-card-duration">Duration: {Math.floor(duration.asHours())}hours {duration.minutes()}minutes</h4>;
};

const Description = ({ airline, departure, arrival}) => {
  return (
      <div className="flights-card-flex flights-card-description">
        <img src={airline.logoUrl} title={airline.name} />
      <div>
      <div className="flights-card-description">
        {departure.airport.name}
      </div>
      <div className="flights-card-description">
        {arrival.airport.name}
      </div>
      </div>
      </div>
  );
};

export const FlightsCard = (flight: FlightsProps) =>
  <MuiThemeProvider muiTheme={muiThemeFlightCard}>
    <div className="flights-card-container">
      <Card>
        <div className="flights-card-boxes">
          <div>
            <div className="flights-card-flex">
              <CardHeader
                title="Departure"
                subtitle={moment(flight.node.departure.time).format('D. M. YYYY')}
              />
              <CardHeader
                title="Arrival"
                subtitle={moment(flight.node.arrival.time).format('D. M. YYYY')}
              />
            </div>
            <FlightDuration flight={flight}/>
          </div>
          <div className="flights-card-details">
            <CardText>
            {flight.node.legs.map((leg, idx) => <Description {...leg} key={idx} />)}
            </CardText>
          </div>
          </div>
          <div className="flights-card-price">
            <h2>
              { flight.node.price.amount } {''} { flight.node.price.currency }
            </h2>
          </div>
      </Card>
    </div>;
  </MuiThemeProvider>;
