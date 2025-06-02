
import styles from './Auth.module.css';
import logo from '../../assets/amazon_dark_logo.png';
import { IoEyeOffOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';
import { useContext, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase';
import { DataContext } from '../../components/Context/Context';
import { Type } from '../../Utility/action.type';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Controlled Elements
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [_, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  function toggleAuthMode() {
    setIsLogin(!isLogin);
  }

  async function authHandler(e) {
    e.preventDefault();

    if (e.target.name === 'signin') {
      setIsLoading(true);
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        navigate('/');
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        toast.error(err.code.split('/')[1].split('-').join(' '));
      }
    } else {
      setIsLoading(true);
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        dispatch({
          type: Type.SET_USER,
          user: { ...userInfo.user, displayName: name },
        });
        navigate('/');
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        toast.error(err.code.split('/')[1].split('-').join(' '));
      }
    }
  }

  return (
    <div className={styles.container}>
      <Link to='/' className={styles.logo}>
        <img src={logo} alt="Amazon Logo" />
      </Link>

      <div className={styles.authBox}>
        <h1>{isLogin ? 'Sign in' : 'Create account'}</h1>

        <form>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={styles.showPasswordBtn}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOutline size={25} />
                ) : (
                  <IoEyeOffOutline size={25} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            name={isLogin ? 'signin' : 'signup'}
            onClick={authHandler}
          >
            {isLoading ? (
              <ClipLoader color='#222' size={15} />
            ) : isLogin ? (
              'Sing in'
            ) : (
              'Create your Amazon account'
            )}
          </button>
        </form>

        <div className={styles.terms}>
          By continuing, you agree to Amazon's <a href="#">Conditions of Use</a>{' '}
          and <a href="#">Privacy Notice</a>.
        </div>

        <div className={styles.divider}>
          <span>New to Amazon?</span>
        </div>

        <button className={styles.toggleAuthBtn} onClick={toggleAuthMode}>
          {isLogin ? 'Create Your Amazon account' : 'Sign in to your account'}
        </button>
      </div>
    </div>
  );
}

export default Auth;