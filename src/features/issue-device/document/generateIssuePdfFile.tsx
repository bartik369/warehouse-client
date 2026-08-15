import { pdf } from '@react-pdf/renderer';

import { IssueDocument, IssueDocumentProps } from './IssueDocument';

export const generateIssuePdfFile = async (props: IssueDocumentProps): Promise<File> => {
  const document = <IssueDocument {...props} />;

  const instance = pdf();

  await instance.updateContainer(document);

  const blob = await instance.toBlob();

  return new File([blob], `${props.docNumber}.pdf`, {
    type: 'application/pdf',
  });
};
