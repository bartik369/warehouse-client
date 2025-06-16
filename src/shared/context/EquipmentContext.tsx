import React, { ReactNode } from "react";
import { IssueProvider } from "../../features/issue/context/IssueContext";
import { TransferProvider } from "../../features/transfer/context/TransferContext";
import { AcceptProvider } from "../../features/accept/context/AcceptContext";

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
return (
<IssueProvider>
    <AcceptProvider>
        <TransferProvider>
            {children}
        </TransferProvider>
    </AcceptProvider>
</IssueProvider>
)
}