import React, { useEffect } from 'react';
import { changeMeta } from "../../../utils/changeMeta";
import { useCategories } from "../../../hooks/useCategories";
import { useSubCategories } from "../../../hooks/useSubCategories";
import { Link } from "react-router-dom";

const CategoryPageHeader = ({ categorySlug, subCategorySlug }) => {
  const { data: category } = useCategories({ slug: categorySlug }, { select: data => data ? data[0] : {} });
  const { data: subCategory } = useSubCategories({ slug: subCategorySlug }, { enable: !!subCategorySlug, select: data => data ? data[0] : {} });

  useEffect(() => {
    if (category) {
      changeMeta({
        title: category.meta_title,
        description: category.meta_description,
      });
    }
  }, [category]);

  return (
    <div className="flex items-center justify-between gap-3">
      <h1 className="text-[#26314] font-bold text-5xl">
        {category?.title || 'Категория'} {subCategory?.title || ''}
      </h1>
      <div className="flex items-center gap-3 rounded-lg p-4 bg-[#f6f7fa]">
        <p className="text-[#263141] font-medium text-base">Все что нужно знать при выборе</p>
        <Link className="text-red-light font-medium text-base">
          <span>{category?.title}</span>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(CategoryPageHeader);
