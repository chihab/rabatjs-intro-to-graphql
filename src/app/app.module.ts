import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// Needed by HttpLinkModule
import { HttpClientModule } from '@angular/common/http';

// Apollo
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloModule, Apollo } from 'apollo-angular';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, HttpLinkModule, ApolloModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const link = httpLink.create({
      uri: "https://vj34zv7n73.sse.codesandbox.io/"
    });
    apollo.create({
      link,
      cache: new InMemoryCache({
        dataIdFromObject: object => object.id
      })
    });
  }
}
