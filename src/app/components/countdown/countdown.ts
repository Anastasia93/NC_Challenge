import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.html',
  styleUrls: ['./countdown.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  targetDate!: Date;
  remainingTime: string = '';
  private intervalId: any;

  ngOnInit() {
    this.setNextMidsummerEve();
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private setNextMidsummerEve() {
    const now = new Date();
    const year = now.getFullYear();

    let midsummer = new Date(year, 5, 20, 18, 0, 0);

    if (now > midsummer) {
      midsummer = new Date(year + 1, 5, 20, 18, 0, 0);
    }

    this.targetDate = midsummer;
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance <= 0) {
      this.remainingTime = "Midsummer Eve is here!";
      clearInterval(this.intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.remainingTime = `${days} days, ${hours} h, ${minutes}m, ${seconds}s`;
  }
}