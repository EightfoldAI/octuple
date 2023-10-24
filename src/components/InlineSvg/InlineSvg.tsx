import React, { useEffect, useMemo, useState, useRef, FC, Ref } from 'react';
import { InlineSvgProps } from './InlineSvg.types';
import { Icon, IconName } from '../Icon';
import { Skeleton, SkeletonVariant } from '../Skeleton';
import { usePreviousState } from '../../hooks/usePreviousState';

export const InlineSvg: FC<InlineSvgProps> = React.forwardRef(
  (
    {
      classNames,
      height,
      hideBrokenIcon = false,
      showSkeleton = false,
      skeletonVariant = SkeletonVariant.Rounded,
      url,
      width,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const svgRef = useRef<HTMLDivElement>(null);

    const [_url, setUrl] = useState<string>(url);
    const previousUrl: string = usePreviousState(_url);

    useEffect(() => {
      setUrl(url);
    }, [url]);

    useMemo(() => {
      setIsLoading(true);
      setHasError(false);

      if (svgRef.current) {
        svgRef.current.innerHTML = '';
      }

      const fetchSvg = async (): Promise<void> => {
        try {
          const response: Response = await fetch(_url);
          const text: string = await response.text();

          const parser: DOMParser = new DOMParser();
          const xml: Document = parser.parseFromString(text, 'image/svg+xml');
          const svg: HTMLElement = xml.documentElement;

          if (svg.nodeName !== 'svg') {
            throw new Error(`Fetched document is not an SVG: ${_url}`);
          }

          svgRef.current.innerHTML = text;
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setHasError(true);
          setIsLoading(false);
        }
      };

      if (_url !== previousUrl) {
        fetchSvg();
      }
    }, [_url]);

    /**
     * Provides a broken icon size for when the SVG doesn't work out.
     * The size is the smaller of the width and height
     *
     * @returns {string} The size of the broken icon, as a string with the unit
     */
    const getBrokenIconSize = (): string => {
      if (!width || !height) {
        return '24px';
      }
      if (!width) {
        return height;
      }
      if (!height) {
        return width;
      }

      const widthInt: number = parseInt(width, 10);
      const heightInt: number = parseInt(height, 10);
      const smaller: number = Math.min(widthInt, heightInt);
      return `${smaller}px`;
    };

    return (
      <div {...rest} ref={ref} className={classNames} style={{ width, height }}>
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
  }
);
