import { ChartData } from 'chart.js';

export interface Distribution {
  discrete?: { avg?: ChartData; total: ChartData };
  continuous?: { avg?: ChartData; total: ChartData };
}
