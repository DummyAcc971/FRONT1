import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import Router if needed for search logic later
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// @Component({
//   selector: 'app-home', // Make sure this matches how you use it (usually app-home)
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
//   standalone: true,
//   imports:[FormsModule,RouterModule] 
// })
// export class HomeComponent {
//   searchSymbol: string = ''; // To bind to the search input
//   constructor(private router: Router) {}

  // searchStock() {
  //   if (this.searchSymbol) {
  //     console.log('Searching for:', this.searchSymbol);
  //     alert(`Search functionality for "${this.searchSymbol}" is a placeholder.`);
  //   } else {
  //     alert('Please enter a stock symbol.');
  //   }
  // }
  // currentYear: number = new Date().getFullYear();
  

// }



Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule] // Import FormsModule for template-driven forms
})
export class HomeComponent {
  searchSymbol: string = '';
  isLoading: boolean = false;
  isModalOpen: boolean = false;
  isSearchDisabled: boolean = false;
  chart: any;
  apiKey: string = '3c4bf1a6147843a59eda1d9bde0c7f88';
  colors: string[] = [
    '#FF6384', '#36A2EB', '#4BC0C0', '#9966FF',
    '#FF9F40', '#00B894', '#E17055', '#6C5CE7'
  ];

  async fetchStockData(symbol: string) {
    try {
      const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=5min&outputsize=96&apikey=${this.apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.values) return null;

      return {
        symbol: symbol.toUpperCase(),
        timestamps: data.values.map((v: any) => new Date(v.datetime)).reverse(),
        prices: data.values.map((v: any) => parseFloat(v.close)).reverse()
      };
    } catch {
      return null;
    }
  }

  formatTimestamps(timestamps: Date[]) {
    let formattedTimestamps: string[] = [];
    let lastDate: string | null = null;

    timestamps.forEach((timestamp) => {
      const date = timestamp.toLocaleDateString();
      const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (time === '09:40 AM') {
        formattedTimestamps.push(`${date} ${time}`);
        lastDate = date;
      } else if (lastDate !== date) {
        formattedTimestamps.push(`${date} ${time}`);
        lastDate = date;
      } else {
        formattedTimestamps.push(time);
      }
    });

    return formattedTimestamps;
  }

  async drawChart(symbols: string[]) {
    this.isLoading = true;

    const datasets: any[] = [];
    let labels: string[] = [];
    const failed: string[] = [];

    for (let i = 0; i < symbols.length; i++) {
      const stock = await this.fetchStockData(symbols[i]);
      if (!stock) {
        failed.push(symbols[i]);
        continue;
      }

      if (labels.length === 0) labels = this.formatTimestamps(stock.timestamps);

      datasets.push({
        label: stock.symbol,
        data: stock.prices.map((p: number, idx: number) => ({ x: labels[idx], y: p })),
        borderColor: this.colors[i % this.colors.length],
        fill: false,
        tension: 0.1
      });
    }

    if (this.chart) this.chart.destroy();

    if (datasets.length === 0) {
      alert('No valid stock data found.');
      this.isLoading = false;
      return;
    }

    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Stock Price vs Time (Vertical View)'
          },
          tooltip: {
            mode: 'nearest',
            intersect: false
          }
        },
        interaction: {
          mode: 'nearest',
          intersect: false
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            },
            type: 'category',
            labels: labels,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price (USD)'
            }
          }
        }
      }
    });

    this.isLoading = false;

    if (failed.length > 0) {
      alert(`Could not load: ${failed.join(', ')}`);
    }
  }

  searchStock() {
    const symbols = this.searchSymbol.trim().toUpperCase().split(',').map(s => s.trim()).filter(Boolean);

    if (!symbols.length) {
      alert('Please enter stock symbols.');
      return;
    }

    if (symbols.length > 20) {
      alert('You can only search for up to 20 symbols at a time.');
      return;
    }
    this.isModalOpen = true; // Open the modal
    this.isSearchDisabled = false;
    this.drawChart(symbols);
  }

  closeModal(event?: Event) {
    if (event) event.stopPropagation();
    this.isModalOpen = false; // Close the modal
    this.isSearchDisabled = false;
    // alert('Please sign up to see different stock details.');
    // this.drawChart(symbols);

    
  }
}