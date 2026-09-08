import { FaRegCommentDots } from 'react-icons/fa6';

import { RhfTextField } from '@/shared/ui/form-fields/RhfTextField';
import { FormSection } from '@/shared/ui/form-section/FormSection';

export const DeviceAdditionalSection = () => {
  return (
    <FormSection title="Допольнительно" icon={<FaRegCommentDots />}>
      <RhfTextField name="comment" label="Описание" />
    </FormSection>
  );
};
