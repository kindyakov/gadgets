import Loader from "../components/Loader/Loader"

const Button = ({ isLoader = false, isLoading, className = '', children, ...props }) => {
  return (
    <button className={`${className} button py-3 relative`} {...props}>
      <div className={`flex items-center justify-center gap-2 transition-opacity ${isLoading ? 'opacity-0' : ''}`}>{children}</div>
      {isLoader ? <Loader className={`${isLoading ? '' : 'opacity-0'}`} /> : null}
    </button>
  )
}

export default Button