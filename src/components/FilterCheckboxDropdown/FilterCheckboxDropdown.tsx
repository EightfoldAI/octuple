'use client';

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react';
import { CheckBox } from '../CheckBox';
import { Icon, IconName } from '../Icon';
import { eventKeys, mergeClasses, uniqueId } from '../../shared/utilities';
import {
  FilterCheckboxDropdownOption,
  FilterCheckboxDropdownProps,
} from './FilterCheckboxDropdown.types';

import styles from './FilterCheckboxDropdown.module.scss';

export const FilterCheckboxDropdown: FC<FilterCheckboxDropdownProps> = ({
  label,
  options,
  selectedValues: controlledSelectedValues,
  onChange,
  disabled = false,
  classNames,
  id,
  heading,
  placement = 'bottom-start',
  'data-testid': dataTestId,
}) => {
  const isControlled = controlledSelectedValues !== undefined;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [internalSelected, setInternalSelected] = useState<string[]>(
    controlledSelectedValues ?? []
  );

  const selected = isControlled ? controlledSelectedValues : internalSelected;

  const panelId = useRef<string>(
    id ? `${id}-panel` : uniqueId('filter-checkbox-dropdown-panel-')
  );
  const legendId = useRef<string>(
    id ? `${id}-legend` : uniqueId('filter-checkbox-dropdown-legend-')
  );
  const { x, y, strategy, refs, update } = useFloating({
    placement,
    strategy: 'absolute',
    middleware: [offset(4), flip(), shift()],
  });

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return () => {};
    }
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update]);

  const close = useCallback((): void => {
    setIsOpen(false);
    (refs.reference.current as HTMLButtonElement)?.focus();
  }, [refs.reference]);

  useEffect(() => {
    if (!isOpen) return () => {};

    const handleOutsideClick = (e: MouseEvent): void => {
      const floatingEl = refs.floating.current;
      const referenceEl = refs.reference.current as HTMLElement | null;
      if (
        floatingEl?.contains(e.target as Node) ||
        referenceEl?.contains(e.target as Node)
      ) {
        return;
      }
      if (!isControlled) {
        setInternalSelected([]);
      }
      close();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, isControlled, close, refs.floating, refs.reference]);

  const handlePanelKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === eventKeys.ESCAPE) {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key === eventKeys.TAB) {
        setTimeout(() => {
          if (
            refs.floating.current &&
            !refs.floating.current.contains(document.activeElement)
          ) {
            setIsOpen(false);
          }
        }, 0);
      }
    },
    [close, refs.floating]
  );

  const handleCheckboxChange = (value: string, checked: boolean): void => {
    const next = checked
      ? [...selected, value]
      : selected.filter((v) => v !== value);
    if (!isControlled) {
      setInternalSelected(next);
    }
    onChange?.(next);
  };

  return (
    <div
      className={mergeClasses([styles.container, classNames])}
      data-testid={dataTestId}
    >
      <button
        ref={refs.setReference}
        id={id}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId.current}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={mergeClasses([
          styles.trigger,
          { [styles.triggerOpen]: isOpen },
        ])}
      >
        <span>{label}</span>
        <Icon
          path={IconName.mdiChevronDown}
          classNames={mergeClasses([
            styles.chevron,
            { [styles.chevronOpen]: isOpen },
          ])}
        />
      </button>

      {isOpen && (
        <div
          ref={refs.setFloating}
          id={panelId.current}
          role="dialog"
          aria-labelledby={legendId.current}
          className={styles.panel}
          style={{
            position: strategy,
            top: Math.floor(y ?? 0),
            left: Math.floor(x ?? 0),
          }}
          onKeyDown={handlePanelKeyDown}
        >
          <fieldset className={styles.fieldset}>
            <legend
              id={legendId.current}
              className={heading ? styles.legend : styles.legendHidden}
            >
              {heading ?? label}
            </legend>
            <ul className={styles.checkboxList}>
              {options.map((option) => (
                <li key={option.value} className={styles.checkboxItem}>
                  <CheckBox
                    label={option.label}
                    checked={selected.includes(option.value)}
                    disabled={option.disabled}
                    onChange={(e) =>
                      handleCheckboxChange(option.value, e.target.checked)
                    }
                    value={option.value}
                  />
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      )}
    </div>
  );
};
