import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../shared/CustomInput";
import { useState } from "react";
import { resetPassword } from "../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";

const ForgetPassword2 = ({ model }) => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (!password || !confirmPassword)
        return notif_error("وارد کردن فیلدها اجباری است!");
      if (password !== confirmPassword)
        return notif_error("رمز عبور با تایید رمز عبور مغایرت دارد!");
      model.newPassword = password;
      const res = await resetPassword(model);
      if (res.data.data.status === 1) {
        notif_success("رمز عبور شما با موفقیت تغییر یافت.");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div class="forget-password-form-2">
      <form onSubmit={submit}>
        <CustomInput
          title="رمز عبور جدید"
          icon="lock"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomInput
          title="تایید رمز عبور جدید"
          icon="lock"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <hr class="login-form-separator" />
        <div class="login-links">
          <div>
            <Link to="/login" title="ورود">
              <i class="fas fa-sign-in-alt"></i>
              <span>ورود</span>
            </Link>
          </div>
          <div>
            <Link to="/register" title="ثبت نام">
              <i class="fas fa-id-badge"></i>
              <span>ثبت نام</span>
            </Link>
          </div>
        </div>
        <div class="register-submit">
          <input type="submit" class="submit-button" value="تغییر رمز" />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword2;
