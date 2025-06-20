import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupUser } from "../db/SignupUser";
import { Alert } from "../components/Alert";
import illustration from "../assets/register.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    if (!email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await SignupUser({ email, password, name: email.split("@")[0] });
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl w-full flex flex-col md:flex-row">
        {/* Illustration Section */}
        <div className="md:flex items-center justify-center w-full md:w-1/2 p-4">
          <img
            src={illustration}
            alt="Register Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Register Section */}
        <div className="w-full md:w-1/2 md:p-8 lg:p-10 content-center">
          <h2 className="text-2xl font-semibold mb-4 text-center text-teal-700">
            Register
          </h2>

          {error && <Alert type="error" message={error} />}

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-400 p-2 mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-400 p-2 mb-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-400 p-2 mb-4 rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 cursor-pointer"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
