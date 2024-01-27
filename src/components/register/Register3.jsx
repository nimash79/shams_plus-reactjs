import { useState } from "react";

import CustomInput from "../shared/CustomInput";
import { notif_error } from "../../utils/toast";

const Register3 = ({ model, setModel, nextLevel }) => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const submit = (event) => {
    event.preventDefault();
    if (!password || !confirmPassword) return notif_error("وارد کردن فیلدها اجباری می باشد.");
    if (password !== confirmPassword) return notif_error("رمز عبور با تایید رمز عبور مغایرت دارد.");
    model.password = password;
    setModel(model);
    nextLevel();
  };
  return (
    <div className="register-form-1">
      <form onSubmit={submit}>
        <CustomInput
          title="رمز عبور"
          icon="key"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomInput
          title="تایید رمز عبور"
          icon="key"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div class="register-submit">
          <input type="submit" className="submit-button" value="مرحله بعد" />
        </div>
      </form>
    </div>
  );
};

export default Register3;
