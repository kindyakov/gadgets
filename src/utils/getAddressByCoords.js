import axios from 'axios';

export const getAddressByCoords = async (coords) => {
  try {
    const [lat, lon] = coords;
    const response = await axios.get('https://geocode-maps.yandex.ru/v1/', {
      params: {
        geocode: `${lon},${lat}`,
        format: 'json',
        apikey: '1da2559e-0f82-411d-8aec-3d542b2d01f7',
      },
    });

    const featureMember = response
      .data
      .response
      .GeoObjectCollection
      .featureMember;

    if (!featureMember || featureMember.length === 0) {
      // Если вообще не нашлось ни одного геообъекта — возвращаем объект с пустыми полями
      return {
        city: '',
        street: '',
        house: '',
        entrance: '',
        floor: '',
        apartment: ''
      };
    }

    // Берём самый первый объект
    const geoObject = featureMember[0].GeoObject;
    // Компоненты адреса, в которых могут быть нужные нам поля
    const components = geoObject
      .metaDataProperty
      .GeocoderMetaData
      .Address
      .Components;

    // Инициализируем результаты пустыми строками
    let city = '';
    let street = '';
    let house = '';

    // Проходим по массиву Components и определяем нужные значения
    components.forEach((component) => {
      switch (component.kind) {
        case 'locality':
          // Город
          city = component.name;
          break;
        case 'street':
          // Улица
          street = component.name;
          break;
        case 'house':
          // Номер дома
          house = component.name;
          break;
        // другие kind (area, province, country и т.п.) нам здесь не нужны
      }
    });

    // Возвращаем объект с требуемыми полями.
    // Поля entrance, floor, apartment остаются пустыми, 
    // поскольку Яндекс.Геокодер их не возвращает.
    return {
      city,
      street,
      house,
      entrance: '',
      floor: '',
      apartment: ''
    };
  } catch (error) {
    console.error('Ошибка при получении адреса:', error);
    return {
      city: '',
      street: '',
      house: '',
      entrance: '',
      floor: '',
      apartment: ''
    };
  }
};
