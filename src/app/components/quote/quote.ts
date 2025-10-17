import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Quote {
  id?: number;
  quote: string;
  author: string;
}

const QUOTE_API_URL = 'https://dummyjson.com/quotes/random';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.html',
  styleUrls: ['./quote.scss'],
})
export class QuoteComponent implements OnInit {
  error = '';
  loading = true;
  quote: Quote | null = null;

  private static cachedQuote: Quote | null = null;
  private http = inject(HttpClient);

  ngOnInit() {
    if (QuoteComponent.cachedQuote) {
      this.quote = QuoteComponent.cachedQuote;
      this.loading = false;
    } else {
      this.fetchQuote();
    }
  }

  fetchQuote() {
    this.loading = true;
    this.error = '';

    this.http.get<Quote>(QUOTE_API_URL).subscribe({
      next: (data) => {
        this.quote = data;
        QuoteComponent.cachedQuote = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load the quote.';
        this.loading = false;
      },
    });
  }
}
