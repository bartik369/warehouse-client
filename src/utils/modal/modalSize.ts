export function modalSize(type: string) {
  switch (type) {
    case "select_user":
      return {
        modalSize: 500,
      };
    case "review_document":
      return {
        modalSize: 700,
    };
  }
}
