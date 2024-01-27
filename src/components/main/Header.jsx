import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="header">
      <div className="header__inner">
        <div className="main-menu">
          <div className="logo">
            <img src="/assets/images/logo.jpg" alt="logo" />
            <Link to="/" title="صفحه اصلی"></Link>
          </div>
          <div className="menu mt">
            <ul>
              <li>
                <Link to="/">صفحه اصلی</Link>
              </li>
              <li>
                <Link to="/contact-us">ارتباط با ما</Link>
              </li>
              <li>
                <Link to="/about-us">درباره ما</Link>
              </li>
              <li>
                <Link to="/guide">سوالات متداول</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="coin">
          <img src="/assets/images/coin.png" alt="header" />
        </div>
        <div className="forms mt">
          <div className="forms__login-register">
            {user.id === undefined ? (
              <Link to="/login">ورود / عضویت</Link>
            ) : (
              <Link to="/dashboard">پنل کاربری</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
