import { useEffect, useState } from "react";
import UserPanel from "../../components/main/UserPanel";
import CustomButton from "../../components/shared/CustomButton";
import { blockCard, viewAccount } from "../../services/cardService";
import { cardExpireDate } from "../../utils/helper";
import { notif_success } from "../../utils/toast";
import { useNavigate } from "react-router";

const Block = () => {
  const [card, setCard] = useState({
    balance: 0,
    cvv2: 0,
    expireDate: new Date(),
    cardNumber: "",
    owner: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await viewAccount();
        setCard(res.data.data.card);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const submit = async () => {
    try {
      const res = await blockCard();
      if (res.data.data.status === 1) {
        notif_success("کارت شما با موفقیت مسدود شد.");
        navigate("/open-account");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <UserPanel title="انسداد کارت">
      <div className="credit-card">
        <img src="/assets/images/logo.jpg" />
        <span className="balance"><span className="num">{card.balance}</span> تومان</span>
        <span className="cvv2">cvv2: <span className="num">{card.cvv2}</span></span>
        <span className="expire-date">انقضاء: <span className="num">{cardExpireDate(card.expireDate)}</span></span>
        <div className="info">
            <span className="num">{card.cardNumber}</span>
            <br />
            <span>{card.owner}</span>
        </div>
      </div>
      <div style={{textAlign: "center", marginTop: 20}}>
        <p style={{marginBottom: 10, fontSize: 14}}>در صورت اطمینان از مسدود کردن کارت خود روی دکمه تایید کلیک کنید.</p>
        <CustomButton title="تایید" onClick={submit} />
      </div>
    </UserPanel>
  );
};

export default Block;
