export const CloseSvg = ({ color = 'currentColor', ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}