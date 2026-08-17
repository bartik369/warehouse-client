import { useCallback } from 'react';

import { useLazyGetDeviceQuery } from '@/store/api/devicesApi';
import { useLazyGetIssueProcessQuery } from '@/store/api/issueApi';
import { handleApiError } from '@/utils/errors/handleApiError';

const UUID_REGEXP = /^[0-9a-fA-F-]{36}$/;

export function useEntityNameResolver() {
  const [getDevice] = useLazyGetDeviceQuery();
  const [getIssueProcess] = useLazyGetIssueProcessQuery();

  const resolveEntityName = useCallback(
    async (path: string): Promise<string | null> => {
      const segments = path.split('/').filter(Boolean);

      const idIndex = segments.findIndex((segment) => UUID_REGEXP.test(segment));

      if (idIndex === -1) return null;

      const id = segments[idIndex];
      const prefix = segments[idIndex - 1];

      if (!id || !prefix) return null;

      try {
        switch (prefix) {
          case 'devices': {
            const data = await getDevice(id).unwrap();
            return data.name;
          }

          case 'issues': {
            const data = await getIssueProcess(id).unwrap();
            return data.documentNo;
          }

          default:
            return null;
        }
      } catch (err: unknown) {
        handleApiError(err);
        return null;
      }
    },
    [getDevice, getIssueProcess]
  );

  return {
    resolveEntityName,
  };
}
