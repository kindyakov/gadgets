import CategoryPageHeader from "./CategoryPageHeader";
import CategoryPageContent from "./CategoryPageContent";

const CategoryPage = ({ slug, segments }) => {
  const [categorySlug, subCategorySlug] = segments || []

  return (
    <section className="py-6 flex flex-col gap-8">
      <CategoryPageHeader categorySlug={categorySlug} subCategorySlug={subCategorySlug} />
      <CategoryPageContent slug={slug} />
    </section>
  )
}

export default CategoryPage