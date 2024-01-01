import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchAllUsers } from "../../store/reducers/userReducer";
import "../../css/admin/users.css";
import User from "../../components/User";

const Users = () => {
  const dispatch = useAppDispatch();

  const allUsers = useAppSelector((state) => state.user.allUsers);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const getAllUsers = async () => {
    await dispatch(fetchAllUsers());
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className="users">
      <h1 className="users-heading">Users</h1>
      <div className="users-con">
        <div className="users-lower">
          <div className="users-fields">
            <span>Email</span>
            <span>Date Joined</span>
            <span>Role</span>
          </div>

          <div className="user" key={currentUser._id}>
            <span>{currentUser.email} (You)</span>
            <span>{currentUser.dateJoined}</span>
            <span className={`user-role user-role--Admin`}>{"Admin"}</span>
          </div>

          {allUsers.map((user) => {
            if (user._id === currentUser._id) return;
            return <User user={user} key={user._id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Users;
