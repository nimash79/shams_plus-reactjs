import Footer from "../components/main/Footer"
import Header from "../components/main/Header"

const MainLayout = ({children}) => {
    return (
        <>
        <Header />
        {children}
        <Footer />
        </>
    )
}

export default MainLayout;