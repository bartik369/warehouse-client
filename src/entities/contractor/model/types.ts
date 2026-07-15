import { ContractorFormValues } from '@/features/manage-contractor/model/schema';

export type Contractor = ContractorFormValues & {
  id: string;
};
