import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://graphql.kiwi.com/' }),
  cache: new InMemoryCache()
});

export function getFlights(from, to, date) {
  return client.query({
    query: gql`
      query Flights {
      allFlights(search: {from: {location: "${from}"}, to: {location: ${to}}, date: {exact: ${date}}}}) {
        edges {
          node {
            id
            departure {
              time
              localTime
            }
            arrival {
              time
              localTime
            }
            legs {
              flightNumber
              departure {
                airport {
                  name
                  city {
                    name
                  }
                }
              }
              arrival {
                airport {
                  name
                  city {
                    name
                  }
                }
              }
            }
            duration
            airlines {
              name
            }
            price {
              amount
              currency
            }
          }
        }
      }
    }
  `
  });
}

export function getLocations() {
  return client.query({
    query: gql`
    query Locations {
      allLocations(options: { locationType: city }) {
        edges {
          node {
            name
          }
        }
      }
    }
    `
  });
}
