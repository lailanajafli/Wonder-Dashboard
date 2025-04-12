import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.height = "100vh";
    document.documentElement.style.overflow = "hidden";

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";

      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(process.env.REACT_APP_LOGIN, loginData);

      // Token'ı saxla
      localStorage.setItem("token", res.data.token);

      toast.success("Giriş başarılı!", {
        position: "bottom-right",
      });

      // Dashboard'a yönlendir
      window.location.href = "/all-products";
    } catch (error) {
      toast.error(error.response?.data?.message || "Bir hata oluştu!", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="login">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="loginCont">
        <div className="container">
          <div className="row">
            <h2 style={{ color: "white" }}>Login Page</h2>
            <div className="login-box">
              <form onSubmit={onLogin}>
                <div className="user-box">
                  <input type="email" name="email" onChange={handleChange} />
                  <label>Email</label>
                </div>
                <div className="user-box">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                  <label>Password</label>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      onLogin(e);
                    }}
                  >
                    Login
                    <span></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
