export interface SignatureActions {
    handleSetSignature: (signature: string, role: string) => void;
    handleResetSignature: (role: string) => void;
    handleResetAllSignatures: () => void;
}