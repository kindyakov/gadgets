import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { YandexMapContext } from '../contexts/YandexMapContext';

export const YandexMapProvider = ({ children }) => {
  const [mapModules, setMapModules] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const [ymaps3React] = await Promise.all([
          ymaps3.import('@yandex/ymaps3-reactify'),
          ymaps3.ready,
        ]);
        const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
        const modules = reactify.module(ymaps3);
        setMapModules(modules);
      } catch (error) {
        console.error('Ошибка инициализации YandexMap:', error);
      }
    };

    init();
  }, []);

  return (
    <YandexMapContext.Provider value={mapModules}>
      {children}
    </YandexMapContext.Provider>
  );
};