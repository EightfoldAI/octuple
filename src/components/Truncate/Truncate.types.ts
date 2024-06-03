import { OcBaseProps } from '../OcBase';

export interface TruncateProps extends OcBaseProps<HTMLDivElement> {
  /**
   * The string to truncate.
   */
  text: string;
  /**
   * The id of the Truncate component used to uniquely Truncate by implementation.
   */
  id?: string;
  /**
   * The number of lines to display before truncating.
   */
  lineClamp?: number;
  /**
   * The function to call when the truncation state changes.
   * Used upstream to enable/disable a Tooltip disabled or any other state based on truncation.
   * @param id The ID of the Truncate text.
   * @param isTruncated The value we get from the Truncate hook.
   * @returns boolean
   */
  onTruncateChange?: (id: string, isTruncated: boolean) => void;
}
