
export const dynamicRouteHandlers = async(path: string, api: ApiContext): Promise<string | null> => {
  const segments = path.split("/");
  const id = segments[segments.length - 1];
  const prefix = segments[segments.length - 2];
  console.log("prefix:", prefix);
  switch (prefix) {
    case "devices":
      return await getDeviceName(id, api);
    default:
        return null
  }

};
