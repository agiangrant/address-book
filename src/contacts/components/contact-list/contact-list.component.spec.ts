import { Router } from '@angular/router';
import { render } from '@testing-library/angular';
import { Mock, createMock } from '@testing-library/angular/jest-utils';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { ContactsService } from 'src/contacts/services/contacts.service';
import { ContactFilterComponent } from '../contact-filter/contact-filter.component';
import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let routerMock: Mock<Router>;
  let contactsServiceMock: Mock<ContactsService>;

  beforeEach(() => {
    routerMock = createMock(Router);
    contactsServiceMock = createMock(ContactsService);
  });
  function renderComponent(
    componentProperties: Partial<ContactListComponent> = {}
  ) {
    return render(ContactListComponent, {
      componentProperties,
      declarations: [MockComponent(ContactFilterComponent)],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ContactsService, useValue: contactsServiceMock },
      ],
    });
  }

  it('should render contact list', () => {
    contactsServiceMock.getContacts.mockReturnValue(of([]));
    const component = renderComponent({});
    expect(component).toBeTruthy();
  });
});
