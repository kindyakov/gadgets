import { useFilterStore } from "../../store/useFilterStore"

const CategoryTags = ({ tags }) => {
  const { toggleTag, selectedFilters } = useFilterStore()
  return (
    <div className="flex gap-2 flex-wrap">
      {tags?.length > 0
        ? tags.map((tag, i) => (
          <button
            key={tag + i}
            className={`px-3 py-1 rounded-2xl border border-solid border-[#dfe4ea] text-primary-gray font-medium text-sm flex items-center gap-1 transition-colors hover:text-red-light
              ${selectedFilters.tags?.includes(tag) ? 'text-red-light border-[#ff4d4d]' : ''}`}
            onClick={e => {
              e.target.classList.add('text-red-light', 'border-[#ff4d4d]')
              toggleTag(tag)
            }}
          >
            {tag}
          </button>
        ))
        : null}
    </div>
  )
}

export default CategoryTags