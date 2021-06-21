import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ContactsAdapter } from '../adapters/contacts.adapter';
import { Contact } from '../models/contact';
import { ContactFilter, ContactSortDirection } from '../models/contact-filter';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  static FULL_TEXT_SEARCH_FIELDS: Array<keyof Contact> = [
    'cell',
    'city',
    'email',
    'firstName',
    'id',
    'lastName',
    'phone',
    'postalCode',
    'state',
    'street',
    'timezone',
  ];

  private _contacts?: ReplaySubject<Contact[]>;
  private _contacts$?: Observable<Contact[]>;
  private _loading = new BehaviorSubject<boolean>(false);
  private _loading$ = this._loading.asObservable();

  constructor(
    @Inject(ContactsAdapter) private readonly _adapters: ContactsAdapter[]
  ) {}

  getContact(contactId: string): Observable<Contact | null> {
    const contacts = this._contacts ? this._contacts$! : this.getContacts({});
    return contacts.pipe(
      map((contacts) => {
        return contacts.find((contact) => contact.id === contactId) || null;
      })
    );
  }

  getContacts(filter: ContactFilter): Observable<Contact[]> {
    if (this._contacts$) {
      return this._contacts$.pipe(
        map((contacts) => this._filterContacts(contacts, filter))
      );
    }

    this._contacts = new ReplaySubject(1);
    this._contacts$ = this._contacts.asObservable();

    this._loading.next(true);

    // combine result from all adapters to create contacts from n sources
    combineLatest(this._adapters.map((adapter) => adapter.getContacts()))
      .pipe(
        map((contacts) => {
          const merged = contacts.reduce((acc, value) => acc.concat(value));

          // add full text search
          for (const contact of merged) {
            contact.fullTextSearch =
              ContactsService.FULL_TEXT_SEARCH_FIELDS.map(
                (prop) => contact[prop] || ''
              ).join('|');
          }

          this._contacts!.next(merged);
          this._loading.next(false);
        })
      )
      .pipe(take(1))
      .subscribe();

    return this._contacts$.pipe(
      map((contacts) => this._filterContacts(contacts, filter))
    );
  }

  isLoading(): Observable<boolean> {
    return this._loading$;
  }

  private _filterContacts(
    contacts: Contact[],
    filter: ContactFilter
  ): Contact[] {
    if (!filter) {
      return contacts;
    }

    const pattern = (filter.searchTerm || '')
      .split(' ')
      .map((term) => `(.*${term})`)
      .join('|');

    const filtered = filter.searchTerm
      ? contacts.filter((contact) => {
          return contact.fullTextSearch?.match(new RegExp(pattern, 'gi'));
        })
      : contacts;

    this._sortContacts(filtered, filter);

    return filtered;
  }

  private _sortContacts(contacts: Contact[], filter: ContactFilter) {
    contacts.sort((contactA, contactB) => {
      const field = (filter?.sortField || 'lastName') as keyof Contact;
      const direction = filter?.sortDirection || ContactSortDirection.ASC;

      if (!contactA[field]) {
        return 1;
      }
      if (!contactB[field]) {
        return -1;
      }

      if (field !== 'dob') {
        return contactA[field]!?.toLowerCase() > contactB[field]!?.toLowerCase()
          ? direction
          : direction * -1;
      }

      return contactA[field]!?.valueOf() < contactB[field]!?.valueOf()
        ? direction
        : direction * -1;
    });
  }
}
