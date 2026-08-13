import { useLazyGetDeviceQuery } from '@/store/api/devicesApi';
import { useLazyGetIssueProcessQuery } from '@/store/api/issueApi';
import { handleApiError } from '@/utils/errors/handleApiError';

const UUID_REGEXP = /^[0-9a-fA-F-]{36}$/;

export function useEntityNameResolver() {
  const [getDevice] = useLazyGetDeviceQuery();
  const [getIssueProcess] = useLazyGetIssueProcessQuery();

  const resolverMap: Record<string, (id: string) => Promise<string | null>> = {
    devices: async (id) => {
      try {
        const data = await getDevice(id).unwrap();
        return data.name;
      } catch (err: unknown) {
        handleApiError(err);
        return null;
      }
    },

    issues: async (id) => {
      try {
        const data = await getIssueProcess(id).unwrap();

        return data.documentNo;
      } catch (err: unknown) {
        handleApiError(err);
        return null;
      }
    },
  };

  const resolveEntityName = async (path: string) => {
    const segments = path.split('/').filter(Boolean);

    const idIndex = segments.findIndex((segment) => UUID_REGEXP.test(segment));

    if (idIndex === -1) return null;

    const id = segments[idIndex];
    const prefix = segments[idIndex - 1];

    if (!id || !prefix) return null;

    const resolver = resolverMap[prefix];

    if (!resolver) return null;

    return resolver(id);
  };

  return {
    resolveEntityName,
  };
}
