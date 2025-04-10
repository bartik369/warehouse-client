import { toast } from 'react-toastify';
import { isFetchBaseQueryError, isErrorWithMessage } from './error-handling';

export const handleApiError = (err: unknown): void => {
 if (isFetchBaseQueryError(err)) {
        let errMsg: string;
        if ('error' in err) {
          errMsg = err.error;
        } else {
          if (
            err.data &&
            typeof err.data === 'object' &&
            'message' in err.data
          ) {
            errMsg = (err.data as { message: string }).message;
          } else {
            errMsg = JSON.stringify(err.data);
          }
        }
        toast(errMsg, { type: 'error' });
      } else if (isErrorWithMessage(err)) {
        console.error('Unexpected Error:', err.message);
      } else {
        console.error('Unknown Error:', err);
      }
}