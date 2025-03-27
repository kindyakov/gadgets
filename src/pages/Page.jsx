import Header from "../layout/Header/Header"
import Footer from "../layout/Footer/Footer"
import Breadcrumbs from "../layout/Breadcrumbs/Breadcrumbs"

const Page = ({ children, isBreadcrumbs = true, ...props }) => {
  return (
    <div className="wrapper flex flex-col min-h-screen overflow-x-hidden" {...props}>
      <Header />
      <main className="main flex-auto pb-20">
        <div className="container">
          {isBreadcrumbs ? <Breadcrumbs /> : ''}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Page