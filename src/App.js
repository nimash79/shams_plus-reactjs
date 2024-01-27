import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/account/Login";
import Logout from "./pages/account/Logout";
import Register from "./pages/account/Register";
import ForgetPassword from "./pages/account/ForgetPassword";
import ChangePassword from "./pages/user/ChangePassword";
import OpenAccount from "./pages/user/OpenAccount";
import ViewAccount from "./pages/user/ViewAccount";
import CardToCard from "./pages/user/CardToCard";
import Charge from "./pages/user/Charge";
import Block from "./pages/user/Block";
import Transactions from "./pages/user/Transactions";
import Dashboard from "./pages/user/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./reducers/userReducer";
import { decode_token } from "./utils/auth";
import ContactUs from "./pages/statics/ContactUs";
import AboutUs from "./pages/statics/AboutUs";
import Guide from "./pages/statics/Guide";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(addUser(decode_token(token)));
  }, [])
  return (
    <MainLayout>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/register" Component={Register} />
        <Route path="/forget-password" Component={ForgetPassword} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/change-password" Component={ChangePassword} />
        <Route path="/open-account" Component={OpenAccount} />
        <Route path="/view-account" Component={ViewAccount} />
        <Route path="/transfer" Component={CardToCard} />
        <Route path="/charge" Component={Charge} />
        <Route path="/block" Component={Block} />
        <Route path="/transactions" Component={Transactions} />
        <Route path="contact-us" Component={ContactUs} />
        <Route path="about-us" Component={AboutUs} />
        <Route path="guide" Component={Guide} />
      </Routes>
    </MainLayout>
  );
};

export default App;
