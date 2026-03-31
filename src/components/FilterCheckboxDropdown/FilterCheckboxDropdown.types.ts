export interface FilterCheckboxDropdownOption {
  /** Display label for the checkbox */
  label: string;
  /** Unique value for this option */
  value: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface FilterCheckboxDropdownProps {
  /** Label for the trigger button, e.g. "Location" */
  label: string;
  /** List of checkbox options */
  options: FilterCheckboxDropdownOption[];
  /** Controlled selected values */
  selectedValues?: string[];
  /** Called when selection changes */
  onChange?: (values: string[]) => void;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Additional CSS class names for the container */
  classNames?: string;
  /** ID for the trigger button */
  id?: string;
  /** Optional visible heading rendered inside the dropdown panel */
  heading?: string;
  /** Placement of the floating panel */
  placement?: 'bottom-start' | 'bottom-end' | 'bottom';
  /** Test ID for the component */
  'data-testid'?: string;
}
