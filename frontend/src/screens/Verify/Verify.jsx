import React, { useEffect, useState } from "react";
import { verifyEmail as verifyEmailApi } from "../../services/AuthApi";
import "./styles.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Loader } from "../../components";
import { useAuth } from "../../context";
import { TOKEN_KEY } from "../../context/AuthContext";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const { checkAuthentication } = useAuth();
  const [loading, setLoading] = useState(true);

  const verifyEmail = async () => {
    if (!token) {
      toast.error("Invalid token.");
      setLoading(false);
    }
    const body = {
      token,
    };
    try {
      const response = await verifyEmailApi(body);
      if (response?.status) {
        localStorage.setItem(TOKEN_KEY, response.token);
        await checkAuthentication();
        toast.success(response.message);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="verify-screen-error">
          <h2>Email Verification Failed</h2>
          <p>We couldn't verify your email address. This might be due to:</p>
          <ul>
            <li>An invalid or expired verification link.</li>
            <li>The verification link was already used.</li>
          </ul>
          <p>Please try the following options:</p>
          <ul>
            <li>
              <a href="/resend-verification">Resend the verification email</a>.
            </li>
            <li>
              Contact our <a href="/support">support team</a> for further
              assistance.
            </li>
          </ul>
          <div className="flex-center">
            <Button type="Primary" onClick={() => navigate("/")}>
              Go to Home
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Verify;
