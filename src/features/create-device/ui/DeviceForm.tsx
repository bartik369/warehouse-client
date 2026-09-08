import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { deviceSchema } from '../model/schema';
import { DeviceFormContent } from './DeviceFormContent';

export const DeviceForm = () => {
  const form = useForm({
    resolver: zodResolver(deviceSchema),
  });

  return (
    <FormProvider {...form}>
      <DeviceFormContent />
    </FormProvider>
  );
};
