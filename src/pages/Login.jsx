import { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    setLoading(true);
    try {
  const res = await axios.post(process.env.REACT_APP_LOGIN, loginData);
  console.log(res);
  
    } catch (error) {
      toast(error.response.data)
    }finally{
      setLoading(false)
    }
  }

  if(loading){
    return <Loader />
  }

  return (
    <section className="login">
      <div className="container">
        <div className="row">
          <h2>Login Page</h2>
          <div className="login-box">
            <form>
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
                <button onClick={(e) => {
                  e.preventDefault();
                  onLogin(e);
                }}>
                  Login
                  <span></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
