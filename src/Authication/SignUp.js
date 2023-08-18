import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Glogo from "../Assets/glogo.png";
import "../styles/SignUp.css";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Logo from "../Assets/unnamed.png";

const SignUp = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [submit, setSubmit] = useState(false);

  const handleSignUpGoogle = (e) => {
    e.preventDefault();
    setSubmit(true);

    signInWithGoogle();
  };
  const handleSubmitOnlyEmailAndpassword = (e) => {
    setSubmit(true);
    const displayName = e.target[1].value?.trim();
    const email = e.target[2].value?.trim();
    const password = e.target[3].value?.trim();
    if (!displayName) {
      return toast.warn("Please Provide Your Name", {
        position: "top-left",
        theme: "colored"
      })
    }
    if (password.length < 6) {
      return toast.warn("Password will be at least 6 letter...", {
        position: "top-left",
        theme: "colored",
      });
    }
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success("Signup Successfully...", {
            position: "top-left",
            theme: "colored",
          });
          navigate("/warehouselist");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage, {
            position: "top-left",
            theme: "colored"
          })
          // ..
        });

      setSubmit(false);
    } catch (err) {
      toast.error(err, {
        position: "top-left",
        theme: "colored",
      });
      setSubmit(false);

      // setLoading(false);
    }
  };
  useEffect(() => {
    if (currentUser) {
      setSubmit(false);
      navigate("/warehouselist");
    }
  }, [currentUser]);

  return (
    <div className="splitScreen">
      <div className="left">
        <section className="copy">
          <img alt="logo" src={Logo} />
        </section>
      </div>
      <div className="right">
        <form onSubmit={handleSubmitOnlyEmailAndpassword}>
          <section className="copy">
            <h2>Sign Up</h2>
            <p>Sign up to your account</p>
          </section>
          <button
            className="signupBtn google"
            type="submit"
            onClick={handleSignUpGoogle}
            disabled={submit}
          >
            <img src={Glogo} alt="Glogo" />
            Sign up with Google
          </button>
          <div className="inputCointainer name">
            <label htmlFor="fname">Full Name</label>
            <input id="fname" name="fname" type="text" required />
          </div>
          <div className="inputCointainer email">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="inputCointainer password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Must be 6 characters"
              required
            />
          </div>
          <button
            className={`signupBtn ${submit ? "activeS" : ""}`}
            type="submit"
            disabled={submit}
          >
            {submit ? "Signingup" : "Signup"}
          </button>

          <section className="copy">
            <div className="loginCointainer">
              <p>
                Already have an account <Link to="/">Log In</Link>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default SignUp;