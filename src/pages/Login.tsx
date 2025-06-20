import { useState } from "react";
import { signinUser } from "../db/signinUser";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import illustration from "../assets/login.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signinUser({ email, password });
      navigate("/");
    } catch (err: unknown) {
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
    <div className="min-h-screen flex items-center justify-center bg-sky-200 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl w-full flex flex-col md:flex-row">
        {/* Login Section */}
        <div className="w-full md:w-1/2 md:p-8 lg:p-10 content-center">
          <h2 className="text-2xl font-semibold mb-4 text-center text-sky-600">
            Login
          </h2>

          {error && <Alert type="error" message={error} />}
          <input
            className="w-full border border-gray-400 p-2 mb-3 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-400 p-2 mb-3 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-sky-500 text-white p-2 rounded hover:bg-sky-600 cursor-pointer"
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </button>

          <p className="mt-4 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-sky-600 underline">
              SignUp
            </a>
          </p>
        </div>

        {/* Illustration Section */}
        <div className="md:flex items-center justify-center w-full md:w-1/2 p-4">
          <img
            src={illustration}
            alt="Login Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
