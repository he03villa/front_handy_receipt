import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonListHeader, IonItem, IonIcon, IonThumbnail, IonNote, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { Chart } from 'chart.js/auto';
import { addIcons } from 'ionicons';
import { cube } from 'ionicons/icons';
import { FacturaService } from 'src/app/services/factura.service';
import { EchoService } from 'src/app/services/echo.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.page.html',
  styleUrls: ['./dashboard-home.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonNote, IonIcon, IonItem, IonListHeader, IonList, IonLabel, IonSegmentButton, IonSegment, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, IonContent, IonThumbnail, CommonModule, FormsModule, NavComponent]
})
export class DashboardHomePage implements OnInit {

  private _factura:FacturaService = inject(FacturaService);

  @ViewChild('salesChart') salesChartRef: ElementRef | undefined;
  @ViewChild('categorySalesChart') categorySalesChartRef: ElementRef | undefined;
  @ViewChild('timeComparisonChart') timeComparisonChartRef: ElementRef | undefined;
  @ViewChild('topProductsChart') topProductsChartRef: ElementRef | undefined;

  salesChart: Chart | null = null;
  categorySalesChart: Chart | null = null;
  timeComparisonChart: Chart | null = null;
  topProductsChart: Chart | null = null;

  salesData:any = {
    totalRevenue: 125780,
    dailyAverage: 4192.67,
    categorySales: [],
    topProducts: [],
    dailySales: [],
    weeklySales: [],
    monthlySales: []
  };

  timeframe: string = 'daily';

  constructor() { 
    addIcons({ cube });
  }

  ngOnInit() {
    this.cargarDashboard();
    
  }

  async cargarDashboard() {
    const res:any = await this._factura.getDashboard();
    if (!res.error) {
      this.salesData = res;
      console.log(this.salesData);
      this.createSalesChart();
      this.createCategorySalesChart();
      this.createTimeComparisonChart();
      this.createTopProductsChart();
    }
  }

  ionViewDidEnter() {
    /* this.createSalesChart();
    this.createCategorySalesChart();
    this.createTimeComparisonChart();
    this.createTopProductsChart(); */
  }

  createSalesChart() {
    const ctx = this.salesChartRef?.nativeElement.getContext('2d');
    this.salesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Ventas Diarias',
          data: this.salesData.dailySales,
          borderColor: '#3880ff',
          backgroundColor: 'rgba(56, 128, 255, 0.2)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Ventas Totales (Últimos 7 días)'
          }
        }
      }
    });
  }

  createCategorySalesChart() {
    const ctx = this.categorySalesChartRef?.nativeElement.getContext('2d');
    this.categorySalesChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.salesData.categorySales.map((item:any) => item.category),
        datasets: [{
          data: this.salesData.categorySales.map((item:any) => item.amount),
          backgroundColor: ['#3880ff', '#3dc2ff', '#5260ff', '#2dd36f']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Ventas por Categoría'
          }
        }
      }
    });
  }

  createTimeComparisonChart() {
    const ctx = this.timeComparisonChartRef?.nativeElement.getContext('2d');
    
    let labels, data;
    switch(this.timeframe) {
      case 'daily':
        labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        data = this.salesData.dailySales;
        break;
      case 'weekly':
        labels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
        data = this.salesData.weeklySales;
        break;
      case 'monthly':
        labels = ['Enero', 'Febrero', 'Marzo'];
        data = this.salesData.monthlySales;
        break;
    }
    
    this.timeComparisonChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Ventas (${this.timeframe})`,
          data: data ?? [],
          backgroundColor: 'rgba(82, 96, 255, 0.8)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Comparativa de Ventas ${this.timeframe}`
          }
        }
      }
    });
  }

  createTopProductsChart() {
    const ctx = this.topProductsChartRef?.nativeElement.getContext('2d');
    this.topProductsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.salesData.topProducts.map((p:any) => p.name),
        datasets: [{
          label: 'Ingresos ($)',
          data: this.salesData.topProducts.map((p:any) => p.revenue),
          backgroundColor: 'rgba(45, 211, 111, 0.7)',
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Top Productos por Ingresos'
          }
        }
      }
    });
  }

  segmentChanged(event:any) {
    this.timeframe = event.detail.value;
    if (this.timeComparisonChart) {
      this.timeComparisonChart.destroy();
    }
    this.createTimeComparisonChart();
  }

  handleRefresh(event: CustomEvent) {
    if (this.timeComparisonChart) {
      this.timeComparisonChart.destroy();
    }
    if (this.topProductsChart) {
      this.topProductsChart.destroy();
    }
    if (this.categorySalesChart) {
      this.categorySalesChart.destroy();
    }
    if (this.salesChart) {
      this.salesChart.destroy();
    }
    this.cargarDashboard();
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

}
