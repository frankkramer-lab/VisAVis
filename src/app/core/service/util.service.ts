import { Injectable } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Histogram } from '../../data/schema/histogram';
import { MrsnvCandidateCollection } from '../../data/schema/mrsnv-candidate-collection';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private static alpha = 0.4;

  private static colors = [
    'rgb(181, 0, 0)',
    'rgb(227, 111, 39)',
    'rgb(227, 183, 39)',
    'rgb(235, 231, 26)',
    'rgb(155, 207, 35)',
    'rgb(68, 166, 15)',
    'rgb(59, 209, 104)',
    'rgb(59, 209, 156)',
    'rgb(47, 189, 179)',
    'rgb(64, 191, 219)',
    'rgb(61, 148, 219)',
    'rgb(45, 87, 194)',
    'rgb(19, 21, 145)',
    'rgb(71, 30, 186)',
    'rgb(122, 45, 186)',
    'rgb(158, 45, 186)',
    'rgb(181, 29, 166)',
    'rgb(181, 29, 120)',
  ];

  private static colorsAlpha = [
    `rgba(181, 0, 0, ${UtilService.alpha})`,
    `rgba(227, 111, 39, ${UtilService.alpha})`,
    `rgba(227, 183, 39, ${UtilService.alpha})`,
    `rgba(235, 231, 26, ${UtilService.alpha})`,
    `rgba(155, 207, 35, ${UtilService.alpha})`,
    `rgba(68, 166, 15, ${UtilService.alpha})`,
    `rgba(59, 209, 104, ${UtilService.alpha})`,
    `rgba(59, 209, 156, ${UtilService.alpha})`,
    `rgba(47, 189, 179, ${UtilService.alpha})`,
    `rgba(64, 191, 219, ${UtilService.alpha})`,
    `rgba(61, 148, 219, ${UtilService.alpha})`,
    `rgba(45, 87, 194, ${UtilService.alpha})`,
    `rgba(19, 21, 145, ${UtilService.alpha})`,
    `rgba(71, 30, 186, ${UtilService.alpha})`,
    `rgba(122, 45, 186, ${UtilService.alpha})`,
    `rgba(158, 45, 186, ${UtilService.alpha})`,
    `rgba(181, 29, 166, ${UtilService.alpha})`,
    `rgba(181, 29, 120, ${UtilService.alpha})`,
  ];

  static trackByIndex = (index: number): number => {
    return index;
  }
  sortObjectByKeys(obj: any): any {
    const keys = Object.keys(obj);
    const sorted: any = {};

    keys
      .sort((a, b) => {
        const aNum = Number(a);
        const bNum = Number(b);

        if (Number.isNaN(aNum) || Number.isNaN(bNum)) return obj;

        return aNum > bNum ? 1 : -1;
      })
      .forEach((key) => {
        sorted[key] = obj[key];
      });

    return sorted;
  }

  private static buildBins = (values: number[]): Histogram[] => {
    // Sturge's rule
    const numBins = Math.ceil(Math.log2(values.length)) + 1;
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    const intervalSize = (dataMax - dataMin) / numBins;

    const histogram: Histogram[] = [];
    let borderLow = dataMin;
    let borderHigh = dataMin + intervalSize;
    while (histogram.length < numBins) {
      histogram.push({
        name: `${borderLow.toExponential(2)}:${borderHigh.toExponential(2)}`,
        value: 0,
        lowerBound: borderLow,
        upperBound: borderHigh,
      });
      borderLow = borderHigh;
      if (histogram.length === numBins - 1) {
        borderHigh = dataMax;
      } else {
        borderHigh += intervalSize;
      }
    }
    return histogram;
  };

  private static buildHistogramContinuous = (
    propertyName: string,
    nodeAttributesRaw: any[],
    separator: string | null = null,
  ): { avg?: ChartData; total: ChartData } => {
    const relevantNodeAttributes = nodeAttributesRaw.filter((na) => {
      const pieces = separator ? na.n.split(separator) : [null, null];
      return (
        (na.n === propertyName && separator === null) ||
        (pieces[1] !== null && pieces[1] === propertyName)
      );
    });
    const values: number[] = relevantNodeAttributes.map((na) => Number(na.v));

    const bins: Histogram[] = UtilService.buildBins(values);

    for (let i = 0; i < values.length; i += 1) {
      const value = values[i];
      for (let binIndex = 0; binIndex < bins.length; binIndex += 1) {
        const bin = bins[binIndex];
        if (bin.lowerBound !== undefined && bin.upperBound !== undefined) {
          if (
            (binIndex === 0 && value >= bin.lowerBound && value <= bin.upperBound) || // edge case: left-most bin
            (value > bin.lowerBound && value <= bin.upperBound) // general case
          ) {
            bin.value += 1;
          }
        }
      }
    }
    const colorIndex = Math.ceil(Math.random() * 10000) % UtilService.colors.length;
    const borderColor = UtilService.colors[colorIndex];
    const backgroundColor = UtilService.colorsAlpha[colorIndex];

    const total: ChartData = {
      labels: bins.map((h) => h.name),
      datasets: [
        {
          label: propertyName,
          data: bins.map((h) => h.value),
          borderColor,
          backgroundColor,
        },
      ],
    };
    return { total };
  };

  private static buildHistogramDiscrete = (
    propertyName: string,
    nodeAttributesRaw: any[],
    separator: string | null = null,
  ): { avg?: ChartData; total: ChartData } => {
    const histogram: Histogram[] = [];

    for (let i = 0; i < nodeAttributesRaw.length; i += 1) {
      const na = nodeAttributesRaw[i];
      const pieces = separator ? na.n.split(separator) : [null, null];
      const naName = pieces[1];

      // general or individual property
      if (
        (na.n === propertyName && separator === null) ||
        (naName !== null && naName === propertyName)
      ) {
        const index = histogram.findIndex((h) => h.name === na.v);

        if (index === -1) {
          // add to occurring values
          histogram.push({ name: na.v, value: 1 });
        } else {
          // increase count for value
          histogram[index].value += 1;
        }
      }
    }

    const colorIndex = Math.ceil(Math.random() * 10000) % UtilService.colors.length;
    const borderColor = UtilService.colors[colorIndex];
    const backgroundColor = UtilService.colorsAlpha[colorIndex];

    const total: ChartData = {
      labels: histogram.map((h) => h.name),
      datasets: [
        {
          label: propertyName,
          data: histogram.map((h) => h.value),
          borderColor,
          backgroundColor,
        },
      ],
    };
    return { total };
  };

  static buildHistograms = (
    nodeAttributesRaw: any[],
    propertyCandidates: MrsnvCandidateCollection,
    separator: string,
  ): MrsnvCandidateCollection => {
    const resultsWithCharts: MrsnvCandidateCollection = {
      general: [],
      individual: [],
    };
    // loop general property candidates
    for (let i = 0; i < propertyCandidates.general.length; i += 1) {
      const property = propertyCandidates.general[i];
      let histogramDiscrete: { avg?: ChartData; total: ChartData } | undefined;
      let histogramContinuous: { avg?: ChartData; total: ChartData } | undefined;

      switch (property.datatype) {
        case 'string':
          histogramDiscrete = UtilService.buildHistogramDiscrete(
            property.name,
            nodeAttributesRaw,
            null,
          );
          break;
        case 'boolean':
          histogramDiscrete = UtilService.buildHistogramDiscrete(
            property.name,
            nodeAttributesRaw,
            null,
          );
          break;
        case 'double':
          histogramContinuous = UtilService.buildHistogramContinuous(
            property.name,
            nodeAttributesRaw,
            null,
          );
          break;
        case 'integer':
          histogramDiscrete = UtilService.buildHistogramDiscrete(
            property.name,
            nodeAttributesRaw,
            null,
          );
          histogramContinuous = UtilService.buildHistogramContinuous(
            property.name,
            nodeAttributesRaw,
            null,
          );
          break;
        default:
          console.log(`Cannot build histogram for data type "${property.datatype}"`);
          break;
      }
      resultsWithCharts.general.push({
        ...property,
        distribution: { discrete: histogramDiscrete, continuous: histogramContinuous },
      });
    }

    // loop individual property candidates
    for (let i = 0; i < propertyCandidates.individual.length; i += 1) {
      const property = propertyCandidates.individual[i];
      let histogramDiscrete: { avg?: ChartData; total: ChartData } | undefined;
      let histogramContinuous: { avg?: ChartData; total: ChartData } | undefined;

      switch (property.datatype) {
        case 'string':
          histogramDiscrete = UtilService.buildHistogramDiscrete(
            property.name,
            nodeAttributesRaw,
            separator,
          );
          break;
        case 'boolean':
          histogramDiscrete = UtilService.buildHistogramDiscrete(
            property.name,
            nodeAttributesRaw,
            separator,
          );
          break;
        case 'double':
          histogramContinuous = UtilService.buildHistogramContinuous(
            property.name,
            nodeAttributesRaw,
            separator,
          );
          break;
        case 'integer':
          histogramDiscrete = UtilService.buildHistogramDiscrete(
            property.name,
            nodeAttributesRaw,
            separator,
          );
          histogramContinuous = UtilService.buildHistogramContinuous(
            property.name,
            nodeAttributesRaw,
            separator,
          );
          break;
        default:
          console.log(`Cannot build histogram for data type "${property.datatype}"`);
          break;
      }
      resultsWithCharts.individual.push({
        ...property,
        distribution: { discrete: histogramDiscrete, continuous: histogramContinuous },
      });
    }
    return resultsWithCharts;
  };

  static getChartOptions = (
    property: string | null = null,
    isContinuous: boolean | null = null,
  ): ChartOptions => {
    const prefix =
      isContinuous !== null
        ? `${isContinuous ? 'Binned distribution' : 'Class distribution'}`
        : 'Distribution';
    const suffix = property ? ` for property "${property}"` : '';
    const headline = `${prefix}${suffix}`;

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: headline,
          font: {
            size: 18,
          },
        },
        legend: {
          display: true,
          position: 'top',
        },
      },
    };
  };
}
