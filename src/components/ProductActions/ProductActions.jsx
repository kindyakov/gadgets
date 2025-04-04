import { FavoriteSvg } from '../../ui/svg/FavoriteSvg';
import { ComparisonSvg } from '../../ui/svg/ComparisonSvg';
import { useAddInFavorites } from '../../hooks/useAddInFavorites';
import { useUserStore } from '../../store/useUserStore';
import Loader from '../Loader/Loader';

const ProductActions = ({ product = {} }) => {
  const { checkProductInFavorites } = useUserStore()
  const { mutate: mutateFavorite, isPending: isPendingFavorite } = useAddInFavorites();

  return (
    <div className="flex gap-3">
      <button className={`w-11 h-11 rounded-full border-[#ebf0f7] border-[1px] border-solid flex items-center justify-center group flex-shrink-0 hover:border-red-light transition-colors relative 
      ${isPendingFavorite ? 'border-red-light' :
          checkProductInFavorites(product.id) ? 'bg-red-light text-white' : 'hover:text-red-light'}`}
        onClick={() => mutateFavorite(product)}
        disabled={isPendingFavorite}
      >
        <FavoriteSvg className={`w-5 h-5 ${isPendingFavorite ? 'opacity-0' : ''}`} />
        <Loader width={25} height={25} color='#FF4D4D'
          borderWidth={3}
          className={`${isPendingFavorite ? '' : 'opacity-0'}`}
        />
      </button>
      <button className="w-11 h-11 rounded-full border-[#ebf0f7] border-[1px] border-solid flex items-center justify-center group flex-shrink-0 hover:border-red-light hover:text-red-light transition-colors relative">
        <ComparisonSvg className="w-5 h-5 stroke" />
        {/* <Loader width={25} height={25} color='#FF4D4D' borderWidth={3} /> */}
      </button>
    </div>
  );
};

export default ProductActions;