export function convertToObject(leanDocument: any) {
  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key];
    if (value?.toJSON && value?.toString) {
      leanDocument[key] = value.toString();
    }
  }
  return leanDocument;
}
