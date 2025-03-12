import React, { FC } from 'react';
import { AiAgentProps, AiAgentDimensionsMap } from './AiAgent.types';
import { mergeClasses } from '../../../shared/utilities';

export const AiAgent: FC<AiAgentProps> = ({
  size = 'medium',
  variant = 'gradient',
  classNames = '',
}: AiAgentProps) => {
  // Determine dimensions based on size
  const dimensions: AiAgentDimensionsMap = {
    small: { width: 20, height: 18 },
    medium: { width: 30, height: 27 },
    large: { width: 40, height: 36 },
  };

  // Combine classNames
  const combinedClassName = mergeClasses(
    'ai-agent',
    `ai-agent-${size}`,
    `ai-agent-${variant}`,
    classNames
  );

  const { width, height } = dimensions[size];

  // For solid variant, we'll use a simpler version with a single color
  if (variant === 'solid') {
    return (
      <svg
        className={combinedClassName}
        width={width}
        height={height}
        viewBox="0 0 40 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.044 2H12.956C11.5538 2 10.2584 2.75244 9.5587 3.97331L2.52287 16.2504C1.81633 17.4833 1.82648 19.0031 2.5494 20.2263L9.5503 32.0723C10.2566 33.2673 11.5376 34 12.921 34H27.079C28.4624 34 29.7434 33.2673 30.4498 32.0723L37.4506 20.2263C38.1735 19.0031 38.1837 17.4833 37.4772 16.2504L30.4413 3.97331C29.7417 2.75244 28.4462 2 27.044 2Z"
          fill="#1A212E"
        />
        <path
          d="M16.651 25.4116H8L15.42 12.4121C15.4626 12.3357 15.5063 12.2592 15.5509 12.1827L15.42 12.4121C12.2052 18.1701 14.5561 23.6074 16.651 25.4116Z"
          fill="#ffffff"
        />
        <path
          d="M23.2667 25.4125C21.9794 19.733 20.4654 17.7306 19.9177 17.5172C24.5161 16.9431 29.9193 22.5934 32.0001 25.4125L23.2667 25.4125Z"
          fill="#ffffff"
        />
        <path
          d="M15.5461 12.1924C15.5461 12.1924 17.5283 8.48728 18.1487 7.65834C19.9651 5.23111 22.7472 8.98501 24.2397 11.6238L26.9064 16.3386C26.7735 16.2424 26.6232 16.153 26.4579 16.0724C25.3239 15.5193 23.4825 15.3784 21.6863 16.2583C21.104 16.5488 20.5076 16.9571 19.9163 17.5172C18.3973 18.9961 17.1221 21.4763 16.6463 25.4071C12.0126 21.4 13.9564 14.6562 15.5461 12.1924Z"
          fill="#ffffff"
        />
        <path
          d="M31.9999 25.4125L26.9124 16.3386C26.3308 15.844 23.0552 14.5495 19.9224 17.5172C24.7495 17.172 29.9692 22.6969 31.9999 25.4125Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  // For outline variant
  if (variant === 'outline') {
    return (
      <svg
        className={combinedClassName}
        width={width}
        height={height}
        viewBox="0 0 40 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5503 32.0723L2.5494 20.2263C1.82648 19.0031 1.81633 17.4833 2.52287 16.2504L9.5587 3.97331C10.2584 2.75244 11.5538 2 12.956 2H27.044C28.4462 2 29.7417 2.75244 30.4413 3.97331L37.4772 16.2504C38.1837 17.4833 38.1735 19.0031 37.4506 20.2263L30.4498 32.0723C29.7434 33.2673 28.4624 34 27.079 34H12.921C11.5376 34 10.2566 33.2673 9.5503 32.0723ZM0.787631 15.256L7.82345 2.97887C8.87797 1.13878 10.8338 0 12.956 0H27.044C29.1662 0 31.122 1.13878 32.1766 2.97886L39.2124 15.256C40.2767 17.1131 40.2614 19.4013 39.1724 21.2439L32.1715 33.0899L32.1715 33.09C31.1069 34.8912 29.1727 36 27.079 36H12.921C10.8273 36 8.89311 34.8912 7.82853 33.0899L7.82851 33.0899L0.827625 21.2439C0.82762 21.2439 0.827614 21.2439 0.827609 21.2439C-0.261416 19.4012 -0.27664 17.113 0.787622 15.256C0.787625 15.256 0.787628 15.256 0.787631 15.256Z"
          stroke="#1A212E"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M16.651 25.4116H8L15.42 12.4121C15.4626 12.3357 15.5063 12.2592 15.5509 12.1827L15.42 12.4121C12.2052 18.1701 14.5561 23.6074 16.651 25.4116Z"
          stroke="#1A212E"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M23.2667 25.4125C21.9794 19.733 20.4654 17.7306 19.9177 17.5172C24.5161 16.9431 29.9193 22.5934 32.0001 25.4125L23.2667 25.4125Z"
          stroke="#1A212E"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M15.5461 12.1924C15.5461 12.1924 17.5283 8.48728 18.1487 7.65834C19.9651 5.23111 22.7472 8.98501 24.2397 11.6238L26.9064 16.3386C26.7735 16.2424 26.6232 16.153 26.4579 16.0724C25.3239 15.5193 23.4825 15.3784 21.6863 16.2583C21.104 16.5488 20.5076 16.9571 19.9163 17.5172C18.3973 18.9961 17.1221 21.4763 16.6463 25.4071C12.0126 21.4 13.9564 14.6562 15.5461 12.1924Z"
          stroke="#1A212E"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M31.9999 25.4125L26.9124 16.3386C26.3308 15.844 23.0552 14.5495 19.9224 17.5172C24.7495 17.172 29.9692 22.6969 31.9999 25.4125Z"
          stroke="#1A212E"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    );
  }

  // For gradient variant (default)
  return (
    <svg
      className={combinedClassName}
      width={width}
      height={height}
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.044 2H12.956C11.5538 2 10.2584 2.75244 9.5587 3.97331L2.52287 16.2504C1.81633 17.4833 1.82648 19.0031 2.5494 20.2263L9.5503 32.0723C10.2566 33.2673 11.5376 34 12.921 34H27.079C28.4624 34 29.7434 33.2673 30.4498 32.0723L37.4506 20.2263C38.1735 19.0031 38.1837 17.4833 37.4772 16.2504L30.4413 3.97331C29.7417 2.75244 28.4462 2 27.044 2Z"
        fill="url(#paint0_linear_agent)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5503 32.0723L2.5494 20.2263C1.82648 19.0031 1.81633 17.4833 2.52287 16.2504L9.5587 3.97331C10.2584 2.75244 11.5538 2 12.956 2H27.044C28.4462 2 29.7417 2.75244 30.4413 3.97331L37.4772 16.2504C38.1837 17.4833 38.1735 19.0031 37.4506 20.2263L30.4498 32.0723C29.7434 33.2673 28.4624 34 27.079 34H12.921C11.5376 34 10.2566 33.2673 9.5503 32.0723ZM0.787631 15.256L7.82345 2.97887C8.87797 1.13878 10.8338 0 12.956 0H27.044C29.1662 0 31.122 1.13878 32.1766 2.97886L39.2124 15.256C40.2767 17.1131 40.2614 19.4013 39.1724 21.2439L32.1715 33.0899L32.1715 33.09C31.1069 34.8912 29.1727 36 27.079 36H12.921C10.8273 36 8.89311 34.8912 7.82853 33.0899L7.82851 33.0899L0.827625 21.2439C0.82762 21.2439 0.827614 21.2439 0.827609 21.2439C-0.261416 19.4012 -0.27664 17.113 0.787622 15.256C0.787625 15.256 0.787628 15.256 0.787631 15.256Z"
        fill="url(#paint1_linear_agent)"
      />
      <path
        d="M16.651 25.4116H8L15.42 12.4121C15.4626 12.3357 15.5063 12.2592 15.5509 12.1827L15.42 12.4121C12.2052 18.1701 14.5561 23.6074 16.651 25.4116Z"
        fill="url(#paint2_linear_agent)"
      />
      <path
        d="M23.2667 25.4125C21.9794 19.733 20.4654 17.7306 19.9177 17.5172C24.5161 16.9431 29.9193 22.5934 32.0001 25.4125L23.2667 25.4125Z"
        fill="url(#paint3_linear_agent)"
      />
      <path
        d="M15.5461 12.1924C15.5461 12.1924 17.5283 8.48728 18.1487 7.65834C19.9651 5.23111 22.7472 8.98501 24.2397 11.6238L26.9064 16.3386C26.7735 16.2424 26.6232 16.153 26.4579 16.0724C25.3239 15.5193 23.4825 15.3784 21.6863 16.2583C21.104 16.5488 20.5076 16.9571 19.9163 17.5172C18.3973 18.9961 17.1221 21.4763 16.6463 25.4071C12.0126 21.4 13.9564 14.6562 15.5461 12.1924Z"
        fill="url(#paint4_linear_agent)"
      />
      <path
        d="M26.4579 16.0724C25.5752 15.664 23.7157 15.2461 21.6863 16.2583C23.4825 15.3784 25.3239 15.5193 26.4579 16.0724Z"
        fill="url(#paint5_linear_agent)"
      />
      <path
        d="M31.9999 25.4125L26.9124 16.3386C26.3308 15.844 23.0552 14.5495 19.9224 17.5172C24.7495 17.172 29.9692 22.6969 31.9999 25.4125Z"
        fill="url(#paint6_linear_agent)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_agent"
          x1="2"
          y1="19.1429"
          x2="38"
          y2="19.1429"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BCE4FF" />
          <stop offset="0.49" stopColor="#CACFFC" />
          <stop offset="1" stopColor="#EAD3E8" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_agent"
          x1="2.90801e-07"
          y1="19.2857"
          x2="40"
          y2="19.2857"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2C8CC9" />
          <stop offset="0.49" stopColor="#5962B7" />
          <stop offset="1" stopColor="#975590" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_agent"
          x1="11.8142"
          y1="29.9848"
          x2="13.4299"
          y2="12.1783"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B56ECF" />
          <stop offset="1" stopColor="#593CB4" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_agent"
          x1="21.1148"
          y1="17.4736"
          x2="27.042"
          y2="26.5532"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3A2AAB" />
          <stop offset="1" stopColor="#AE6ACD" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_agent"
          x1="20.358"
          y1="6.73725"
          x2="15.3614"
          y2="25.4056"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7024D7" />
          <stop offset="0.36529" stopColor="#983EAA" />
          <stop offset="1" stopColor="#C95E75" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_agent"
          x1="20.358"
          y1="6.73725"
          x2="15.3614"
          y2="25.4056"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7024D7" />
          <stop offset="0.36529" stopColor="#983EAA" />
          <stop offset="1" stopColor="#C95E75" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_agent"
          x1="22.8448"
          y1="15.3254"
          x2="32.6927"
          y2="23.5345"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#382AAA" />
          <stop offset="0.670424" stopColor="#9C60C7" />
        </linearGradient>
      </defs>
    </svg>
  );
};
