import { Component, signal } from '@angular/core';
import { CountdownComponent } from './components/countdown/countdown';
import { EventFormComponent } from './components/event-form/event-form';
import { QuoteComponent } from './components/quote/quote';
import { OrientationService } from './services/orientation.service';
import { IfPortraitDirective } from './directives/portrait.directive';
import { Orientation } from './types/orientation.enum';

const DEFAULT_EVENT = {
  TITLE: 'Midsummer Eve',
  DATE: '2026-06-20',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IfPortraitDirective, CountdownComponent, EventFormComponent, QuoteComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('nc-challenge');
  orientation: Orientation = Orientation.Landscape;

  private _eventTitle: string = DEFAULT_EVENT.TITLE;
  private _eventDate: string = DEFAULT_EVENT.DATE;

  constructor(private orientationService: OrientationService) {}

  ngOnInit(): void {
    const savedTitle = localStorage.getItem('eventTitle');
    const savedDate = localStorage.getItem('eventDate');

    if (savedTitle) this._eventTitle = savedTitle;
    if (savedDate) this._eventDate = savedDate;

    this.orientationService.orientation$.subscribe(
      (o: Orientation) => (this.orientation = o)
    );
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
