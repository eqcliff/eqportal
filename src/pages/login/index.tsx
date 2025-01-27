import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      navigate('/')
    } catch (error) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <svg width="120" height="64" viewBox="0 0 294 158" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M92.5924 150.928C51.4412 159.851 10.6915 133.697 1.75676 92.6249-7.20157 51.5529 18.9879 10.8586 60.1159 1.91253 98.1237-6.34906 126.89 14.895 132.279 19.2383L138.448 24.2424C138.732 24.4785 138.803 24.7854 138.803 24.9742 138.803 25.3519 138.661 25.7059 138.4 25.9419L81.7435 78.2261 65.8832 69.0911 109.942 29.5771 107.673 28.2789C97.6273 22.5665 81.9326 16.5474 64.1341 20.3949 63.0705 20.631 61.9832 20.9142 60.9195 21.1974 32.8391 29.105 15.0879 56.6751 19.6498 85.3307 22.1553 101.099 30.7826 114.743 43.9719 123.735 57.9177 133.248 71.2488 136.222 85.8563 133.036 94.4361 131.171 100.345 128.055 108.359 121.139L178.962 56.6043 196.121 66.5654 120.839 135.373C112.377 142.666 106.231 147.954 92.5924 150.928ZM231.908 150.74 231.931 150.74C193.924 159.025 165.134 137.781 159.768 133.437L153.575 128.433C153.292 128.197 153.221 127.89 153.221 127.677 153.197 127.324 153.363 126.946 153.623 126.71L210.138 74.4965 225.691 83.5137 182.081 123.098 184.327 124.373C194.373 130.109 210.067 136.128 227.866 132.28 228.93 132.044 230.017 131.761 231.08 131.478 259.161 123.57 276.912 96.0004 272.35 67.3444 269.845 51.5765 261.217 37.9567 248.051 28.9398 234.082 19.4271 220.775 16.4529 206.144 19.6396 197.564 21.5043 191.678 24.6201 183.641 31.5363L112.85 96.2123 95.6892 86.2985 171.185 17.3027C179.647 10.0089 185.792 4.72148 199.431 1.7473 240.559-7.17522 281.309 18.9551 290.243 60.0269 299.202 101.099 273.012 141.817 231.884 150.74L231.908 150.74Z" fill="url(#paint0_linear)" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="76.3371" x2="292" y2="76.3371" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5EE5D4" />
                <stop offset="1" stopColor="#F1F4B1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          <h2 className={styles.title}>
            Sign in to your account
          </h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className={styles.inputGroup}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={styles.input}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className={`group ${styles.button}`}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}