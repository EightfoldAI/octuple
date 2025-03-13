/**
 * The size variant of the AI Agent icon
 */
export enum AiAgentSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

/**
 * The style variant of the AI Agent icon
 */
export enum AiAgentVariant {
  SOLID = 'solid',
  OUTLINE = 'outline',
  GRADIENT = 'gradient',
}

/**
 * The props for the AI Agent icon
 */
export interface AiAgentProps {
  /**
   * The size variant of the AI Agent icon
   */
  size?: AiAgentSize | 'small' | 'medium' | 'large';
  /**
   * The style variant of the AI Agent icon
   */
  variant?: AiAgentVariant | 'solid' | 'outline' | 'gradient';
  /**
   * Optional custom class name
   */
  classNames?: string;
}

/**
 * The dimensions of the AI Agent icon
 */
export interface AiAgentDimensions {
  width: number;
  height: number;
}

/**
 * The map of dimensions for the AI Agent icon
 */
export type AiAgentDimensionsMap = {
  [key in AiAgentSize | 'small' | 'medium' | 'large']: AiAgentDimensions;
};
