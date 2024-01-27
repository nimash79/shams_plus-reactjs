import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "../../reducers/userReducer";
import { notif_success } from "../../utils/toast";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem('token');
        dispatch(removeUser());
        notif_success("خروج شما با موفقیت انجام شد.");
        navigate('/');
    }, []);
    return null;
}

export default Logout;