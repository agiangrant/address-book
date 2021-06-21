import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-input',
  styleUrls: ['./search-input.component.scss'],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @Input() placeholder = 'Search...';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  private _debounceValue = '';

  handleInputChange(event: Event) {
    const value = (event.target as any).value;
    this._debounceValue = value;

    setTimeout(() => {
      if (value === this._debounceValue && value !== this.value) {
        this.valueChange.emit(value);
      }
    }, 500);
  }
}
