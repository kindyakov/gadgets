import { createContext, useContext } from 'react';

export const YandexMapContext = createContext(null);

export const useYandexMap = () => useContext(YandexMapContext);
