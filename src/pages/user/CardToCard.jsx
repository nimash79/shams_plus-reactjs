import { useState } from "react";
import UserPanel from "../../components/main/UserPanel";
import CustomInput from "../../components/shared/CustomInput";
import CustomSubmit from "../../components/shared/CustomSubmit";
import { cardToCard, getCardOwner, requestPin2 } from "../../services/cardService";
import { notif_error, notif_success } from "../../utils/toast";
import { useNavigate } from "react-router";

const CardToCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState();
  const [pin2, setPin2] = useState();
  const [receivedPin2, setReceivedPin2] = useState();
  const [validCardNumber, setValidCardNumber] = useState(false);
  const [owner, setOwner] = useState("");
  const [pin2Disabled, setPin2Disabled] = useState(false);
  const navigate = useNavigate();
  const changeCardNumber = async (event) => {
    setCardNumber(event.target.value);
    setValidCardNumber(false);
    setOwner("");
    if (event.target.value.length === 16) {
      const res = await getCardOwner(event.target.value);
      if (res.data.data.status === 1) {
        setOwner(res.data.data.owner);
        setValidCardNumber(true);
      }
    }
  }
  const sendPin2 = async () => {
    try {
      if (pin2Disabled) return notif_error("حداکثر تا دو دقیقه مجاز به دریافت مجدد رمز دوم نمی باشید.");
      const res = await requestPin2();
      setPin2Disabled(true);
      setTimeout(() => setPin2Disabled(false), 120000);
      setReceivedPin2(res.data.data.pin2);
      notif_success("رمز دوم با موفقیت ارسال شد.");
    } catch (err) {
      console.log(err);
    }
  }
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (!cardNumber || !amount || !pin2) return notif_error("وارد کردن فیلد ها اجباری می باشد.");
      if (cardNumber.length !== 16) return notif_error("شماره کارت وارد شده معتبر نمی باشد.");
      if (!validCardNumber) return notif_error("حسابی با این شماره کارت وجود ندارد.");
      if (amount < 2000) return notif_error("کمتر از ۲۰۰۰ تومن امکان پذیر نمی باشد.");
      if (amount > 10000000) return notif_error("بیشتر از ۱۰ میلیون تومن امکان پذیر نمی باشد.");
      if (parseInt(pin2) != receivedPin2) return notif_error("رمز دوم وارد شده معتبر نمی باشد.");
      const res = await cardToCard({cardNumber, amount, pin2: parseInt(pin2)});
      if (res.data.data.status === 2) return notif_error("حسابی با این شماره کارت وجود ندارد.");
      if (res.data.data.status === 3) return notif_error("رمز دوم وارد شده معتبر نمی باشد.");
      if (res.data.data.status === 4) return notif_error("رمز دوم وارد شده منقضی شده است.");
      if (res.data.data.status === 5) return notif_error("فکر کردی زرنگی؟؟؟");
      if (res.data.data.status === 6) return notif_error("موجودی حساب شما کافی نمی باشد.");
      notif_success("انتقال وجه با موفقیت انجام شد.");
      navigate("/transactions");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <UserPanel title="انتقال وجه">
      <div className="change-password-form">
        <form onSubmit={submit}>
          <CustomInput title="شماره کارت مقصد" icon="money-check" type="number" onChange={changeCardNumber} />
          {owner !== "" && <p style={{marginTop: -15, marginBottom: -15, fontSize: 12}}>{owner}</p>}
          <CustomInput title="مبلغ" icon="wallet" type="number" onChange={e => setAmount(e.target.value)} />
          <CustomInput title="رمز دوم" icon="key" type="password" onClick={sendPin2} onChange={e => setPin2(e.target.value)}
          iconDisabled={pin2Disabled} />
          <div className="form-submit">
            <CustomSubmit title="انتقال" />
          </div>
        </form>
      </div>
    </UserPanel>
  );
};

export default CardToCard;
