import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { BiLogOut } from "react-icons/bi";
import "../../css/User/profile.css";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { logout } from "../../store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { email, isAdmin, dateJoined } = useAppSelector(
    (state) => state.user.currentUser
  );
  const thisUserOrders = [];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = async (): Promise<void> => {
    try {
      await dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="profile">
      {/* HEADER */}
      <h1 className="profile__header">Your Profile</h1>

      {/* BELOW HEADER */}
      <div className="profile__con">
        {/* INFO */}
        <div className="profile__info-con">
          <div className="profile__email">
            Email : {email}
            {isAdmin ? <MdAdminPanelSettings /> : <FaUser />}
          </div>
          <div className="profile__orders">
            Orders Placed : {thisUserOrders.length}
          </div>
          <div className="profile__date">Joined on : {dateJoined}</div>
        </div>

        {/* OPTIONS */}
        <div className="profile__options-con">
          <button className="profile__btn btn">All orders</button>
          <button
            className="profile__btn profile__btn--logout btn"
            onClick={() => logoutUser()}
          >
            <BiLogOut />
            Logout
          </button>
        </div>
      </div>
      {/* ADMIN OPTIONS */}
      {isAdmin && (
        <button
          className="profile__view-admin-dashboard-btn btn"
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          Admin dashboard
        </button>
      )}
    </section>
  );
};

export default Profile;
