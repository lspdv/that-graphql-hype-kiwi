import * as React from 'react';

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

export const Flights = (flight: FlightsProps) =>
  <div>
    <h4>{flight.node.departure.time}</h4>
    <h6>{flight.node.airlines[0].name}</h6>
    <p>
      <span>{flight.node.duration} mins</span>
      {flight.node.price.amount} {flight.node.price.currency}
    </p>
  </div>;
