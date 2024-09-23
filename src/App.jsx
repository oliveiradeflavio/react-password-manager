// import react
import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Home from "./page/Home/Home"
import Autenticacao from "./page/Autenticacao/Autenticacao"
import Dashboard from "./page/Dashboard/Dashboard"

// components
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"


function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/autenticacao" element={<Autenticacao />}></Route>


          {/* A página Dashboard, só poder ser acessada através de autenticação */}
          <Route path="/dashboard" element=
            {
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
          </Route>

          <Route path="*" element={<h1>404 - Página não encontrada</h1>}></Route>

        </Routes>

        <Footer />
      </BrowserRouter>


    </>
  )
}

export default App
