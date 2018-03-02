import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import * as moment from 'moment';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://graphql.kiwi.com/' }),
  cache: new InMemoryCache()
});

export function getFlights(from, to, date) {
  const localDate = moment(date).format('YYYY-MM-DD').toString();
  return client.query({
    query: gql`
      query Flights($locationFrom: String!, $locationTo: String!, $date: Date! ) {
      allFlights(search: {
        from: { location: $locationFrom },
        to: { location: $locationTo },
        date: { exact: $date}
        }
        ) {
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
              airline {
                name
                code
                logoUrl
                isLowCost
              }
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
  `, variables: { locationFrom: from, locationTo: to, date: localDate }
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
