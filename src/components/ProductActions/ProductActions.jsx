import { FavoriteSvg } from '../../ui/svg/FavoriteSvg';
import { ComparisonSvg } from '../../ui/svg/ComparisonSvg';
import Loader from '../Loader/Loader';

const ProductActions = ({ product = {} }) => {
  if (Object.keys(product).length === 0) {
    return ''
  }

  return (
    <div className="flex gap-3">
      <button className="w-11 h-11 rounded-full border-[#ebf0f7] border-[1px] border-solid flex items-center justify-center group flex-shrink-0 hover:border-red-light transition-colors">
        <FavoriteSvg className="w-5 h-5 group-hover:text-red-light transition-colors" />
      </button>
      <button className="w-11 h-11 rounded-full border-[#ebf0f7] border-[1px] border-solid flex items-center justify-center group flex-shrink-0 hover:border-red-light transition-colors">
        <ComparisonSvg className="w-5 h-5 group-hover:text-red-light stroke transition-colors" />
      </button>
    </div>
  );
};

export default ProductActions;