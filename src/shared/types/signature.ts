import { SignatureRole } from '@/shared/ui/signature-canvas/model/types';

export interface SignatureActions {
  handleSetSignature: (signature: string, role: SignatureRole) => void;
  handleResetSignature: (role: SignatureRole) => void;
  handleResetAllSignatures: () => void;
}
