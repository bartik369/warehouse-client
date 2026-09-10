export type ApiError = {
  status: number;
  data: {
    message: string;
    error: string;
    statusCode: number;
  };
};
