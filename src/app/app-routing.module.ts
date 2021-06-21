import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailComponent } from 'src/contacts/components/contact-detail/contact-detail.component';
import { ContactListComponent } from 'src/contacts/components/contact-list/contact-list.component';
import { ContactsModule } from 'src/contacts/contacts.module';

const routes: Routes = [
  {
    path: 'contacts',
    component: ContactListComponent,
  },
  { path: 'contacts/:contact_id', component: ContactDetailComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ContactsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
