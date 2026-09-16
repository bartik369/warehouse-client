export type QueryParams = {
  page: number;
  limit: number;
  manufacturerIds: string[] | null;
  typeIds: string[] | null;
  search: string;
};
