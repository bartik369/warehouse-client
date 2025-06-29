import { useLazyGetDeviceQuery } from "@/store/api/devicesApi";
import { handleApiError } from "@/utils/errors/handleApiError";

export function useEntityNameResolver() {
  const [getDevice] = useLazyGetDeviceQuery();

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
  };

  const resolveEntityName = async (path: string) => {
    const segments = path.split('/');
    const id = segments.at(-1);
    const prefix = segments.at(-2);

    if (!id || !prefix) return null;
    const resolvedName = resolverMap[prefix];
    if (!resolvedName) return null;
    return await resolvedName(id);
  }
  return { resolveEntityName }
}
