/**
 * Data structure to store information about occurrences of nodes within the network.
 * First key holds the property name, by which to filter, for instance 'cancer subtype'
 * Second key holds the property's possible values, for instance 'basal cancer'.
 */
export interface NetworkOccurrences {
  [key: string]: { [key: string]: number };
}
