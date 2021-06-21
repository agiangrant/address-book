import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { render } from '@testing-library/angular';
import { Mock, createMock } from '@testing-library/angular/jest-utils';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let routerMock: Mock<Router>;

  beforeEach(() => {
    routerMock = createMock(Router);
  });
  function renderComponent(componentProperties: Partial<AppComponent> = {}) {
    return render(AppComponent, {
      componentProperties,
      declarations: [MockComponent(RouterOutlet)],
      imports: [MatToolbarModule],
      providers: [{ provide: Router, useValue: routerMock }],
    });
  }

  it('should create the app', () => {
    const component = renderComponent({ title: 'Address Book Test' });
    expect(component).toBeTruthy();
  });
});
