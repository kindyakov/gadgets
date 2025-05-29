const Placeholder = ({ id, children, watch, errors }) => {
  const hasValue = (name) => !!watch(name);
  return (
    <label
      htmlFor={id}
      className={`absolute transition-all text-gray-500 pointer-events-none text-[#9FA9B4] ${hasValue(id) || errors[id] ? '-top-4 text-xs left-0' : 'top-2 left-3'} peer-focus:-top-4 peer-focus:left-0 peer-focus:text-xs`
      }
    >
      {children} {errors[id] ? <span className='text-red-light'>({errors[id].message})</span> : ''}
    </label>
  )
}

export default Placeholder