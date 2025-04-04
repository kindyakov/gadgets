import { Link } from 'react-router-dom'
import { useUserStore } from '../../../store/useUserStore'
import ProductCard from '../../../components/ProductCard/ProductCard'

const Favorite = () => {
  const { favorites } = useUserStore()

  return (
    <div className="grid grid-cols-4 gap-3 p-3 relative h-full">
      {favorites.length ? (
        favorites.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))
      ) : (
        <div className='flex items-center justify-center p-3 text-center absolute w-full h-full inset-0'>
          <div>
            <h4 className='text-xl font-semibold'>Нет избранных товаров</h4>
            <Link to='/catalog' className='text-red-light font-semibold hover:underline'>Перейти в каталог</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Favorite