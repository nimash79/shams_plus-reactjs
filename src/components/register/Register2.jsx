import { useState } from "react";
import CustomInput from "../shared/CustomInput";
import { existsMobile, getActiveCode } from "../../services/accountService";
import { twoDigit } from "../../utils/helper";
import { notif_error, notif_success } from "../../utils/toast";

const Register2 = ({ model, setModel, nextLevel }) => {
  const [mobile, setMobile] = useState();
  const [code, setCode] = useState(0);
  const [receivedCode, setReceivedCode] = useState();
  const [timer, setTimer] = useState(0);
  const sendSms = async () => {
    if (!mobile || mobile.length !== 11) return notif_error("لطفا شماره همراه معتبری وارد کنید!");
    const existsRes = await existsMobile(mobile);
    if (existsRes.data.data.exists) return notif_error("کاربری با این شماره همراه وجود دارد!");
    if (timer !== 0) return notif_error("تایمر باید ۰ شود!");
    const res = await getActiveCode({ mobile });
    setReceivedCode(res.data.data.code);
    notif_success("کد تایید با موفقیت ارسال شد.");
    setTimer(30);
    startTimer();
  };
  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((t) => {
        if (t === 0) {
          clearInterval(intervalId);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };
  const submit = (event) => {
    event.preventDefault();
    if (code === 0 || parseInt(code) !== receivedCode) return notif_error("کد تایید وارد شده معتبر نمی باشد!");
    model.mobile = mobile;
    setModel(model);
    nextLevel();
  };
  return (
    <div className="register-form-2">
      <form onSubmit={submit}>
        <CustomInput
          title="شماره همراه"
          icon="mobile"
          onChange={(e) => setMobile(e.target.value)}
        />
        <div className="send-sms">
          <span>00:{twoDigit(timer)}</span>
          <button
            type="button"
            className="required-button"
            onClick={() => sendSms(mobile)}
          >
            ارسال
          </button>
        </div>
        <CustomInput title="کد تایید" icon="sms" onChange={e => setCode(e.target.value)} />
        <div className="register-submit">
          <input type="submit" className="submit-button" value={"مرحله بعد"} />
        </div>
      </form>
    </div>
  );
};

export default Register2;
