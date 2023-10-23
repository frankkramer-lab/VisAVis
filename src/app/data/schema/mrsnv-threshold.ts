export interface MrsnvThreshold {
  /**
   * Value for the lower bound threshold. Only continuous type properties can be used as thresholds.
   * If this value is omitted, the data's minimal occurring value is used.
   */
  min?: number;
  /**
   * Value for the upper bound threshold. Only continuous type properties can be used as thresholds.
   * If this value is omitted, the data's maximal occurring value is used.
   */
  max?: number;
  /**
   * Value for the threshold step size. Only continuous type properties can be used as thresholds.
   */
  step: number;
}
