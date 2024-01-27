import { useState } from "react";
import UserPanel from "../../components/main/UserPanel";
import CustomInput from "../../components/shared/CustomInput";
import CustomSelectbox from "../../components/shared/CustomSelectbox";
import CustomSubmit from "../../components/shared/CustomSubmit";
import { notif_error, notif_success } from "../../utils/toast";
import { charge, requestPin2 } from "../../services/cardService";
import { useNavigate } from "react-router";

const Charge = () => {
  const [mobile, setMobile] = useState();
  const [operator, setOperator] = useState("IRANCELL");
  const [chargeType, setChargeType] = useState(5);
  const [pin2, setPin2] = useState();
  const [receivedPin2, setReceivedPin2] = useState();
  const [pin2Disabled, setPin2Disabled] = useState();
  const navigate = useNavigate();
  const sendPin2 = async () => {
    try {
      if (pin2Disabled)
        return notif_error(
          "حداکثر تا دو دقیقه مجاز به دریافت مجدد رمز دوم نمی باشید."
        );
      const res = await requestPin2();
      setPin2Disabled(true);
      setTimeout(() => setPin2Disabled(false), 120000);
      setReceivedPin2(res.data.data.pin2);
      notif_success("رمز دوم با موفقیت ارسال شد.");
    } catch (err) {
      console.log(err);
    }
  };
  const options = [
    { text: "۵ تومانی", value: 5 },
    { text: "۱۰ تومانی", value: 10 },
    { text: "۲۰ تومانی", value: 20 },
    { text: "۵۰ تومانی", value: 50 },
  ];
  const options2 = [
    { text: "ایرانسل", value: "IRANCELL" },
    { text: "همراه اول", value: "MCI" },
    { text: "رایتل", value: "RITEL" },
  ];
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (!mobile) return notif_error("لطفا شماره همراه را وارد کنید.");
      if (!pin2) return notif_error("لطفا رمز دوم را وارد کنید");
      if (mobile.length !== 11)
        return notif_error("شماره همراه وارد شده معتبر نمی باشد.");
      if (parseInt(pin2) != receivedPin2)
        return notif_error("رمز دوم وارد شده معتبر نمی باشد.");
      const res = await charge({
        mobile,
        operator,
        chargeType,
        pin2: parseInt(pin2),
      });
      if (res.data.data.status === 3)
        return notif_error("رمز دوم وارد شده معتبر نمی باشد.");
      if (res.data.data.status === 4)
        return notif_error("رمز دوم وارد شده منقضی شده است.");
      if (res.data.data.status === 6)
        return notif_error("موجودی حساب شما کافی نمی باشد.");
      notif_success("خرید شارژ با موفقیت انجام شد.");
      navigate("/transactions");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <UserPanel title="خرید شارژ">
      <div className="change-password-form">
        <form onSubmit={submit}>
          <CustomInput
            title="شماره همراه"
            icon="mobile"
            type="number"
            onChange={(e) => setMobile(e.target.value)}
          />
          <CustomSelectbox
            title="اپراتور"
            options={options2}
            icon="sim-card"
            onChange={(e) => setOperator(e.target.value)}
          />
          <CustomSelectbox
            title="کارت شارژ"
            options={options}
            icon="cart-plus"
            onChange={(e) => setChargeType(e.target.value)}
          />
          <CustomInput
            title="رمز دوم"
            icon="key"
            type="password"
            iconDisabled={pin2Disabled}
            onClick={sendPin2}
            onChange={(e) => setPin2(e.target.value)}
          />
          <div className="form-submit">
            <CustomSubmit title="خرید" />
          </div>
        </form>
      </div>
    </UserPanel>
  );
};

export default Charge;
