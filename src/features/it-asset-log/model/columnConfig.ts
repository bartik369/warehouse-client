type FilterType = 'select' | 'input' | 'checkbox' | 'date';

export interface AssetLogEntry {
    documentNumber: string;
    warehouseName: string;
    currentUser: string;
    partnerUser: string;
    createdAt: string;
}
export interface ColumnConfig {
    key: keyof AssetLogEntry;
    label: string;
    filterType?: FilterType,
    options?: string[],
}
export const assetTableColumns: ColumnConfig[] = [
    { key: 'documentNumber', label: 'Номер документа', filterType: 'input' },
    { key: 'warehouseName', label: 'Склад', filterType: 'input' },
    { key: 'currentUser', label: 'Кто создал', filterType: 'input' },
    { key: 'partnerUser', label: 'Кому', filterType: 'input' },
    { key: 'createdAt', label: 'Дата создания', filterType: 'input' },
]