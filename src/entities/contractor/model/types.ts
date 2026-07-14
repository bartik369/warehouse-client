import { ContractorFormValues } from '@/features/manage-contractors/model/schema';

export type Contractor = ContractorFormValues & {
  id: string;
};
