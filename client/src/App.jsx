import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Projects from "./Pages/Projects"
import Dashboard from "./Pages/Dashboard"
import Header from "./Pages/Components/Header"
import Footer from "./Pages/Components/Footer"
import PrivateRoute from "./Pages/Components/PrivateRoutes"
import CreatePost from "./Pages/CreatePost"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}