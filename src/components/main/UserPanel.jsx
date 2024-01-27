import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { isAuthenticated } from "../../utils/auth";
import { useNavigate } from "react-router";
import { hasCard } from "../../services/cardService";
import { notif_warning } from "../../utils/toast";
import { accountRequiredRoutes } from "../../utils/constants";

const UserPanel = ({ children, title }) => {
  const [exists, setExists] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(`/login?returnUrl=${window.location.pathname}`);
      return;
    }
    (async () => {
      const res = await hasCard();
      setExists(res.data.data.exists);
      if (
        window.location.pathname === "/open-account" &&
        res.data.data.exists
      ) {
        notif_warning("افتتاح حساب برای شما انجام شده است.");
        navigate("/view-account");
        return;
      }
      if (
        accountRequiredRoutes.includes(window.location.pathname) &&
        !res.data.data.exists
      ) {
        notif_warning("ابتدا باید افتتاح حساب کنید.");
        navigate("/open-account");
      }
    })();
  }, [window.location.pathname]);
  // useEffect(() => {
  //   try {
  //     ref.current.style.opacity = 0;
  //     setTimeout(() => ref.current.style.opacity = 1, 200);
  //   } catch (err) {console.log(err)}
  // }, [title, exists])
  if (!isAuthenticated()) return null;
  if (window.location.pathname === "/open-account" && exists) return null;
  if (accountRequiredRoutes.includes(window.location.pathname) && !exists) return null;
  return (
    <div className="user-panel">
      <div className="half-circle user-panel-title">
        <span>{title}</span>
      </div>
      <div className="user-panel-container">
        <Sidebar title={title} />
        <div className="content" ref={ref}>{children}</div>
      </div>
    </div>
  );
};

export default UserPanel;
