export const StarSvg = ({ color = 'currentColor', ...props }) => {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11.8652 0.996222C11.4799 0.332071 10.5208 0.332069 10.1354 0.996222L7.42132 5.67353C7.23094 6.00161 6.90189 6.22551 6.52683 6.28215L1.44052 7.05038C0.586235 7.17941 0.286575 8.25802 0.951881 8.80922L4.74097 11.9484C5.09171 12.239 5.25663 12.6974 5.17143 13.1448L4.18026 18.35C4.02358 19.1728 4.88737 19.8121 5.62852 19.4219L10.4179 16.9C10.7825 16.7081 11.2182 16.7081 11.5827 16.9L16.3721 19.4219C17.1132 19.8121 17.977 19.1728 17.8203 18.35L16.8292 13.1448C16.744 12.6974 16.9089 12.239 17.2596 11.9484L21.0487 8.80922C21.714 8.25802 21.4144 7.17941 20.5601 7.05038L15.4738 6.28215C15.0987 6.22551 14.7697 6.00161 14.5793 5.67353L11.8652 0.996222Z" fill={color} />
    </svg>
  )
}