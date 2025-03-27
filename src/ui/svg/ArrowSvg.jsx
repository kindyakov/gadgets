export const ArrowSvg = ({ color = '', ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke" {...props}>
      <path d="M7.0835 4.16671L12.9168 10L7.0835 15.8334" strokeWidth="1.5" stroke={color || 'currentColor'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
