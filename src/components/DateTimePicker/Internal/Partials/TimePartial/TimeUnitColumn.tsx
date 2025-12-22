import React, { useRef, useLayoutEffect } from 'react';
import { TimeUnitColumnProps, Unit } from './Time.types';
import { mergeClasses } from '../../../../../shared/utilities';
import { scrollTo, waitElementReady } from '../../Utils/uiUtil';
import PartialContext from '../../PartialContext';

import styles from '../../ocpicker.module.scss';

function TimeUnitColumn(props: TimeUnitColumnProps) {
  const { active, hideDisabledOptions, onSelect, units, value } = props;
  const { open } = React.useContext(PartialContext);

  const ulRef: React.MutableRefObject<HTMLUListElement> =
    useRef<HTMLUListElement>(null);
  const liRefs: React.MutableRefObject<Map<number, HTMLElement>> = useRef<
    Map<number, HTMLElement | null>
  >(new Map());
  const scrollRef: React.MutableRefObject<Function> = useRef<Function>();

  // `useLayoutEffect` here to avoid flicker
  useLayoutEffect(() => {
    const li: HTMLElement = liRefs.current?.get(value!);
    if (li && open !== false) {
      scrollTo(ulRef.current!, li.offsetTop - 8, 120);
    }
  }, [value]);

  useLayoutEffect(() => {
    if (open) {
      const li: HTMLElement = liRefs.current.get(value!);
      if (li) {
        scrollRef.current = waitElementReady(li, () => {
          scrollTo(ulRef.current!, li.offsetTop - 8, 0);
        });
      }
    }

    return () => {
      scrollRef.current?.();
    };
  }, [open]);

  return (
    <ul
      className={mergeClasses([
        styles.pickerTimePartialColumn,
        { [styles.pickerTimePartialColumnActive]: active },
      ])}
      ref={ulRef}
      style={{ position: 'relative' }}
    >
      {units!.map((unit: Unit) => {
        if (hideDisabledOptions && unit.disabled) {
          return null;
        }

        return (
          <li
            key={unit.value}
            ref={(element) => {
              liRefs.current.set(unit.value, element);
            }}
            role="option"
            aria-selected={value === unit.value}
            aria-disabled={unit.disabled}
            className={mergeClasses([
              'picker-time-partial-cell',
              {
                [styles.pickerTimePartialCellDisabled]: unit.disabled,
              },
              {
                [styles.pickerTimePartialCellSelected]: value === unit.value,
              },
            ])}
            onClick={() => {
              if (unit.disabled) {
                return;
              }
              onSelect!(unit.value);
            }}
          >
            <div className={styles.pickerTimePartialCellInner}>
              {unit.label}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TimeUnitColumn;
