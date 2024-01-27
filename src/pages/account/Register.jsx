import { useState } from "react";
import Register1 from "../../components/register/Register1";
import Register2 from "../../components/register/Register2";
import Register3 from "../../components/register/Register3";
import Register4 from "../../components/register/Register4";
import { register } from "../../services/accountService";
import { notif_error, notif_success } from "../../utils/toast";
import { useNavigate } from "react-router";
import { formatDatePicker } from "../../utils/helper";

const Register = () => {
  const [step, setStep] = useState(1);
  const [model, setModel] = useState({});
  const navigate = useNavigate();
  const nextLevel = () => setStep((s) => s + 1);
  const submit = async () => {
    try {
      if (!model.birthCertificate || !model.idCard)
        return notif_error("انتخاب کردن عکس ها اجباری می باشد.");
      const formData = new FormData();
      formData.append("fullname", model.fullname);
      formData.append("nationalCode", model.nationalCode);
      formData.append("username", model.nationalCode);
      formData.append("birthDate", formatDatePicker(model.birthDate));
      formData.append("mobile", model.mobile);
      formData.append("password", model.password);
      formData.append("images", model.idCard);
      formData.append("images", model.birthCertificate);
      await register(formData);
      notif_success("ثبت نام شما با موفقیت انجام شد.");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <img src="assets/images/container-bg.png" className="register-bg" />
      <div className="half-circle register-title">
        <span>ثبت نام</span>
      </div>
      {step === 1 && (
        <Register1 model={model} setModel={setModel} nextLevel={nextLevel} />
      )}
      {step === 2 && (
        <Register2 model={model} setModel={setModel} nextLevel={nextLevel} />
      )}
      {step === 3 && (
        <Register3 model={model} setModel={setModel} nextLevel={nextLevel} />
      )}
      {step === 4 && <Register4 model={model} setModel={setModel} />}
      <div className="level-box">
        <span className="num">4</span> / <span className="num">{step}</span>
      </div>
      {step === 4 && (
        <div className="register-submit">
          <input
            type="submit"
            className="submit-button"
            value="اتمام"
            onClick={submit}
          />
        </div>
      )}
    </div>
  );
};

export default Register;
