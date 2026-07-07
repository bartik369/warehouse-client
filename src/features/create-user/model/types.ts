import { ReactNode } from 'react';

import { ColProps } from 'antd';
import type { FieldValues, Path } from 'react-hook-form';

export type FormFieldConfig<T extends FieldValues> =
  | {
      type: 'input';
      name: Path<T>;
      label: string;
      prefix?: ReactNode;
      col?: ColProps;
    }
  | {
      type: 'select';
      name: Path<T>;
      label: string;
      itemsKey: 'departments' | 'locations';
      col?: ColProps;
    }
  | {
      type: 'switch';
      name: Path<T>;
      label: string;
      checkedChildren?: ReactNode;
      unCheckedChildren?: ReactNode;
      col?: ColProps;
    };
