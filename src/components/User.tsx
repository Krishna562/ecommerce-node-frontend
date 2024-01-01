import { useEffect, useRef, useState } from "react";
import { UserI, changeUserRole } from "../store/reducers/userReducer";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch } from "../hooks/hooks";

interface PropsI {
  user: UserI;
}

const User = ({ user }: PropsI) => {
  const [isOptionVisible, setIsOptionVisible] = useState(false);

  const { email, dateJoined, isAdmin, _id } = user;
  const role = isAdmin ? "Admin" : "User";

  const optionRef = useRef<HTMLDivElement>(null);
  const editBtnRef = useRef<HTMLElement>(null);

  const dispatch = useAppDispatch();

  //   CHANGE THE USER ROLE

  const changeRole = async (userId: string, isAdminNow: boolean) => {
    await dispatch(changeUserRole({ userId, isAdminNow }));
  };

  const handleClickOutsideOptionElement = (e: any) => {
    if (
      optionRef.current!.contains(e.target) ||
      editBtnRef.current!.contains(e.target)
    )
      return;
    setIsOptionVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideOptionElement);

    return () =>
      document.removeEventListener("click", handleClickOutsideOptionElement);
  }, []);

  return (
    <div className="user" key={_id}>
      <span>{email}</span>
      <span>{dateJoined}</span>
      <span className={`user-role user-role--${role}`}>
        {role}{" "}
        <i
          className="user-edit-btn"
          ref={editBtnRef}
          onClick={() => {
            setIsOptionVisible(!isOptionVisible);
          }}
        >
          <FaEdit />
        </i>
        <div
          className="user-role-option"
          ref={optionRef}
          onClick={() => {
            changeRole(_id, !isAdmin);
            setIsOptionVisible(false);
          }}
          style={{ display: isOptionVisible ? "block" : "none" }}
        >
          Make {isAdmin ? "User" : "Admin"}
        </div>
      </span>
    </div>
  );
};

export default User;
