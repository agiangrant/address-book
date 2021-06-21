import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contact } from 'src/contacts/models/contact';
import { ContactFilter } from 'src/contacts/models/contact-filter';
import { ContactsService } from 'src/contacts/services/contacts.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnChanges, OnDestroy, OnInit {
  contacts$?: Observable<Contact[]>;
  loadingContacts$ = this._contactService.isLoading();
  filter: ContactFilter = {};

  private _unsubscribe = new Subject();
  private _contactSubscription?: Subscription;

  constructor(
    private readonly _contactService: ContactsService,
    private readonly _router: Router
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  ngOnChanges() {
    this.getContacts();
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  getContacts() {
    if (this._contactSubscription) {
      this._contactSubscription.unsubscribe();
    }
    this.contacts$ = this._contactService
      .getContacts(this.filter)
      .pipe(takeUntil(this._unsubscribe));
    this._contactSubscription = this.contacts$.subscribe();
  }

  goToContact(contact: Contact) {
    if (!contact?.id) {
      return;
    }

    this._router.navigate([`contacts/${contact.id}`]);
  }

  handleFilterChange() {
    this.getContacts();
  }
}
