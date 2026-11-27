import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MotionPresence as AnimatePresence } from '../../components/ui/MotionPresence';
import { AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import BrandLogo from '../../components/ui/BrandLogo';
import Button from '../../components/ui/Button';
import WorkflowVisual from '../../components/WorkflowVisual/WorkflowVisual';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { startAdminSession } from '../../auth/adminSession';
import loginData from './LogInAccess/LogInAccess';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const LogIn: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  useDocumentTitle('Log in');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const LogInValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === loginData.userName && password === loginData.password) {
      // The admin pages check this marker. Without it a correct login was sent straight back here.
      startAdminSession();
      setIsAuthenticated(true);
      navigate('/AdminPanel');
    } else if (username.length === 0 || password.length === 0) {
      setError('Enter Username & Password');
    } else {
      setError('Enter valid Username & Password');
    }
  };

  return (
    <div className="inner-hero grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Link to="/" className="inline-flex items-center gap-2 self-start text-sm font-medium text-ink-500 transition hover:text-ink-900">
          <ArrowLeft size={16} /> Back to website
        </Link>
        <motion.form
          onSubmit={LogInValidation}
          noValidate
          className="card m-auto my-8 w-full max-w-md p-4 sm:my-auto sm:p-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <BrandLogo />
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Log In</h1>
          <p className="mt-2 text-ink-500">Sign in to the admin panel.</p>

          <label htmlFor="username" className="mt-5 block text-sm font-semibold text-ink-900">Username</label>
          <input id="username" className="field mt-2" type="text" autoComplete="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />

          <label htmlFor="password" className="mt-5 block text-sm font-semibold text-ink-900">Password</label>
          <div className="relative mt-2">
            <input
              id="password"
              className="field pr-12"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-900"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 overflow-hidden pt-4 text-sm font-medium text-rose-700"
              >
                <AlertCircle size={17} className="shrink-0" /> {error}
              </motion.p>
            )}
          </AnimatePresence>

          <Button type="submit" size="lg" className="mt-7 w-full">Log In</Button>
        </motion.form>
      </div>
      <div className="home-hero relative hidden items-center justify-center overflow-hidden border-l border-ink-200 p-12 lg:flex" aria-hidden="true">
        <div className="hero-grid absolute inset-0" />
        <div className="workflow-frame relative w-full max-w-xl">
          <WorkflowVisual />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
