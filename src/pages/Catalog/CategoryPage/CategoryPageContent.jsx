import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "../../../store/useFilterStore";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSyncFiltersWithURL } from '../../../hooks/useSyncFiltersWithURL';
import ReactPaginate from 'react-paginate';
import CategoryTags from '../../../components/CategoryTags/CategoryTags';
import AsideFilters from "../../../layout/AsideFilters/AsideFilters";
import ProductCardRow from "../../../components/ProductCardRow/ProductCardRow";
import Loader from '../../../components/Loader/Loader';
import services from "../../../settings/services";

const CategoryPageContent = ({ slug }) => {
  const { selectedFilters, availableFilters, setAvailableFilters, resetFilters } = useFilterStore();
  const debouncedFilters = useDebounce(selectedFilters, 1000);
  const [_page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
    resetFilters();
  }, [slug, resetFilters]);

  useEffect(() => {
    setPage(1)
  }, [selectedFilters])

  const queryKey = useMemo(
    () => [slug, JSON.stringify(debouncedFilters), _page],
    [slug, debouncedFilters, _page]
  );

  const { data, isLoading, isSuccess } = useQuery({
    queryKey,
    queryFn: () => services.getFilteredProducts(slug, { ...debouncedFilters, _page }),
  });

  useEffect(() => {
    if (data?.filters && Object.keys(data.filters)) {
      setAvailableFilters(data.filters)
    }
  }, [data])

  return (
    <>
      <div className={`fixed w-full h-full inset-0 flex items-center justify-center bg-[#6d6d6d49] transition-opacity ${isLoading ? '' : 'opacity-0 invisible'}`}>
        <Loader width={80} height={80} color="#EB4848" borderWidth="8px" />
      </div>
      <CategoryTags tags={availableFilters.tags} />
      <div className="flex flex-row gap-5">
        <AsideFilters filters={availableFilters} />
        <div className="flex flex-col gap-5 min-h-[500px]" style={{ flex: '1 1 75%' }}>
          <div className="w-full flex flex-col gap-5">
            {data?.products?.length > 0
              ? data.products.map(product => <ProductCardRow key={product.id} product={product} />)
              : ''}
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel="Вперед"
            onPageChange={({ selected }) => setPage(selected + 1)}
            pageRangeDisplayed={3}
            pageCount={data?.meta?.totalPages}
            previousLabel="Назад"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(CategoryPageContent);
