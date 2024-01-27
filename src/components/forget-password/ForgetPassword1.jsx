import { Link } from "react-router-dom";
import CustomInput from "../shared/CustomInput";
import { useState } from "react";
import { forgetPassword } from "../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import { twoDigit } from "../../utils/helper";

const ForgetPassword1 = ({model, setModel, nextStep}) => {
  const [mobile, setMobile] = useState();
  const [code, setCode] = useState("");
  const [receivedCode, setReceivedCode] = useState();
  const [timer, setTimer] = useState(0);
  const sendSms = async () => {
    if (timer !== 0) return notif_error("تایمر باید ۰ شود!");
    const res = await forgetPassword({mobile});
    if (res.data.code === 404) return notif_error("کاربری با این شماره وجود ندارد!");
    setReceivedCode(res.data.data.code);
    notif_success("کد تایید با موفقیت ارسال شد!");
    setTimer(30);
    startTimer();
  }
  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer(t => {
        if (t === 0) {
          clearInterval(intervalId);
          return 0;
        }
        return t-1;
      });
    }, 1000)
  }
  const submit = event => {
    event.preventDefault();
    if (code === "" || parseInt(code) !== receivedCode) return notif_error('کد تایید وارد شده صحیح نمی باشد!');
    model.mobile = mobile;
    setModel(model);
    nextStep();
  }
  return (
    <div class="forget-password-form-1">
      <form onSubmit={submit}>
        <CustomInput title="شماره همراه" icon="mobile" type="number" onChange={e => setMobile(e.target.value)} />
        <div class="send-sms">
          <span>00:{twoDigit(timer)}</span>
          <button type="button" class="required-button" onClick={sendSms}>
            ارسال
          </button>
        </div>
        <CustomInput title="کد تایید" icon="sms" type="number" onChange={e => setCode(e.target.value)} />
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
          <input type="submit" class="submit-button" value="مرحله بعد" />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword1;
