import { useState } from "react";
import UserPanel from "../../components/main/UserPanel";
import CustomInput from "../../components/shared/CustomInput";
import CustomSubmit from "../../components/shared/CustomSubmit";
import { notif_error, notif_success } from "../../utils/toast";
import { changePassword } from "../../services/userService";
import { useNavigate } from "react-router";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (!oldPassword || !newPassword || !confirmPassword)
        return notif_error("واردکردن فیلدها اجباری می باشد.");
      if (newPassword !== confirmPassword)
        return notif_error("رمز عبور جدید با تایید رمز عبور جدید مغایرت دارد.");
      const res = await changePassword({ oldPassword, newPassword });
      if (res.data.data.status === 3)
        return notif_error("رمز عبور فعلی صحیح نمی باشد.");
      notif_success("رمز عبور شما با موفقیت تغییر یافت.");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <UserPanel title="تغییر رمز عبور">
      <div className="change-password-form">
        <form onSubmit={submit}>
          <div className="guide">
            <p>پس از تغییر رمز عبور شما باید مجددا لاگین کنید.</p>
          </div>
          <CustomInput
            title="رمز عبور فعلی"
            icon="key"
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <CustomInput
            title="رمز عبور جدید"
            icon="key"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <CustomInput
            title="تایید رمز عبور جدید"
            icon="key"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="form-submit">
            <CustomSubmit title="ثبت" />
          </div>
        </form>
      </div>
    </UserPanel>
  );
};

export default ChangePassword;
