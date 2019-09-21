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
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<any>(
      {
        query: GET_MEETUPS,
      }
    ).valueChanges

    this.query$
      .subscribe(({ data, loading }) => {
        console.log(data);
      });
  }

  onSave() {
    const { id, title, text } = this.meetup;
    this.apollo.mutate({
      mutation: this.meetup.id ? UPDATE_MEETUP : CREATE_MEETUP,
      variables: {
        meetup: id ? { id, title, text } : { title, text }
      }
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

  onCancel() {
    this.meetup = {
      id: null,
      title: '',
      text: ''
    };
  }

  onDelete(meetup) {
    if (confirm('Are you sure ?')) {
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
}
