import gql from 'graphql-tag';

export const CREATE_MEETUP = gql`mutation createMeetup($meetup: CreateMeetupInput!) {
    createMeetup(meetup: $meetup) {id title text}
}`;

export const UPDATE_MEETUP = gql`mutation updateMeetup($meetup: UpdateMeetupInput!) {
    updateMeetup(meetup: $meetup) {id title text}
}`;

export const DELETE_MEETUP = gql`mutation deleteMeetup($meetup: ID!) {
    deleteMeetup(id: $meetup)
}`;