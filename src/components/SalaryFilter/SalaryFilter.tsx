import React, { useState } from 'react';
import { Button, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { CheckBox } from '../CheckBox';
import { Pill, PillSize, PillThemeName } from '../Pills';
import { Select } from '../Select';
import { SelectOption, SelectShape, SelectSize } from '../Select/Select.types';
import { TextInput } from '../Inputs';
import { TextInputShape, TextInputSize, TextInputWidth } from '../Inputs/Input.types';
import { Stack } from '../Stack';
import { Label } from '../Label';
import { Card } from '../Card';
import { CardSize } from '../Card/Card.types';
import styles from './SalaryFilter.module.scss';

export type QuickFilter = '$15+' | '$18+' | '$20+' | '$25+' | null;
export type PayPeriod = 'hour' | 'day' | 'week' | 'year';
export type SalaryDisplay = 'structured' | 'estimated' | 'none';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  distance: string;
  salaryDisplay: SalaryDisplay;
  salaryMin?: number;
  salaryMax?: number;
  salaryEstimated?: boolean;
  jobType: string;
  tags?: string[];
}

export interface SalaryFilterProps {
  onFilterChange?: (filter: SalaryFilterState) => void;
  jobListings?: JobListing[];
  classNames?: string;
}

export interface SalaryFilterState {
  quickFilter: QuickFilter;
  customMin: string;
  payPeriod: PayPeriod;
  includeEstimated: boolean;
  includeUnlisted: boolean;
}

const PAY_PERIOD_OPTIONS: SelectOption[] = [
  { text: 'hour', value: 'hour' },
  { text: 'day', value: 'day' },
  { text: 'week', value: 'week' },
  { text: 'year', value: 'year' },
];

const QUICK_FILTERS: { label: string; value: QuickFilter }[] = [
  { label: '$15+/hr', value: '$15+' },
  { label: '$18+/hr', value: '$18+' },
  { label: '$20+/hr', value: '$20+' },
  { label: '$25+/hr', value: '$25+' },
];

const DEFAULT_LISTINGS: JobListing[] = [
  {
    id: '1',
    title: 'Warehouse Associate',
    company: 'FedEx',
    distance: '3.2 mi',
    salaryDisplay: 'structured',
    salaryMin: 19,
    salaryMax: 22,
    jobType: 'Full-time',
    tags: ['Benefits included'],
  },
  {
    id: '2',
    title: 'Delivery Driver',
    company: 'Local Company',
    distance: '5.1 mi',
    salaryDisplay: 'estimated',
    salaryMin: 18,
    salaryMax: 21,
    jobType: 'Full-time',
    tags: [],
  },
  {
    id: '3',
    title: 'Custodian',
    company: 'School District',
    distance: '2.8 mi',
    salaryDisplay: 'none',
    jobType: 'Full-time',
    tags: ['Government'],
  },
];

const TAG_THEMES: Record<string, PillThemeName> = {
  'Benefits included': 'green',
  Government: 'blue',
  'Full-time': 'grey',
};

function formatSalary(listing: JobListing): string {
  if (listing.salaryDisplay === 'none') return 'Pay not listed';
  const prefix = listing.salaryDisplay === 'estimated' ? '~' : '';
  if (listing.salaryMin && listing.salaryMax) {
    return `${prefix}$${listing.salaryMin}–$${listing.salaryMax}/hr${listing.salaryDisplay === 'estimated' ? ' (estimated)' : ''}`;
  }
  if (listing.salaryMin) return `${prefix}$${listing.salaryMin}+/hr`;
  return 'Pay not listed';
}

