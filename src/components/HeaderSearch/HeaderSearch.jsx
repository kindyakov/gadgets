import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import ProductCard from '../ProductCard/ProductCard'
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import OftenSearch from '../OftenSearch/OftenSearch';

const products = [
  {
    "id": 28,
    "subCategoryId": 8,
    "article": 842123,
    "title": "HP Pavilion 15",
    "slug": "hp-pavilion-15",
    "subCategorySlug": "hp",
    "categorySlug": "laptops",
    "brandId": 10,
    "price": 59999,
    "oldPrice": 64999,
    "discount": 8,
    "inStock": true,
    "rating": 4.6,
    "reviewCount": 210,
    "description": "HP Pavilion 15 с дисплеем 15,6 дюйма, процессором Intel Core i5 и оперативной памятью 8 ГБ для повседневной работы.",
    "fullDescription": "HP Pavilion 15 - это доступный ноутбук с дисплеем 15,6 дюйма и разрешением Full HD. Процессор Intel Core i5 обеспечивает высокую производительность при выполнении офисных задач, таких как работа с документами и браузером. Оперативная память объемом 8 ГБ поддерживает многозадачность, а SSD-накопитель емкостью 512 ГБ позволяет быстро загружать приложения и файлы. Батарея емкостью 41 Wh обеспечивает до 8 часов автономной работы.",
    "features": {
      "display": "15,6 дюйма, IPS, Full HD",
      "processor": "Intel Core i5",
      "ram": "8 ГБ DDR4",
      "storage": "512 ГБ SSD",
      "battery": "41 Wh",
      "os": "Windows 11 Home"
    },
    "specifications": [
      {
        "name": "Дисплей",
        "value": "15,6 дюйма, IPS, Full HD"
      },
      {
        "name": "Разрешение",
        "value": "1920x1080 пикселей"
      },
      {
        "name": "Процессор",
        "value": "Intel Core i5"
      },
      {
        "name": "Оперативная память",
        "value": "8 ГБ DDR4"
      },
      {
        "name": "SSD-накопитель",
        "value": "512 ГБ"
      },
      {
        "name": "Аккумулятор",
        "value": "41 Wh"
      },
      {
        "name": "Операционная система",
        "value": "Windows 11 Home"
      }
    ],
    "tags": [
      "HP",
      "ноутбук",
      "Intel",
      "Windows",
      "Full HD"
    ],
    "colors": [
      "черный",
      "серый",
      "металлик"
    ],
    "variants": [],
    "images": [
      "/images/products/hp-pavilion-15-1.jpg",
      "/images/products/hp-pavilion-15-2.jpg",
      "/images/products/hp-pavilion-15-3.jpg",
      "/images/products/hp-pavilion-15-4.jpg"
    ],
    "isNew": false,
    "isBestseller": false,
    "createdAt": "2023-04-15T12:00:00Z",
    "updatedAt": "2024-02-25T12:45:00Z",
    "status": {
      "type": "available",
      "name": "В наличии"
    },
    "expertAssessment": 3.9,
    "path": "/laptops/hp/hp-pavilion-15"
  },
  {
    "id": 29,
    "subCategoryId": 8,
    "article": 854378,
    "title": "HP Envy 15",
    "slug": "hp-envy-15",
    "subCategorySlug": "hp",
    "categorySlug": "laptops",
    "brandId": 10,
    "price": 89999,
    "oldPrice": 94999,
    "discount": 5,
    "inStock": true,
    "rating": 4.7,
    "reviewCount": 287,
    "description": "HP Envy 15 с дисплеем 15,6 дюйма, процессором Intel Core i7 и оперативной памятью 16 ГБ для требовательных задач.",
    "fullDescription": "HP Envy 15 - это премиальный ноутбук с дисплеем 15,6 дюйма и разрешением Full HD. Процессор Intel Core i7 обеспечивает высокую производительность при работе с требовательными приложениями и играми. Оперативная память объемом 16 ГБ позволяет эффективно выполнять несколько задач одновременно. SSD-накопитель емкостью 1 ТБ обеспечивает быстрый доступ к файлам и приложениям. Батарея емкостью 51 Wh позволяет работать до 10 часов автономно.",
    "features": {
      "display": "15,6 дюйма, IPS, Full HD",
      "processor": "Intel Core i7",
      "ram": "16 ГБ DDR4",
      "storage": "1 ТБ SSD",
      "battery": "51 Wh",
      "os": "Windows 11 Pro"
    },
    "specifications": [
      {
        "name": "Дисплей",
        "value": "15,6 дюйма, IPS, Full HD"
      },
      {
        "name": "Разрешение",
        "value": "1920x1080 пикселей"
      },
      {
        "name": "Процессор",
        "value": "Intel Core i7"
      },
      {
        "name": "Оперативная память",
        "value": "16 ГБ DDR4"
      },
      {
        "name": "SSD-накопитель",
        "value": "1 ТБ"
      },
      {
        "name": "Аккумулятор",
        "value": "51 Wh"
      },
      {
        "name": "Операционная система",
        "value": "Windows 11 Pro"
      }
    ],
    "tags": [
      "HP",
      "ноутбук",
      "Intel",
      "Windows",
      "Full HD",
      "престижный"
    ],
    "colors": [
      "черный",
      "серый",
      "металлик"
    ],
    "variants": [],
    "images": [
      "/images/products/hp-envy-15-1.jpg",
      "/images/products/hp-envy-15-2.jpg",
      "/images/products/hp-envy-15-3.jpg",
      "/images/products/hp-envy-15-4.jpg"
    ],
    "isNew": true,
    "isBestseller": false,
    "createdAt": "2023-06-10T12:00:00Z",
    "updatedAt": "2024-03-01T15:30:00Z",
    "status": {
      "type": "available",
      "name": "В наличии"
    },
    "expertAssessment": 3.9,
    "path": "/laptops/hp/hp-envy-15"
  },
  {
    "id": 30,
    "subCategoryId": 8,
    "article": 761519,
    "title": "HP EliteBook 840 G11",
    "slug": "hp-elitebook-840-g11",
    "subCategorySlug": "hp",
    "categorySlug": "laptops",
    "brandId": 10,
    "price": 99999,
    "oldPrice": 109999,
    "discount": 9,
    "inStock": true,
    "rating": 4.8,
    "reviewCount": 189,
    "description": "HP EliteBook 840 G11 с дисплеем 14 дюймов, процессором Intel Core i7 и оперативной памятью 32 ГБ для бизнес-пользователей.",
    "fullDescription": "HP EliteBook 840 G11 - это бизнес-класс ноутбук с дисплеем 14 дюймов и разрешением Full HD. Процессор Intel Core i7 обеспечивает высокую производительность при выполнении офисных задач. Оперативная память объемом 32 ГБ поддерживает многозадачность и позволяет эффективно работать с требовательными приложениями. SSD-накопитель емкостью 1 ТБ обеспечивает быстрый доступ к файлам и приложениям. Материнская плата Intel vPro Platform делает его надежным решением для корпоративных пользователей.",
    "features": {
      "display": "14 дюйма, IPS, Full HD",
      "processor": "Intel Core i7",
      "ram": "32 ГБ DDR4",
      "storage": "1 ТБ SSD",
      "battery": "47 Wh",
      "os": "Windows 11 Pro",
      "vpro": "Intel vPro"
    },
    "specifications": [
      {
        "name": "Дисплей",
        "value": "14 дюйма, IPS, Full HD"
      },
      {
        "name": "Разрешение",
        "value": "1920x1080 пикселей"
      },
      {
        "name": "Процессор",
        "value": "Intel Core i7"
      },
      {
        "name": "Оперативная память",
        "value": "32 ГБ DDR4"
      },
      {
        "name": "SSD-накопитель",
        "value": "1 ТБ"
      },
      {
        "name": "Аккумулятор",
        "value": "47 Wh"
      },
      {
        "name": "Операционная система",
        "value": "Windows 11 Pro"
      }
    ],
    "tags": [
      "HP",
      "ноутбук",
      "Intel",
      "Windows",
      "Full HD",
      "бизнес"
    ],
    "colors": [
      "черный",
      "серый",
      "металлик"
    ],
    "variants": [],
    "images": [
      "/images/products/hp-elitebook-840-g11-1.jpg",
      "/images/products/hp-elitebook-840-g11-2.jpg",
      "/images/products/hp-elitebook-840-g11-3.jpg",
      "/images/products/hp-elitebook-840-g11-4.jpg"
    ],
    "isNew": true,
    "isBestseller": true,
    "createdAt": "2023-08-15T12:00:00Z",
    "updatedAt": "2024-03-05T16:30:00Z",
    "status": {
      "type": "available",
      "name": "В наличии"
    },
    "expertAssessment": 4.2,
    "path": "/laptops/hp/hp-elitebook-840-g11"
  }
]

const HeaderSearch = ({ isSearchOpen, headerHeight }) => {
  return (
    <div
      className={`header__search absolute z-10 left-0 right-0 w-ful bg-[#fdfdfd] ${isSearchOpen ? '_open' : ''}`}
      style={{ top: `${headerHeight + 1}px` }}
    >
      <div className="header__search_body container bg-white flex flex-col gap-5 py-5">
        <Swiper
          className="w-full"
          modules={[Navigation]}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={5}
        >
          {products.length ? products.map(product => (
            <SwiperSlide className="my-auto flex items-center justify-center p-2" key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          )) : ''}

        </Swiper>
        <div className="flex gap-5">
          <div className="w-2/5">
            <h4 className='text-xl font-semibold text-[#263141]'>Обзоры</h4>
            <div className="flex flex-col gap-3 mt-3">
              <ArticleHeader />
            </div>
          </div>

          <div className="w-1/3">
            <h4 className='text-xl font-semibold text-[#263141]'>Часто ищут</h4>
            <OftenSearch />
          </div>

        </div>
      </div>
    </div>
  )
}

export default HeaderSearch