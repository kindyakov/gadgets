export function checkSearchParams(searchParams) {
  const values = Object.values(searchParams)
  if (!values.length) {
    return false
  }
  return Object.values(searchParams).every(value => value !== undefined);
}