function JobCard({ listing }: { listing: JobListing }) {
  const salaryText = formatSalary(listing);
  const isPayUnlisted = listing.salaryDisplay === 'none';

  return (
    <Card
      size={CardSize.Medium}
      bordered
      dropShadow
      classNames={styles.jobCard}
    >
      <div className={styles.jobCardContent}>
        <div className={styles.jobCardHeader}>
          <div className={styles.jobCardTitle}>
            <span className={styles.jobTitle}>{listing.title}</span>
            <span className={styles.jobMeta}>
              {listing.company}
              <span className={styles.dot}>·</span>
              {listing.distance}
            </span>
          </div>
          <Button
            text="Apply Now"
            variant={ButtonVariant.Primary}
            size={ButtonSize.Small}
            shape={ButtonShape.Pill}
            classNames={styles.applyButton}
          />
        </div>

        <div className={styles.jobCardBody}>
          <span
            className={`${styles.salaryText} ${isPayUnlisted ? styles.salaryUnlisted : ''}`}
          >
            {salaryText}
          </span>
          <span className={styles.dividerDot}>|</span>
          <span className={styles.jobType}>{listing.jobType}</span>

          {listing.tags?.map((tag) => (
            <Pill
              key={tag}
              label={tag}
              size={PillSize.Small}
              theme={TAG_THEMES[tag] ?? 'grey'}
              classNames={styles.jobTag}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export function SalaryFilter({
  onFilterChange,
  jobListings = DEFAULT_LISTINGS,
  classNames,
}: SalaryFilterProps) {
  const [quickFilter, setQuickFilter] = useState<QuickFilter>(null);
  const [customMin, setCustomMin] = useState<string>('');
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('hour');
  const [includeEstimated, setIncludeEstimated] = useState(false);
  const [includeUnlisted, setIncludeUnlisted] = useState(false);

  function handleQuickFilter(value: QuickFilter) {
    const next = quickFilter === value ? null : value;
    setQuickFilter(next);
    setCustomMin('');
    emit({ quickFilter: next, customMin: '', payPeriod, includeEstimated, includeUnlisted });
  }

  function handleCustomMin(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setCustomMin(val);
    if (val) setQuickFilter(null);
    emit({ quickFilter: val ? null : quickFilter, customMin: val, payPeriod, includeEstimated, includeUnlisted });
  }

  function handlePayPeriod(vals: string[]) {
    const period = (vals[0] as PayPeriod) ?? 'hour';
    setPayPeriod(period);
    emit({ quickFilter, customMin, payPeriod: period, includeEstimated, includeUnlisted });
  }

  function handleIncludeEstimated(e: React.ChangeEvent<HTMLInputElement>) {
    setIncludeEstimated(e.target.checked);
    emit({ quickFilter, customMin, payPeriod, includeEstimated: e.target.checked, includeUnlisted });
  }

  function handleIncludeUnlisted(e: React.ChangeEvent<HTMLInputElement>) {
    setIncludeUnlisted(e.target.checked);
    emit({ quickFilter, customMin, payPeriod, includeEstimated, includeUnlisted: e.target.checked });
  }

  function emit(state: SalaryFilterState) {
    onFilterChange?.(state);
  }

  const isCustomActive = customMin.length > 0;

  return (
    <div className={`${styles.wrapper} ${classNames ?? ''}`}>
      {/* ── Filter Panel ─────────────────────────────────────── */}
      <Card size={CardSize.Medium} bordered dropShadow classNames={styles.filterCard}>
        <div className={styles.filterInner}>

          {/* Header row: Pay label + Any selector */}
          <div className={styles.filterHeader}>
            <Label text="Pay" classNames={styles.payLabel} />
            <Select
              options={[
                { text: 'Any', value: 'any' },
                ...QUICK_FILTERS.map((f) => ({ text: f.label, value: f.value! })),
                { text: 'Custom', value: 'custom' },
              ]}
              defaultValue={['any']}
              size={SelectSize.Small}
              shape={SelectShape.Pill}
              classNames={styles.anySelect}
              onOptionsChange={(vals) => {
                const val = (vals as unknown as string[])[0];
                if (val === 'any') {
                  setQuickFilter(null);
                  setCustomMin('');
                } else if (val !== 'custom') {
                  handleQuickFilter(val as QuickFilter);
                }
              }}
            />
          </div>

          <div className={styles.divider} />

          {/* Quick filter chips */}
          <div className={styles.quickFiltersSection}>
            <span className={styles.sectionLabel}>Quick filters</span>
            <Stack direction="horizontal" flexGap="xs" classNames={styles.quickFiltersRow} wrap>
              {QUICK_FILTERS.map((f) => (
                <Button
                  key={f.value}
                  text={f.label}
                  size={ButtonSize.Small}
                  shape={ButtonShape.Pill}
                  variant={quickFilter === f.value ? ButtonVariant.Primary : ButtonVariant.Default}
                  onClick={() => handleQuickFilter(f.value)}
                  classNames={`${styles.quickFilterBtn} ${quickFilter === f.value ? styles.quickFilterBtnActive : ''}`}
                />
              ))}
            </Stack>
          </div>

          {/* Or set custom */}
          <div className={styles.customSection}>
            <span className={styles.sectionLabel}>Or set custom</span>
            <div className={styles.customRow}>
              <span className={styles.customLabel}>At least</span>
              <div className={styles.customInputWrap}>
                <span className={styles.currencySign}>$</span>
                <TextInput
                  value={customMin}
                  onChange={handleCustomMin}
                  placeholder="0"
                  numbersOnly
                  size={TextInputSize.Small}
                  shape={TextInputShape.Pill}
                  inputWidth={TextInputWidth.fitContent}
                  classNames={styles.customInput}
                />
              </div>
              <span className={styles.perLabel}>per</span>
              <Select
                options={PAY_PERIOD_OPTIONS}
                defaultValue={['hour']}
                size={SelectSize.Small}
                shape={SelectShape.Pill}
                classNames={styles.periodSelect}
                onOptionsChange={(vals) => handlePayPeriod(vals as unknown as string[])}
              />
            </div>
          </div>

          <div className={styles.divider} />

          {/* Checkboxes */}
          <Stack direction="vertical" flexGap="xs" classNames={styles.checkboxGroup}>
            <CheckBox
              label="Include jobs with estimated pay"
              checked={includeEstimated}
              onChange={handleIncludeEstimated}
              classNames={styles.checkbox}
            />
            <CheckBox
              label="Include jobs with no pay listed"
              checked={includeUnlisted}
              onChange={handleIncludeUnlisted}
              classNames={styles.checkbox}
            />
          </Stack>
        </div>
      </Card>

      {/* ── Job Results ──────────────────────────────────────── */}
      <div className={styles.resultsSection}>
        <span className={styles.resultsLabel}>
          {jobListings.length} jobs
          {quickFilter ? ` · ${quickFilter}/hr+` : isCustomActive ? ` · $${customMin}+/${payPeriod}` : ''}
        </span>
        <Stack direction="vertical" flexGap="s" classNames={styles.jobList}>
          {jobListings.map((listing) => (
            <JobCard key={listing.id} listing={listing} />
          ))}
        </Stack>
      </div>
    </div>
  );
}
