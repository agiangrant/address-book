import { render } from '@testing-library/angular';
import { MockComponent } from 'ng-mocks';
import { SearchInputComponent } from 'src/shared/search-input/search-input.component';
import { ContactFilterComponent } from './contact-filter.component';

describe('ContactFilterComponent', () => {
  function renderComponent(
    componentProperties: Partial<ContactFilterComponent> = {}
  ) {
    return render(ContactFilterComponent, {
      componentProperties,
      declarations: [MockComponent(SearchInputComponent)],
      providers: [],
    });
  }

  it('should render contact filter', () => {
    const component = renderComponent({});
    expect(component).toBeTruthy();
  });
});
