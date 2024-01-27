import { useState } from "react";
import UserPanel from "../../components/main/UserPanel";
import CustomInput from "../../components/shared/CustomInput";
import CustomSubmit from "../../components/shared/CustomSubmit";
import { notif_error, notif_success, notif_warning } from "../../utils/toast";
import { openAccount } from "../../services/cardService";
import { useNavigate } from "react-router";

const OpenAccount = () => {
  const [amount, setAmount] = useState(0);
  const [pin1, setPin1] = useState(0);
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (pin1 === 0) return notif_error("رمز کارت خود را وارد کنید.");
      if (pin1 < 1000 || pin1 > 9999)
        return notif_error("رمز کارت معتبر وارد کنید.");
      const res = await openAccount({ amount, pin1 });
      if (res.data.data.status === 1) {
        notif_success("افتتاح حساب با موفقیت انجام شد.");
        navigate("/view-account");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserPanel title="افتتاح حساب">
      <div className="change-password-form">
        <form onSubmit={submit}>
          <CustomInput
            title="میزان موجودی"
            icon="wallet"
            type="number"
            defaultValue={0}
            min={0}
            onChange={(e) => setAmount(e.target.value)}
          />
          <CustomInput
            title="رمز کارت"
            icon="key"
            type="number"
            defaultValue={0}
            onChange={(e) => setPin1(e.target.value)}
          />
          <div className="form-submit">
            <CustomSubmit title="ثبت" />
          </div>
        </form>
      </div>
    </UserPanel>
  );
};

export default OpenAccount;
