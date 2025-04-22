import { IEntity } from "./devices";

export interface IEntityFormActions {
      handleInputChange: (name: keyof IEntity, e: string) => void;
      handleCreateEntity: (type: string) => void;
      handleResetEntity: () => void;
      handleMedia?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      handleGetEntity: (id: string, field: string) => void;
      handleDeleteEntity: (id: string, field: string) => void;
}