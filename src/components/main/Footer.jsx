import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const [style, setStyle] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") setStyle({ position: "relative" });
    else setStyle(null);
  }, [location.pathname]);
  return (
    <div className="footer" style={style}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ul>
              <li>
                <div>
                  <h3>پشتیبانی</h3>
                  <p style={{ color: "white" }}>
                    ساعت پاسخگویی پشتیبانی شمس+
                    <br />
                    همه روزه از ساعت ۷:۳۰ لغایت ۲۴
                    <br />
                    می باشد.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h3>دسترسی سریع</h3>
                  <Link to="/dashboard">داشبورد</Link>
                  <Link to="/open-account">افتتاح حساب</Link>
                  <Link to="/login">ورود / عضویت</Link>
                  <Link to="/forget-password">فراموشی رمز عبور</Link>
                </div>
              </li>
              <li>
                <div>
                  <h3>شمس +</h3>
                  <Link to="/contact-us">ارتباط با ما</Link>
                  <Link to="/about-us">درباره ما</Link>
                  <Link to="/guide">سوالات متداول</Link>
                </div>
              </li>
              <li>
                <div>
                  <h3>همکاران و شرکای تجاری</h3>
                  <a href="https://cbi.ir" target="_blank">
                    بانک مرکزی
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
