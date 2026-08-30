import { Slider } from 'antd';

import styles from './ValueRange.module.scss';

interface ValueRangeProps {
  min?: number;
  max?: number;
  value: [number, number];
  label?: string;
  unit?: string;
  width?: string | number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: [number, number]) => void;
}

export const ValueRange = ({
  min = 0,
  max = 100,
  value,
  onChange,
  label,
  unit = '',
  width = '100%',
  step = 1,
  disabled = false,
}: ValueRangeProps) => {
  const [from, to] = value ?? [min, max];

  const handleSliderChange = (nextValue: number[]) => {
    onChange?.(nextValue as [number, number]);
  };

  const handleFromChange = (rawValue: string) => {
    if (rawValue === '') {
      return;
    }

    const nextValue = Number(rawValue);

    if (Number.isNaN(nextValue)) {
      return;
    }

    const normalizedValue = Math.min(Math.max(nextValue, min), to);

    onChange?.([normalizedValue, to]);
  };

  const handleToChange = (rawValue: string) => {
    if (rawValue === '') {
      return;
    }

    const nextValue = Number(rawValue);

    if (Number.isNaN(nextValue)) {
      return;
    }

    const normalizedValue = Math.max(Math.min(nextValue, max), from);

    onChange?.([from, normalizedValue]);
  };

  return (
    <div className={styles.wrapper} style={{ width }}>
      {label && (
        <div className={styles.label}>
          {label}
          {unit && ` (${unit})`}
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.sliderWrapper}>
          <Slider
            range
            min={min}
            max={max}
            step={step}
            value={[from, to]}
            disabled={disabled}
            onChange={handleSliderChange}
            tooltip={{
              open: false,
            }}
          />
        </div>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>от</span>
            <input
              className={styles.input}
              type="number"
              min={min}
              max={to}
              step={step}
              value={from}
              disabled={disabled}
              onChange={(event) => handleFromChange(event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>до</span>

            <input
              className={styles.input}
              type="number"
              min={from}
              max={max}
              step={step}
              value={to}
              disabled={disabled}
              onChange={(event) => handleToChange(event.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
