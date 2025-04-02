import { useUserStore } from '../../../store/useUserStore'
import ProductCardRow from '../../../components/ProductCardRow/ProductCardRow'

const Favorite = () => {
  const { favorites } = useUserStore()

  return (
    <div className="flex flex-col gap-3 p-3">
      {favorites.length ? (
        favorites.map((product, index) => (
          <ProductCardRow key={index} product={product} />
        ))
      ) : (
        <p>No favorite products yet</p>
      )}
    </div>
  )
}

export default Favorite