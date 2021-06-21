import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { render } from '@testing-library/angular';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  function renderComponent(
    componentProperties: Partial<SearchInputComponent> = {}
  ) {
    return render(SearchInputComponent, {
      componentProperties,
      imports: [MatInputModule, MatIconModule, MatFormFieldModule],
    });
  }

  it('should render contact list', () => {
    const component = renderComponent({});
    expect(component).toBeTruthy();
  });
});
