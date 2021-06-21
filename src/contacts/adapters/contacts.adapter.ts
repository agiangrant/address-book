import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

// should be used to create contact API source adapters (i.e. randomuser.me)
// adapters should be provided in module with multi = true
export abstract class ContactsAdapter {
  abstract getContacts(): Observable<Contact[]>;
}
