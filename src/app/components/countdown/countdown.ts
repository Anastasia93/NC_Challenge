import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.html',
  styleUrls: ['./countdown.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {
  @Input() eventTitle: string = ''; 
  @Input() eventDate: string = '';

  targetDate!: Date;
  remainingTime: string = '';
  private intervalId: any;

  ngOnInit() {
    this.setTargetDateFromInputOrDefault();
    this.startCountdown();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['eventDate'] && !changes['eventDate'].isFirstChange()) {
      this.setTargetDateFromInputOrDefault();
      this.startCountdown();
    }
  }

  ngOnDestroy() {
    this.clearCountdownInterval();
  }

  private setTargetDateFromInputOrDefault() {
    if (this.eventDate) {
      const parsed = this.parseDatetimeLocal(this.eventDate);
      if (parsed && !isNaN(parsed.getTime())) {
        this.targetDate = parsed;
        return;
      }
    }

    this.setNextMidsummerEve();
  }

  private parseDatetimeLocal(value: string): Date | null {
    if (!value) return null;
    const [datePart, timePart] = value.split('T');
    if (!datePart) return null;
    const [y, m, d] = datePart.split('-').map(Number);
    if (!timePart) {
      return new Date(y, (m || 1) - 1, d || 1, 18, 0, 0, 0); // default 'evening' time
    }
    const timeParts = timePart.split(':').map(Number);
    const hour = timeParts[0] ?? 0;
    const minute = timeParts[1] ?? 0;
    const second = timeParts[2] ?? 0;
    
    return new Date(y, (m || 1) - 1, d || 1, hour, minute, second, 0);
  }

  private setNextMidsummerEve() {
    const now = new Date();
    const year = now.getFullYear();
    let midsummer = new Date(year, 5, 20, 18, 0, 0, 0);
    if (now > midsummer) midsummer = new Date(year + 1, 5, 20, 18, 0, 0, 0);
    this.targetDate = midsummer;
  }

  private startCountdown() {
    this.clearCountdownInterval();
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  private clearCountdownInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private updateCountdown() {
    if (!this.targetDate) {
      this.remainingTime = '';
      return;
    }
    const now = Date.now();
    const distance = this.targetDate.getTime() - now;

    if (distance <= 0) {
      this.remainingTime = `${this.eventTitle || 'Event'} is here!`;
      this.clearCountdownInterval();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.remainingTime = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }
}
