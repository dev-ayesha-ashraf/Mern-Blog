import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Header from "./Pages/Components/Header";
import PrivateRoute from "./Pages/Components/PrivateRoutes";
import AdminRoute from "./Pages/Components/AdminRoute";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";
import PostPage from "./Pages/PostPage";
import DashPosts from "./Pages/Components/DashPosts";
import { Cart } from "./Pages/Components/Cart";
import DashSideBar from "./Pages/Components/DashSideBar";
import { InfoPage } from "./Pages/Info";
import { Messages } from "./Pages/Components/Message";
import DepositWithdraw from "./Pages/Components/Deposit";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <DashSideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Message" element={<Messages />} />
        <Route path="/deposit" element={<DepositWithdraw />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />


        </Route>

        {/* Admin Only Routes */}
        <Route element={<AdminRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
          <Route path="/posts" element={<DashPosts />} />

        </Route>

        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
