import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import backgroundImage from "../../assets/background_images/back_img6.jpg"; 
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      setMessage(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Login failed");
    }
  };

  const fetchProtectedData = async () => {
    const token = localStorage.getItem("access_token");
    const response = await axios.get("http://127.0.0.1:8000/protected-endpoint", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="forest-background">
        <form onSubmit={handleLogin} className="login-form">
          <h2>ගුරු පිවිසුම</h2>
          <input
            type="email"
            placeholder="විද්‍යුත් තැපෑල ඇතුලත් කරන්න"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="මුරපදයක ඇතුලත් කරන්න"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">ඉදිරියට යන්න</button>
          {message && <p className="message">{message}</p>}

          <p className="signup-option">
            ගිණුමක් නැතේනම්?{" "}
            <Link to="/signup" className="signup-link">
              ලියාපදිංචි වන්න
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState } from "react";
// import axios from "axios";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/login/", {
//         email,
//         password,
//       });
//       localStorage.setItem("access_token", response.data.access_token);
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.detail || "Login failed");
//     }
//   };
  
//   const fetchProtectedData = async () => {
//     const token = localStorage.getItem("access_token");
//     const response = await axios.get("http://127.0.0.1:8000/protected-endpoint", {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     console.log(response.data);
// };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleLogin} className="login-form">
//         <h2>Teacher Login</h2>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//         {message && <p>{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;
