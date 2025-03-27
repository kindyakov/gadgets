/**
 * Форматирует число в соответствии с переданными настройками.
 *
 * @param {number} value - Число для форматирования.
 * @param {object} options - Объект с настройками форматирования.
 * @param {string} options.locale - Локаль форматирования (по умолчанию 'ru-RU').
 * @param {object} options.style - Стиль форматирования (по умолчанию { style: 'currency', currency: 'RUB' }).
 * @returns {string} Форматированное число.
 */
export function formatCurrency(value, options = {}) {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  const locale = options.locale || 'ru-RU';
  const style = options.style || { style: 'currency', currency: 'RUB' };

  // Проверяем, является ли значение целым числом
  if (Number.isInteger(value)) {
    // Если да, то форматируем его как целое число
    return new Intl.NumberFormat(locale, { style: 'decimal' }).format(value) + ' ₽';
  } else {
    // Если нет, то форматируем его как число с десятичной запятой
    return new Intl.NumberFormat(locale, style).format(value);
  }
}