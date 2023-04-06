import { SkeletonVariant } from '../Skeleton';

export interface InlineSvgProps {
  /**
   * Custom classnames of the component
   */
  classNames?: string;
  /**
   * Height for SVG display.
   */
  height?: string;
  /**
   * Indicates if broken icon should be explicitly hidden.
   * If not enabled, the broken icon wil be displayed if
   * svg loading fails for whatever reason.
   * @default false
   */
  hideBrokenIcon?: boolean;
  /**
   * Indicates if loading skeleton should be shown. If true,
   * provided width and height will be used to determine size
   * of the skeleton.
   * @default false
   */
  showSkeleton?: boolean;
  /**
   * Indicates the skeleton variant to be displayed while
   * svg is loading.
   * @default SkeletonVariant.Rounded
   */
  skeletonVariant?: SkeletonVariant;
  /**
   * Url for the svg to be displayed.
   */
  url: string;
  /**
   * Width for SVG display.
   */
  width?: string;
}
