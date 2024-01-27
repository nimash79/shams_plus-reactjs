import { useEffect, useState } from "react";
import UserPanel from "../../components/main/UserPanel";
import CustomInput from "../../components/shared/CustomInput";
import { getTransactions } from "../../services/cardService";
import { datePickerToDate, getTime, toShamsi } from "../../utils/helper";
import CustomDatePicker from "../../components/shared/CustomDatePicker";

const Transactions = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [amount_from, setAmount_from] = useState();
  const [amount_to, setAmount_to] = useState();
  const [date_from, setDate_from] = useState(null);
  const [date_to, setDate_to] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await getTransactions();
        setAllTransactions(res.data.data.transactions);
        setTransactions(res.data.data.transactions);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    console.log("filtering");
    let filteredTransactions = [...allTransactions];
    if (amount_from)
      filteredTransactions = filteredTransactions.filter(
        (t) => t.amount >= amount_from
      );
    if (amount_to)
      filteredTransactions = filteredTransactions.filter(
        (t) => t.amount <= amount_to
      );
    if (date_from)
      filteredTransactions = filteredTransactions.filter(
        (t) => new Date(t.date) >= datePickerToDate(date_from)
      );
    if (date_to)
      filteredTransactions = filteredTransactions.filter(
        (t) => t.date <= datePickerToDate(date_to)
      );

    setTransactions(filteredTransactions);
  }, [amount_from, amount_to, date_from, date_to]);
  return (
    <UserPanel title="تراکنش ها">
      <div className="transactions">
        <div className="transactions-filter">
          <div>
            <CustomInput
              title="از (مبلغ)"
              icon="wallet"
              onChange={(e) => setAmount_from(e.target.value)}
            />
            <CustomInput
              title="تا (مبلغ)"
              icon="wallet"
              onChange={(e) => setAmount_to(e.target.value)}
            />
          </div>
          <div>
            <CustomDatePicker
              title="از (تاریخ)"
              icon="calendar-alt"
              value={date_from}
              onChange={setDate_from}
            />
            <CustomDatePicker
              title="تا (تاریخ)"
              icon="calendar-alt"
              value={date_to}
              onChange={setDate_to}
            />
          </div>
        </div>
        <div className="transactions-table">
          <table>
            <tbody>
              <tr>
                <th>نوع</th>
                <th>مبلغ</th>
                <th>تاریخ</th>
                <th>زمان</th>
              </tr>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    {transaction.description === "charge"
                      ? "خرید شارژ"
                      : "انتقال وجه"}
                  </td>
                  <td
                    style={
                      transaction.type === "withdraw"
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                  >
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td>{toShamsi(transaction.date)}</td>
                  <td>{getTime(transaction.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </UserPanel>
  );
};

export default Transactions;
