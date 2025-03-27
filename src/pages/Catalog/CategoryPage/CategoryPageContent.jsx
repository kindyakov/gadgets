import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "../../../store/useFilterStore";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSyncFiltersWithURL } from '../../../hooks/useSyncFiltersWithURL';
import CategoryTags from '../../../components/CategoryTags/CategoryTags';
import AsideFilters from "../../../layout/AsideFilters/AsideFilters";
import ProductCardRow from "../../../components/ProductCardRow/ProductCardRow";
import Loader from '../../../components/Loader/Loader';
import services from "../../../settings/services";

const CategoryPageContent = ({ slug }) => {
  const { selectedFilters, availableFilters, setAvailableFilters, resetFilters } = useFilterStore();
  const debouncedFilters = useDebounce(selectedFilters, 1000);
  const queryKey = useMemo(() => [slug, JSON.stringify(debouncedFilters)], [slug, debouncedFilters]);

  useEffect(() => {
    resetFilters();
  }, [slug, resetFilters]);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey,
    queryFn: () => services.getFilteredProducts(slug, debouncedFilters),
  });

  useEffect(() => {
    if (data && data.status === 'success') {
      setAvailableFilters(data.filters)
    }
  }, [data])

  return (
    <>
      <CategoryTags tags={availableFilters.tags} />
      <div className="flex flex-row gap-5">
        {isSuccess && <AsideFilters filters={availableFilters} />}
        <div className="flex flex-col gap-5 min-h-[500px] relative" style={{ flex: '1 1 75%' }}>
          <div className={`absolute w-full h-full inset-0 flex items-center justify-center bg-[#6d6d6d49] transition-colors ${isLoading ? '' : 'opacity-0 invisible'}`}>
            <Loader width={80} height={80} color="#EB4848" borderWidth="8px" />
          </div>

          <div className="w-full flex flex-col gap-5">
            {data?.products?.length
              ? data.products.map(product => <ProductCardRow key={product.id} product={product} />)
              : ''}
          </div>

          <div className="">Пагинация</div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CategoryPageContent);
