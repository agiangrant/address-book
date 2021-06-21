import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from 'src/contacts/models/contact';
import { ContactsService } from 'src/contacts/services/contacts.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact-detail',
  styleUrls: ['./contact-detail.component.scss'],
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {
  contact$: Observable<Contact | null> = of(null);
  loadingContact$ = this._contactService.isLoading();

  private contactId = '';

  constructor(
    private readonly _contactService: ContactsService,
    private readonly _route: ActivatedRoute,
    private readonly _location: Location
  ) {}

  ngOnInit() {
    this.getContact();
  }

  getContact() {
    this._route.params.forEach((param) => {
      this.contactId = param['contact_id'];
    });

    this.contact$ = this._contactService.getContact(this.contactId);
    this.contact$.subscribe();
  }

  goBack() {
    this._location.back();
  }
}
