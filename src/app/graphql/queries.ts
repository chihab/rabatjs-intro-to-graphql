import gql from 'graphql-tag';

export const GET_MEETUPS = gql`query {
  meetups {id title text}
}`;