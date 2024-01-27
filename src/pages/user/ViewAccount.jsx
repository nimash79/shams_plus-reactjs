import { useEffect, useState } from "react";
import UserPanel from "../../components/main/UserPanel";
import { hasCard, viewAccount } from "../../services/cardService";
import { cardExpireDate } from "../../utils/helper";
import { useNavigate } from "react-router";
import { notif_warning } from "../../utils/toast";

const ViewAccount = () => {
  const [card, setCard] = useState({
    balance: 0,
    cvv2: 0,
    expireDate: new Date(),
    cardNumber: "",
    owner: "",
  });
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
  return (
    <UserPanel title="مشاهده حساب">
      <div className="credit-card">
        <img src="/assets/images/logo.jpg" />
        <span className="balance">
          <span className="num">{card.balance}</span> تومان
        </span>
        <span className="cvv2">
          cvv2: <span className="num">{card.cvv2}</span>
        </span>
        <span className="expire-date">
          انقضاء: <span className="num">{cardExpireDate(card.expireDate)}</span>
        </span>
        <div className="info">
          <span className="num">{card.cardNumber}</span>
          <br />
          <span>{card.owner}</span>
        </div>
      </div>
    </UserPanel>
  );
};

export default ViewAccount;
