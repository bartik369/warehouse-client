import { ItemType } from '@/types/issue';
import { BASE_STEPS } from '@/utils/constants/ui/titles';

export const getStepItems = (issueStep: number): ItemType[] => {
  return BASE_STEPS.map((item, index) => {
    const status = index < issueStep ? 'finish' : index === issueStep ? 'process' : 'wait';

    return {
      ...item,
      status,
      disabled: issueStep < index,
    };
  });
};
