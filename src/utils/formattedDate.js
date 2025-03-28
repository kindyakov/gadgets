import dayjs from 'dayjs';
import 'dayjs/locale/ru';

/**
 * Форматирует дату с возможностью выбора формата.
 * @param {string|Date} date - Дата в ISO или Date.
 * @param {string} formatStr - Формат (по умолчанию "D MMMM YYYY г.").
 * @returns {string} Отформатированная дата.
 */

export const formatDate = (date, formatStr = 'D MMMM YYYY г.') => {
  dayjs.locale('ru');
  return dayjs(date).format(formatStr);
};