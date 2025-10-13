import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Quote {
  id?: number;
  quote: string;
  author: string;
}

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.html',
  styleUrls: ['./quote.scss'],
})
export class QuoteComponent implements OnInit {
  quote: Quote | null = null;
  loading = true;
  error = '';

  private http = inject(HttpClient);

  ngOnInit() {
    this.fetchQuote();
  }

  fetchQuote() {
    this.loading = true;
    this.error = '';
    this.http.get<Quote>('https://dummyjson.com/quotes/random')
      .subscribe({
        next: (data) => {
          this.quote = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load the quote.';
          this.loading = false;
        }
      });
  }
}