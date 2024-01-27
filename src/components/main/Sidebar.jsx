import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { hasCard } from "../../services/cardService";
import { notif_error } from "../../utils/toast";

const Sidebar = ({ title }) => {
    const [classes, setClasses] = useState("item");
    const [openAccountClass, setOpenAccountClass] = useState("item");
    const [exists, setExists] = useState(false);
    useEffect(() => {
        (async () => {
            const res = await hasCard();
            setExists(res.data.data.exists);
            if (res.data.data.exists) {
                setClasses("item");
                setOpenAccountClass("item disable");
            }
            else {
                setClasses("item disable");
                setOpenAccountClass("item");
            }
        })();
    }, []);
    const clickDisable = (event) => {
        const value = event.target.innerText;
        if (value === "افتتاح حساب") {
            if (exists) return notif_error("به این بخش نمی توانید دسترسی داشته باشید.");
        } else if (!exists) return notif_error("به این بخش نمی توانید دسترسی داشته باشید.");
    }
  return (
    <div className="side-bar">
      <div className={title === "داشبورد" ? "item active" : "item"}>
        <i className="fas fa-home"></i>
        <Link to="/dashboard">داشبورد</Link>
      </div>
      <div className={title === "تغییر رمز عبور" ? "item active" : "item"}>
        <i className="fas fa-key"></i>
        <Link to="/change-password">تغییر رمز عبور</Link>
      </div>
      <div className={title === "افتتاح حساب" ? `${openAccountClass} active` : openAccountClass} onClick={clickDisable}>
        <i className="fas fa-credit-card"></i>
        <Link to={!exists ? "/open-account" : "#"}>افتتاح حساب</Link>
      </div>
      <div className={title === "مشاهده حساب" ? `${classes} active` : classes} onClick={clickDisable}>
        <i className="fas fa-credit-card"></i>
        <Link to={exists ? "/view-account" : "#"}>مشاهده حساب</Link>
      </div>
      <div className={title === "انتقال وجه" ? `${classes} active` : classes} onClick={clickDisable}>
        <i className="fas fa-money-check-alt"></i>
        <Link to={exists ? "/transfer" : "#"}>انتقال وجه</Link>
      </div>
      <div className={title === "خرید شارژ" ? `${classes} active` : classes} onClick={clickDisable}>
        <i className="fas fa-shopping-cart"></i>
        <Link to={exists ? "/charge" : "#"}>خرید شارژ</Link>
      </div>
      <div className={title === "انسداد کارت" ? `${classes} active` : classes} onClick={clickDisable}>
        <i className="fas fa-ban"></i>
        <Link to={exists ? "/block" : "#"}>انسداد کارت</Link>
      </div>
      <div className={title === "تراکنش ها" ? `${classes} active` : classes} onClick={clickDisable}>
        <i className="fas fa-file-invoice-dollar"></i>
        <Link to={exists ? "/transactions" : "#"}>تراکنش ها</Link>
      </div>
      <div className="item disable" onClick={() => notif_error("درحال حاضر تنظیماتی وجود ندارد.")}>
        <i className="fas fa-cog"></i>
        <Link to="#">تنظیمات</Link>
      </div>
      <div className={title === "خروج" ? "item active" : "item"}>
        <i className="fas fa-power-off"></i>
        <Link to="/logout">خروج</Link>
      </div>
    </div>
  );
};

export default Sidebar;
