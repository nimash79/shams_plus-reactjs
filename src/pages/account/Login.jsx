
import CustomInput from "../../components/shared/CustomInput";
import CustomCheckbox from "../../components/shared/CustomCheckbox";
import CustomSubmit from "../../components/shared/CustomSubmit";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../../services/accountService";
import { useDispatch } from "react-redux";
import { decode_token } from "../../utils/auth";
import { addUser } from "../../reducers/userReducer";
import { notif_error, notif_success, notif_warning } from "../../utils/toast";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation().search
  const returnUrl = new URLSearchParams(search).get("returnUrl");
  useEffect(() => {
    console.log(returnUrl);
    if (returnUrl) notif_warning("ابتدا لاگین کنید.");
  }, [])
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (!username || !password) return notif_error("وارد کردن فیلد ها اجباری می باشد.");
      const res = await login({ username, password, rememberMe });
      const status = res.data.data.status;
      if (status === 0) return notif_error("ادمین درحال بررسی مدارک شماست!");
      if (status === 2) return notif_error("مدارک شما توسط ادمین رد صلاحیت شد!");
      if (status === 4) return notif_error("نام کاربری یا رمز عبور صحیح نمی باشد.");
      localStorage.setItem("token", res.data.data.token);
      const user = decode_token(res.data.data.token);
      dispatch(addUser(user));
      notif_success("ورود شما با موفقیت انجام شد.");
      if (returnUrl) navigate(returnUrl);
      else navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <img src="assets/images/container-bg.png" className="login-bg" />
      <div className="half-circle register-title">
        <span>ورود</span>
      </div>
      <div className="login-form">
        <form onSubmit={submit}>
          <CustomInput
            title="نام کاربری"
            icon="user"
            onChange={(e) => setUsername(e.target.value)}
          />
          <CustomInput
            title="کلمه عبور"
            icon="key"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomInput title="عبارت امنیتی" icon="lock" />
          <div class="login-submit">
            <CustomCheckbox
              id="remember-me"
              title="مرا به خاطر بسپار"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <CustomSubmit title="ورود" />
          </div>
        </form>
        <hr className="login-form-separator" />
        <div className="login-links">
          <div>
            <Link to="/register" title="ثبت نام">
              <i className="fas fa-id-badge"></i>
              <span>ثبت نام</span>
            </Link>
          </div>
          <div>
            <Link to="/forget-password" title="فراموشی کلمه عبور">
              <i className="fas fa-key"></i>
              <span>فراموشی کلمه عبور</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
