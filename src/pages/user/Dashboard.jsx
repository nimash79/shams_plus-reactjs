import { useSelector } from "react-redux";
import UserPanel from "../../components/main/UserPanel";
import { toShamsi } from "../../utils/helper";
import { useEffect, useState } from "react";
import { getCardSummary, hasCard } from "../../services/cardService";

const Dashboard = () => {
  const [card, setCard] = useState();
  const [amount, setAmount] = useState(0);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
      const res = await hasCard();
      if (!res.data.data.exists) return;
      const cardRes = await getCardSummary();
      setCard(cardRes.data.data.card);
      const sum_withdraw = cardRes.data.data.card.transactions
        .filter((t) => t.type === "withdraw")
        .reduce((a, b) => {
          if (!a) return b.amount;
          return a.amount + b.amount;
        }, 0);
      const sum_deposit = cardRes.data.data.card.transactions
        .filter((t) => t.type === "deposit")
        .reduce((a, b) => {
          if (!a) return b.amount;
          return a.amount + b.amount;
        }, 0);
      setAmount(sum_withdraw - sum_deposit);
    })();
  }, []);
  return (
    <UserPanel title="داشبورد">
      <div className="welcome">
        <p>
          <i className="fas fa-smile" style={{ marginLeft: 10 }}></i>
          {user.fullname} عزیز به پنل کاربری شمس پلاس خوش آمدید.
        </p>
      </div>
      <div className="dashboard-1">
        <div className="statuses">
          <div className="title">
            <i className="fas fa-eye"></i>
            <span>وضعیت ها</span>
          </div>
          <div className="statuses-body">
            <div>
              <p>تاریخ آخرین ورود</p>
              <p className="num">{toShamsi(user.lastLoginDate)}</p>
            </div>
            <div>
              <p>تاریخ ثبت نام</p>
              <p className="num">{toShamsi(user.registerDate)}</p>
            </div>
          </div>
        </div>
        <div className="links">
          <div className="title">
            <i className="fas fa-file-invoice-dollar"></i>
            <span>اخبار جدید</span>
          </div>
        </div>
      </div>
      {card && (
        <div className="dashboard-2">
          <div className="account-overview">
            <div className="title">
              <i className="fas fa-eye"></i>
              <span>حساب شما در یک نگاه</span>
            </div>
            <div className="account-overview-body">
              <div>
                <p>موجودی</p>
                <p>
                  <span className="num">
                    {parseInt(card.balance).toLocaleString()}
                  </span>{" "}
                  تومان
                </p>
                {parseInt(card.balance) < 1000000 ? (
                  <p className="red">بدبخت فقیر</p>
                ) : (
                  <p className="green">آدم پولدار</p>
                )}
              </div>
              <div>
                <p>در یک ماه اخیر</p>
                <p>
                  <span className="num">{Math.abs(amount).toLocaleString()}</span> تومان
                </p>
                {amount < 0 && <p className="red">ضرر</p>}
                {amount > 0 && <p className="green">سود</p>}
              </div>
            </div>
          </div>
          <div className="transactions-overview">
            <div className="title">
              <i className="fas fa-file-invoice-dollar"></i>
              <span>تراکنش های اخیر</span>
            </div>
            <div className="transactions-overview-body">
              <table>
                <tbody>
                  {card.transactions.length &&
                    card.transactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td>{transaction.description}</td>
                        <td className="num">{toShamsi(transaction.date)}</td>
                        {transaction.type === "deposit" ? (
                          <td className="red">برداشت</td>
                        ) : (
                          <td className="green">واریز</td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </UserPanel>
  );
};

export default Dashboard;
