export function modalSize(type: string) {
  switch (type) {
    case "select_user":
      return {
        modalSize: 500,
      };
    case "select_devices":
      return {
        modalSize: 700,
    };
  }
}
