import React, { useContext, useState } from "react";
import Styles from "../styles/navbar.module.css";
import Menu from "../Assets/menu.png";
import Cross from "../Assets/close.png";
import User from "../Assets/profile.png";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [menu, setMenu] = useState(true);

  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className={Styles.main}>
      <div className={Styles.navbar}>
        <ul className={Styles.link}>
          <li className={Styles.user}>
            <img
              className={Styles.userimg}
              alt="user"
              src={currentUser ? currentUser.photoURL : User}
            />
            <span>{currentUser?.displayName}</span>
          </li>
        </ul>
        <a
          href="#"
          className={Styles.actionBtn}
          onClick={(e) => {
            signOut(auth);
            toast.success("Successfully Signout...", {
              position: "top-left",
              theme: "colored",
            });
          }}
        >
          SignOut
        </a>
        <div className={Styles.toggleBtn}>
          <img alt="menu" src={menu ? Menu : Cross} onClick={toggleMenu} />
        </div>
      </div>
      <div
        style={menu ? { display: "none" } : null}
        className={Styles.dropDownMenu}
      >
        <li>
          <img
            className={Styles.userimg}
            alt="user"
            src={currentUser ? currentUser.photoURL : User}
          />
          <span>{currentUser?.displayName}</span>
        </li>
        <li>
          <a
            href="#"
            className={Styles.actionBtn}
            onClick={(e) => {
              signOut(auth);
              toast.success("Successfully Signout...", {
                position: "top-left",
                theme: "colored",
              });
            }}
          >
            SignOut
          </a>
        </li>
      </div>
    </div>
  );
};

export default Navbar;