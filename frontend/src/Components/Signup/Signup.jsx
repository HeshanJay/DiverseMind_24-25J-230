// Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import backgroundImage from "../../assets/background_images/back_img6.jpg"; // Import the image

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/signup/", {
        email,
        password,
      });
      setMessage(response.data.message);
      setVerificationToken(response.data.token); 
    } catch (error) {
      setMessage(error.response?.data?.detail || "Signup failed");
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/verify-email/?token=${verificationToken}`
      );
      setMessage(response.data.message);
      setIsVerified(true);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Verification failed");
    }
  };

  return (
    <div
      className="signup-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="forest-background">
        {!isVerified ? (
          <>
            <form onSubmit={handleSignup} className="signup-form">
              <h2>ගුරු ලියාපදිංචිය</h2>
              <input
                type="email"
                placeholder="විද්‍යුත් තැපෑල ඇතුලත් කරන්න"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="මුරපදයක් ඇතුලත් කරන්න"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">ලියාපදිංචි වෙන්න</button>
              {message && <p className="message">{message}</p>}

              <p className="login-option">
              ගිණුමක් තිබේද?{" "}
              <Link to="/login" className="login-link">
                පිවිසුම
              </Link>
            </p>
            </form>
            {verificationToken && (
              <button className="verify-button" onClick={handleVerifyEmail}>
                Verify Email
              </button>
            )}
          </>
        ) : (
          <div className="verification-success">
            <h2>Email Verified!</h2>
            <p>Your account has been successfully created. You can now log in.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;




// import React, { useState } from "react";
// import axios from "axios";
// import "./Signup.css";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isVerified, setIsVerified] = useState(false);
//   const [verificationToken, setVerificationToken] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/signup/", {
//         email,
//         password,
//       });
//       setMessage(response.data.message);
//       setVerificationToken(response.data.token); // Assuming backend returns the token
//     } catch (error) {
//       setMessage(error.response?.data?.detail || "Signup failed");
//     }
//   };

//   const handleVerifyEmail = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/verify-email/?token=${verificationToken}`
//       );
//       setMessage(response.data.message);
//       setIsVerified(true); // Mark as verified
//     } catch (error) {
//       setMessage(error.response?.data?.detail || "Verification failed");
//     }
//   };

//   return (
//     <div className="signup-container">
//       {!isVerified ? (
//         <>
//           <form onSubmit={handleSignup} className="signup-form">
//             <h2>ගුරු ලියාපදිංචිය </h2>
//             <input
//               type="email"
//               placeholder="විද්‍යුත් තැපෑල ඇතුලත් කරන්න  "
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="මුරපදයක් ඇතුලත් කරන්න "
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit">ලියාපදිංචි වෙන්න</button>
//             {message && <p>{message}</p>}
//           </form>
//           {verificationToken && (
//             <button onClick={handleVerifyEmail}>Verify Email</button>
//           )}
//         </>
//       ) : (
//         <div>
//           <h2>Email Verified!</h2>
//           <p>Your account has been successfully created. You can now log in.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signup;
