import CatalogFilterPanel from '../../components/CatalogFilterPanel/CatalogFilterPanel';
import PriceRange from '../../components/PriceRange/PriceRange';
import { useFilterStore } from '../../store/useFilterStore';
import { useFeaturesTranslateStore } from '../../store/useFeaturesTranslateStore';

const AsideFilters = ({ filters }) => {
  const { price, colors = [], features = {} } = filters;
  const { selectedFilters, setSelectedColors, setSelectedFeatures, setSelectedPrice } = useFilterStore()
  const { featuresTranslate } = useFeaturesTranslateStore()

  return (
    <aside className="flex flex-col w-3/12 gap-5">
      {Object.keys(price).length &&
        <PriceRange price={price} selectedPrice={selectedFilters.price} onChangePrice={([min, max]) => setSelectedPrice(min, max)} />
      }

      {Object.keys(features).map((feature) => (
        <CatalogFilterPanel key={features[feature]}
          title={featuresTranslate[feature] || feature}
          name={feature}
          items={features[feature]}
          selectedValues={selectedFilters.features?.[feature] || []}
          // isOpen={false}
          onSelected={({ values }) => {
            setSelectedFeatures(feature, values)
          }}
        />
      ))}
    </aside>
  )
}

export default AsideFilters