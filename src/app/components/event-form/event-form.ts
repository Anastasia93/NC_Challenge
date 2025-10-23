import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.html',
  styleUrls: ['./event-form.scss'],
})
export class EventFormComponent {
  @Input() title: string = '';
  @Input() date: string = '';

  @Output() titleChange = new EventEmitter<string>();
  @Output() dateChange = new EventEmitter<string>();

  onInputChange(e: Event, field: 'title' | 'date'): void {
    const value = (e.target as HTMLInputElement).value;

    if (field === 'title') {
      this.title = value;
      this.titleChange.emit(value);
    } else {
      this.date = value;
      this.dateChange.emit(value);
    }
  }
}
