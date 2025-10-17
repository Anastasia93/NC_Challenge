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

  onTitleChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.title = value;
    this.titleChange.emit(this.title);
  }

  onDateChange(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.date = v;
    this.dateChange.emit(this.date);
  }
}
