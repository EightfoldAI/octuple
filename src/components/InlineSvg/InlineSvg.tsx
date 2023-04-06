import React, { useState, useEffect, useRef } from 'react';
import { Icon, IconName } from '../Icon';
import { Skeleton, SkeletonVariant } from '../Skeleton';

import { InlineSvgProps } from './InlineSvg.types';

export const InlineSvg = ({
  classNames,
  height,
  hideBrokenIcon = false,
  showSkeleton = false,
  skeletonVariant = SkeletonVariant.Rounded,
  url,
  width,
}: InlineSvgProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    svgRef.current.innerHTML = '';

    async function fetchSvg() {
      try {
        const response = await fetch(url);
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'image/svg+xml');
        const svg = xml.documentElement;

        if (svg.nodeName !== 'svg') {
          throw new Error(`Fetched document is not an SVG: ${url}`);
        }

        svgRef.current.innerHTML = text;
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setHasError(true);
        setIsLoading(false);
      }
    }

    fetchSvg();
  }, [url]);

  /**
   * Provides a broken icon size for when the SVG doesn't work out.
   * The size is the smaller of the width and height
   *
   * @returns {string} The size of the broken icon, as a string with the unit
   */
  const getBrokenIconSize = () => {
    if (!width || !height) {
      return '24px';
    }
    if (!width) {
      return height;
    }
    if (!height) {
      return width;
    }

    const widthInt = parseInt(width, 10);
    const heightInt = parseInt(height, 10);
    const smaller = Math.min(widthInt, heightInt);
    return `${smaller}px`;
  };

  return (
    <div className={classNames} style={{ width, height }}>
      {isLoading && showSkeleton && (
        <Skeleton width={width} height={height} variant={skeletonVariant} />
      )}

      {hasError && !hideBrokenIcon && (
        <Icon
          classNames="svg-display-error-icon"
          path={IconName.mdiImageBroken}
          role="presentation"
          size={getBrokenIconSize()}
        />
      )}
      <div ref={svgRef} />
    </div>
  );
};
