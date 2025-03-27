export const CheckSvg = ({ color = '', ...props }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke" {...props}>
      <path d="M20 7L9.33333 17L4 12" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  )
}