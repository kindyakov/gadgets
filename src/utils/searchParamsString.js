function flattenParams(obj, prefix = '') {
  let pairs = [];
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const value = obj[key];
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      pairs = pairs.concat(flattenParams(value, fullKey));
    } else {
      pairs.push({ key: fullKey, value });
    }
  }
  return pairs;
}

export function searchParamsString(params) {
  const flatParams = flattenParams(params);
  const queryString = flatParams.map(pair => {
    // Кодируем ключ и возвращаем квадратные скобки в читаемом виде
    const encodedKey = encodeURIComponent(pair.key).replace(/%5B/g, '[').replace(/%5D/g, ']');
    const encodedValue = encodeURIComponent(pair.value);
    return `${encodedKey}=${encodedValue}`;
  }).join('&');
  return queryString ? `?${queryString}` : '';
}