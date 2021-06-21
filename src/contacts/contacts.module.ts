import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/shared/shared.module';
import { ContactsAdapter } from './adapters/contacts.adapter';
import { RandomUserAdapter } from './adapters/random-user.adapter';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactFilterComponent } from './components/contact-filter/contact-filter.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactsService } from './services/contacts.service';

// Use a static for root to base contact-related providers off of config in more complex scenarios
@NgModule({
  declarations: [
    ContactListComponent,
    ContactFilterComponent,
    ContactDetailComponent,
  ],
  providers: [
    {
      provide: ContactsAdapter,
      useExisting: RandomUserAdapter,
      multi: true,
    },
    ContactsService,
  ],
  exports: [ContactListComponent, ContactDetailComponent],
  imports: [
    HttpClientModule,
    SharedModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ContactsModule {}
