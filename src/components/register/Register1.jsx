import { useState } from "react";

import CustomInput from "../shared/CustomInput";
import { notif_error } from "../../utils/toast";
import { existsNationalCode } from "../../services/accountService";
import CustomDatePicker from "../shared/CustomDatePicker";

const Register1 = ({ model, setModel, nextLevel }) => {
  const [fullname, setFullname] = useState();
  const [nationalCode, setNationalCode] = useState();
  const [birthDate, setBirthDate] = useState();
  const submit = async (event) => {
    event.preventDefault();
    console.log(birthDate);
    if (!fullname || !nationalCode || !birthDate)
      return notif_error("وارد کردن فیلدها اجباری می باشد.");
    if (nationalCode.length !== 10)
      return notif_error("کد ملی وارد شده معتبر نمی باشد.");
    const res = await existsNationalCode(nationalCode);
    if (res.data.data.exists)
      return notif_error("کاربری با این کد ملی وجود دارد.");
    model.fullname = fullname;
    model.nationalCode = nationalCode;
    model.birthDate = birthDate;
    setModel(model);
    nextLevel();
  };
  return (
    <div className="register-form-1">
      <form onSubmit={submit}>
        <CustomInput
          title="نام و نام خانوادگی"
          icon="user"
          onChange={(e) => setFullname(e.target.value)}
        />
        <CustomInput
          title="کد ملی"
          icon="id-card"
          type="number"
          onChange={(e) => setNationalCode(e.target.value)}
        />
        <CustomDatePicker
          title="تاریخ تولد"
          icon="calendar-alt"
          value={birthDate}
          onChange={setBirthDate}
        />
        <div className="register-submit">
          <input type="submit" className="submit-button" value="مرحله بعد" />
        </div>
      </form>
    </div>
  );
};

export default Register1;
