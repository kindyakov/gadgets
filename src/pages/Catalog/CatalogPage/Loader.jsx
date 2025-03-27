import ContentLoader from "react-content-loader"

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={250}
    viewBox="0 0 400 150"
    backgroundColor="#d5e4fb"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="35" y="0" rx="5" ry="5" width="120" height="12" />
    <rect x="35" y="30" rx="2" ry="2" width="70" height="6" />
    <rect x="35" y="50" rx="2" ry="2" width="70" height="6" />
    <rect x="35" y="70" rx="2" ry="2" width="70" height="6" />
    <rect x="35" y="90" rx="2" ry="2" width="70" height="6" />

    <rect x="130" y="30" rx="2" ry="2" width="70" height="6" />
    <rect x="130" y="50" rx="2" ry="2" width="70" height="6" />
    <rect x="130" y="70" rx="2" ry="2" width="70" height="6" />
    <rect x="130" y="90" rx="2" ry="2" width="70" height="6" />
  </ContentLoader>
)

export default Loader