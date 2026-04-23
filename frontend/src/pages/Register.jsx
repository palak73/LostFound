import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", form);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "#f4f6f9" }}
    >
      <div
        className="card p-4 border-0"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
        }}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-4"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="btn btn-dark w-100 py-2">
            Register
          </button>
        </form>

        <p className="text-center mt-4 mb-0 text-muted">
          Already have an account?{" "}
          <Link to="/" className="text-decoration-none fw-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;