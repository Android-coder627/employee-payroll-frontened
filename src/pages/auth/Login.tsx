import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

import { loginUser } from '../../services/authService';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    setError('');
    setLoading(true);

    try {

      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem(
        'token',
        response.token
      );

      navigate('/dashboard');

    } catch (error: any) {

  console.error('LOGIN ERROR:', error);

  console.error('STATUS:', error.response?.status);
  console.error('DATA:', error.response?.data);

  setError(
    error.response?.data?.message ||
    `Login failed: ${error.response?.status || 'Server error'}`
  );

} finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light"
    >

      <div
        className="card shadow"
        style={{
          width: '100%',
          maxWidth: '420px',
        }}
      >

        <div className="card-body p-4">

          <div className="text-center mb-4">

            <h2 className="fw-bold">
              Employee Payroll
            </h2>

            <p className="text-muted">
              Login to your account
            </p>

          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="mb-3">

              <label className="form-label">
                Email
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaEnvelope />
                </span>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div className="mb-4">

              <label className="form-label">
                Password
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >

              {loading
                ? 'Logging in...'
                : 'Login'}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;