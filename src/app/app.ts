import { Component, signal } from '@angular/core';

import { CountdownComponent } from './components/countdown/countdown';
import { EventFormComponent } from './components/event-form/event-form';
import { IfPortraitDirective } from './directives/portrait.directive';
import { Orientation } from './types/orientation.enum';
import { QuoteComponent } from './components/quote/quote';

const DEFAULT_EVENT = {
  TITLE: 'Midsummer Eve',
  DATE: '2026-06-20',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountdownComponent, EventFormComponent, IfPortraitDirective, QuoteComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  orientation: Orientation = Orientation.Landscape;

  protected readonly title = signal('nc-challenge');
  
  private _eventTitle: string = DEFAULT_EVENT.TITLE;
  private _eventDate: string = DEFAULT_EVENT.DATE;

  constructor() {}

  ngOnInit(): void {
    const savedTitle = localStorage.getItem('eventTitle');
    const savedDate = localStorage.getItem('eventDate');

    if (savedTitle) this._eventTitle = savedTitle;
    if (savedDate) this._eventDate = savedDate;
  }

  get eventTitle(): string {
    return this._eventTitle;
  }
  set eventTitle(value: string) {
    this._eventTitle = value;
    localStorage.setItem('eventTitle', value);
  }

  get eventDate(): string {
    return this._eventDate;
  }
  set eventDate(value: string) {
    this._eventDate = value;
    localStorage.setItem('eventDate', value);
  }
}
