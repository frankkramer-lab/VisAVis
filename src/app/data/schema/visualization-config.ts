import { ComponentVisibilityEnum } from '../enum/component-visibility.enum';
import { ImageDownloadConfig } from './image-download-config';
import { ThresholdBounds } from './threshold-bounds';

export interface VisualizationConfig {
  uuid: string;
  /**
   * Generator version, if not set, defaults to 0
   */
  v?: number;
  /**
   * Sidebar component visibility
   */
  sb?: ComponentVisibilityEnum;
  /**
   * Sidebar's patient component visibilty
   */
  cP?: ComponentVisibilityEnum;
  /**
   * Sidebar's threshold component visibility
   */
  cT?: ComponentVisibilityEnum;
  /**
   * Sidebar's nodes component visibility
   */
  cN?: ComponentVisibilityEnum;
  /**
   * Sidebar's layout component visibility
   */
  cL?: ComponentVisibilityEnum;
  /**
   * Sidebar's download component visibility
   */
  cD?: ComponentVisibilityEnum;
  /**
   * Sidebar's generator component visibility
   */
  cG?: ComponentVisibilityEnum;
  /**
   * Sidebar's impressum component visibility
   */
  cIm?: ComponentVisibilityEnum;
  /**
   * Sidebar's back button's visibility
   */
  bb?: boolean;
  /**
   * True, if the image download is to be triggered
   */
  dwn?: boolean;
  /**
   * Image configuration for the triggered image download
   */
  img?: ImageDownloadConfig;
  /**
   * Defines coloring of the nodes
   */
  col?: string;
  /**
   * Defines sizing of the nodes
   */
  size?: string;
  /**
   * Selected patient group A
   */
  pa?: string;
  /**
   * Selected patient group B
   */
  pb?: string;
  /**
   * Contains the name of the boolean property that is to be applied. Empty, if none is to be applied.
   */
  bool?: string;
  /**
   * List of selected nodes
   */
  sel?: string[];
  /**
   * True, if all nodes are visible
   */
  all?: boolean;
  /**
   * True, if only shared nodes are to be shown
   */
  shared?: boolean;
  /**
   * Defined threshold, consisting of {@link ThresholdBounds}:
   * th_propertyA: {min: 1.24, max: 2.54},
   * th_propertyB: {min: 5.523, max: 10.599},
   * ...
   */
  // th?: { [key: string]: ThresholdBounds };
  th?: { [key: string]: string };
}
