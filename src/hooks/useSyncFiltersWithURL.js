import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useFilterStore } from '../store/useFilterStore';

export const useSyncFiltersWithURL = (debouncedFilters) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedFilters } = useFilterStore();

  // 1. При изменении URL считываем параметры и обновляем selectedFilters
  useEffect(() => {
    const parsed = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (Object.keys(parsed).length > 0) {
      // Приводим числовые значения к числам, если нужно
      if (parsed.price) {
        if (parsed.price.min) parsed.price.min = Number(parsed.price.min);
        if (parsed.price.max) parsed.price.max = Number(parsed.price.max);
      }

      if (JSON.stringify(parsed) !== JSON.stringify(debouncedFilters)) {
        // Обновляем Store только если данные отличаются
        // setSelectedFilters((prev) => ({ ...prev, ...parsed }))
      }
    }
  }, [location.search]);


  // 2. При изменении debouncedFilters обновляем URL, если он отличается
  useEffect(() => {
    const queryString = qs.stringify(debouncedFilters, { addQueryPrefix: true });
    if (queryString !== location.search) {
      navigate(location.pathname + queryString, { replace: true });
    }
  }, [debouncedFilters]);
};
