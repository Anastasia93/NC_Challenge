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
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('nc-challenge');
  orientation: Orientation = Orientation.Landscape;
  eventTitle = DEFAULT_EVENT.TITLE;
  eventDate = DEFAULT_EVENT.DATE;

  constructor(private orientationService: OrientationService) {}

  ngOnInit(): void {
    this.orientationService.orientation$.subscribe(
      (o: Orientation) => (this.orientation = o)
    );
  }
}
