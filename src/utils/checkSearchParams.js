export function checkSearchParams(searchParams) {
  return Object.values(searchParams).every(value => value !== undefined);
}
