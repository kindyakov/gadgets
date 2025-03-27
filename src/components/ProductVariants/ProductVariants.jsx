import { useState, useMemo } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { useFeaturesTranslateStore } from "../../store/useFeaturesTranslateStore";

const ProductVariants = ({ variants = [], features = {}, slug = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { featuresTranslate } = useFeaturesTranslateStore()

  const localVariants = useMemo(() => {
    const result = {};

    variants.forEach(({ attributes }) => {
      Object.entries(attributes).forEach(([key, value]) => {
        result[key] = result[key] || new Set();
        result[key].add(value);
      });
    });

    return Object.entries(result).reduce((acc, [key, values]) => {
      acc[key] = Array.from(values);
      return acc;
    }, {});
  }, [variants]);

  // Инициализируем только ключами, которые есть в localVariants
  const relevantKeys = Object.keys(localVariants);
  const initialAttrs = {};

  relevantKeys.forEach((key) => {
    // Если в features есть такой же ключ, берём его значение
    if (features[key]) {
      initialAttrs[key] = features[key];
    }
  });

  const [selectedAttributes, setSelectedAttributes] = useState(initialAttrs);

  const colors = {
    черный: '#6c6c6c',
    красный: '#fbb',
    золотой: '#f0b90b',
  }

  // Функция проверки доступности комбинации
  const isCombinationExist = (attrs) =>
    variants.some(({ attributes }) =>
      Object.entries(attrs).every(
        ([key, value]) => attributes[key] === value
      )
    );

  // Находит вариант по выбранной комбинации атрибутов
  const findVariantByAttributes = (attrs) =>
    variants.find(({ attributes }) =>
      Object.entries(attrs).every(
        ([key, value]) => attributes[key] === value
      )
    );

  // Обработчик нажатия на вариант
  const handleSelectAttribute = (key, value) => {
    const newAttrs = { ...selectedAttributes, [key]: value };

    // Если комбинация не существует, не обновляем состояние
    if (!isCombinationExist(newAttrs)) return;

    // Обновляем выбранные атрибуты
    setSelectedAttributes(newAttrs);

    // Ищем соответствующий вариант
    const variant = findVariantByAttributes(newAttrs);
    if (variant && variant.slug && variant.slug !== slug) {
      const segments = location.pathname.split("/");
      segments[segments.length - 1] = variant.slug;
      // Перенаправляем на страницу выбранного варианта
      navigate(segments.join("/"));
    }
  };

  const buttons = {
    color: ({ value, isSelected = false, isDisabled = false }) => (
      <button
        key={value}
        disabled={isDisabled}
        onClick={() => handleSelectAttribute("color", value)}
        className={`w-8 h-8 flex-shrink-0 rounded-lg bg-[#fdfdfd] border-[1px] border-solid 
          ${isSelected ? "border-red-light" : "border-[#e5e5e5]"} transition-colors flex items-center justify-center 
          ${isDisabled ? "opacity-30 cursor-not-allowed" : "hover:border-red-light"}`}
      >
        <span
          className={`w-6 h-6 rounded`}
          style={{ backgroundColor: colors[value] || "" }}
        ></span>
      </button>
    ),
    memory: ({ value, isSelected = false, isDisabled = false }) => (
      <button
        key={value}
        disabled={isDisabled}
        onClick={() => handleSelectAttribute("memory", value)}
        className={`font-normal text-[16px] text-[#7e8794] py-1 px-2 rounded-lg transition-colors border-[1px] border-solid ${isSelected ? "border-red-light" : "border-[#eceeef]"} bg-[#fdfdfd] 
        ${isDisabled ? "opacity-30 cursor-not-allowed" : "hover:border-red-light"}`}>
        {value}
      </button>
    ),
  };

  if (!Object.keys(localVariants).length) {
    return ''
  }

  return (
    <div className="flex flex-col gap-2 mt-5">
      {Object.keys(localVariants).map((key) => (
        <div className="flex gap-2 items-center" key={key}>
          <b className="text-xl font-semibold">{featuresTranslate[key] || key}:</b>
          <div className="flex gap-2 flex-wrap">
            {localVariants[key].map((value) => {
              // Проверяем, доступен ли текущий вариант
              const isDisabled = !isCombinationExist({
                ...selectedAttributes,
                [key]: value,
              });

              const isSelected = selectedAttributes[key] === value;
              const opts = { value, isDisabled, isSelected }

              return buttons[key]
                ? buttons[key](opts)
                : buttons.memory(opts)
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductVariants