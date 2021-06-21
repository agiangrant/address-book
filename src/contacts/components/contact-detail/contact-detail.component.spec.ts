import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { render } from '@testing-library/angular';
import { Mock, createMock } from '@testing-library/angular/jest-utils';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { ContactsService } from 'src/contacts/services/contacts.service';
import { ContactFilterComponent } from '../contact-filter/contact-filter.component';
import { ContactDetailComponent } from './contact-detail.component';

describe('ContactDetailComponent', () => {
  let routerMock: Mock<ActivatedRoute>;
  let contactsServiceMock: Mock<ContactsService>;

  beforeEach(() => {
    routerMock = createMock(ActivatedRoute);
    contactsServiceMock = createMock(ContactsService);
  });
  function renderComponent(
    componentProperties: Partial<ContactDetailComponent> = {}
  ) {
    return render(ContactDetailComponent, {
      componentProperties,
      declarations: [MockComponent(ContactFilterComponent)],
      providers: [
        { provide: ActivatedRoute, useValue: routerMock },
        { provide: ContactsService, useValue: contactsServiceMock },
      ],
      imports: [MatIconModule],
    });
  }

  it('should render contact detail', () => {
    routerMock.params = {
      forEach: (cb: Function) => cb({ contact_id: '1234' }),
    } as any;
    contactsServiceMock.getContact.mockReturnValue(
      of({ firstName: 'Test', lastName: 'User' })
    );
    const component = renderComponent({});
    expect(component).toBeTruthy();
  });
});
