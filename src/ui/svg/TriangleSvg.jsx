export const TriangleSvg = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.64645 12.9797L5.85355 9.18681C5.53857 8.87182 5.76165 8.33325 6.20711 8.33325H13.7929C14.2383 8.33325 14.4614 8.87182 14.1464 9.1868L10.3536 12.9797C10.1583 13.175 9.84171 13.175 9.64645 12.9797Z" fill={color || "currentColor"} />
    </svg>
  )
}