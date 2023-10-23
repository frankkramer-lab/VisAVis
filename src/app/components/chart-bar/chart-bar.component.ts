import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { UtilService } from '../../core/service/util.service';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() chartData!: ChartData;

  @Input() chartOptions!: ChartOptions;

  @Input() propertyName!: string;

  @Input() isContinuous!: boolean;

  @ViewChild('chart') chartContainer!: ElementRef;

  c: Chart | null = null;

  private buildChart() {
    if (this.c) {
      this.c.destroy();
    }

    this.c = new Chart(this.chartContainer.nativeElement, {
      type: 'bar',
      data: { ...this.chartData },
      options: this.chartOptions ? { ...this.chartOptions } : UtilService.getChartOptions(this.propertyName ?? null, this.isContinuous ?? null),
    });
  }

  ngAfterViewInit(): void {
    if (this.chartContainer && this.chartData) {
      this.buildChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartContainer && (changes.chartData || changes.chartOptions)) {
      this.buildChart();
    }
  }

  ngOnDestroy(): void {
    if (this.c) this.c.destroy();
  }
}
