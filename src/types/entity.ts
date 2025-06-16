import { Entity } from "./devices";

export interface EntityFormActions {
      handleInputChange: (name: keyof Entity, e: string) => void;
      handleCreateEntity: (type: string) => void;
      handleResetEntity: () => void;
      handleMedia?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      handleGetEntity?: (id: string, field: string) => void;
      handleDeleteEntity?: (id: string, field: string) => void;
}