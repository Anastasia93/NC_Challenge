import { Component, signal } from '@angular/core';

import { CountdownComponent } from './components/countdown/countdown';
import { EventFormComponent } from './components/event-form/event-form';
import { QuoteComponent } from './components/quote/quote';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountdownComponent, EventFormComponent, QuoteComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nc-challenge');
}
