import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Environment } from 'src/environments/environment-type';
import { EnvironmentService } from 'src/environments/environment.service';
import { Contact } from '../models/contact';
import { RandomUser, RandomUserResponse } from '../models/random-user';
import { ContactsAdapter } from './contacts.adapter';

@Injectable({ providedIn: 'root' })
export class RandomUserAdapter extends ContactsAdapter {
  config: Environment;

  constructor(
    private readonly _environmentService: EnvironmentService,
    private readonly _httpClient: HttpClient
  ) {
    super();
    this.config = this._environmentService.getConfig();
  }

  getContacts(): Observable<Contact[]> {
    return this._httpClient
      .get<RandomUserResponse>(
        `${this.config.randomUserBaseUrl}/api?results=100&nat=us,gb,au,fr,es,de,ca,br,nz`
      )
      .pipe(
        map((data) => {
          if (!data?.results?.length) {
            return [];
          }

          return data.results.map((randomUser, index) =>
            this._mapToContact(randomUser, index)
          );
        })
      );
  }

  private _mapToContact(randomUser: RandomUser, index: number): Contact {
    return {
      id: randomUser.login?.uuid || index.toString(),
      cell: randomUser.cell,
      city: randomUser.location?.city,
      country: randomUser.location?.country,
      dob: randomUser.dob?.date ? new Date(randomUser.dob.date) : null,
      email: randomUser.email,
      firstName: randomUser.name?.first,
      imageUrl: randomUser.picture?.large,
      lastName: randomUser.name?.last,
      phone: randomUser.phone,
      postalCode: randomUser.location?.postcode,
      state: randomUser.location?.state,
      street: [
        randomUser.location?.street?.number,
        randomUser.location?.street?.name,
      ].join(' '),
      thumbnailUrl: randomUser.picture?.thumbnail,
      timezone: randomUser.location?.timezone?.offset,
    } as Contact;
  }
}
