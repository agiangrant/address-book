import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ContactFilter } from 'src/contacts/models/contact-filter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact-filter',
  styleUrls: ['./contact-filter.component.scss'],
  templateUrl: './contact-filter.component.html',
})
export class ContactFilterComponent {
  @Input() filter: ContactFilter = {};
  @Output() filterChange: EventEmitter<ContactFilter> = new EventEmitter();

  handleSearchTermChange(searchTerm: string) {
    this.filterChange.emit({ ...this.filter, searchTerm });
  }
}
