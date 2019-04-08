import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import {
  GET_MEETUPS,
  CREATE_MEETUP,
  UPDATE_MEETUP,
  DELETE_MEETUP
} from './graphql';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  meetup: any = {
    id: null,
    title: '',
    text: ''
  };
  query$: Observable<any>;

  constructor(private apollo: Apollo) {
    this.query$ = this.apollo.watchQuery(
      {
        query: GET_MEETUPS,
      }
    ).valueChanges
  }

  onSave() {
    const { id, title, text } = this.meetup;
    this.apollo.mutate({
      mutation: this.meetup.id ? UPDATE_MEETUP : CREATE_MEETUP,
      variables: {
        meetup: id ? { id, title, text } : { title, text }
      },
      refetchQueries: [{ query: GET_MEETUPS }]
    })
      .subscribe(
        (data) => this.meetup = {
          id: null,
          title: '',
          text: ''
        },
        (error) => alert(error) // o_O
      );
  }

  onEdit(meetup) {
    this.meetup = { ...meetup };
  }

  onDelete(meetup) {
    this.apollo.mutate({
      mutation: DELETE_MEETUP,
      variables: {
        meetup: meetup.id
      },
      refetchQueries: [{ query: GET_MEETUPS }]
    })
      .subscribe(
        (data) => alert('OK !'),
        (error) => alert(error) // o_O
      );
  }
}
