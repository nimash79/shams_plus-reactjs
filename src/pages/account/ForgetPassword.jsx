import { useState } from "react";

import ForgetPassword1 from "../../components/forget-password/ForgetPassword1";
import ForgetPassword2 from "../../components/forget-password/ForgetPassword2";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [model, setModel] = useState({});
  const nextStep = () => setStep((s) => s + 1);
  return (
    <div class="register">
      <img src="assets/images/container-bg.png" class="register-bg" />
      <div class="half-circle register-title">
        <span style={{ fontSize: 12 }}>فراموشی کلمه عبور</span>
      </div>
      {step === 1 && (
        <ForgetPassword1
          model={model}
          setModel={setModel}
          nextStep={nextStep}
        />
      )}
      {step === 2 && <ForgetPassword2 model={model} setModel={setModel} />}
      <div class="level-box">
        <span class="num">2</span> / <span class="num">{step}</span>
      </div>
    </div>
  );
};

export default ForgetPassword;
