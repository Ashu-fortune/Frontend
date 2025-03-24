import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useLocalState from '../utils/localState'
import { FormRow } from '../components/Auth'

function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    hideAlert()
    setLoading(true)
    const { name, email, password } = values
    const registerNewUser = { name, email, password }

    try {
      const { data } = await axios.post(
        `/api/v1/auth/register`,
        registerNewUser
      )
      setSuccess(true)
      setValues({ name: '', email: '', password: '' })
      showAlert({ text: data.msg, type: 'success' })
    } catch (error) {
      const { msg } = error.response.data
      showAlert({ text: msg || 'there was an error' })
    }
    setLoading(false)
  }

  return (
    <Wrapper className='page'>
      <div className='register-container'>
        <div className='form-side'>
          <div className='form-header'>
            <h2>Create Your Account</h2>
            <p className='subtitle'>
              Start organizing your tasks with our Kanban board
            </p>
          </div>

          {alert.show && (
            <div className={`alert alert-${alert.type}`}>{alert.text}</div>
          )}

          {!success && (
            <form
              className={loading ? 'form form-loading' : 'form'}
              onSubmit={onSubmit}
            >
              <FormRow
                type='name'
                name='name'
                value={values.name}
                handleChange={handleChange}
                label='Full Name'
              />

              <FormRow
                type='email'
                name='email'
                value={values.email}
                handleChange={handleChange}
                label='Email Address'
              />

              <FormRow
                type='password'
                name='password'
                value={values.password}
                handleChange={handleChange}
                label='Password'
              />

              <button
                type='submit'
                className='btn btn-block'
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <div className='form-footer'>
                <p>
                  Already have an account?
                  <Link to='/login' className='login-link'>
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          )}

          {success && (
            <div className='success-message'>
              <div className='success-icon'>✓</div>
              <h3>Registration Successful!</h3>
              <p>
                Your account has been created. Please check your email for
                verification.
              </p>
              <Link to='/login' className='btn btn-block'>
                Go to Login
              </Link>
            </div>
          )}
        </div>

        <div className='info-side'>
          <div className='info-content'>
            <h2>Welcome to Kanban</h2>
            <div className='benefits'>
              <div className='benefit-item'>
                <div className='benefit-icon'>🔍</div>
                <div className='benefit-text'>
                  <h4>Visual Task Management</h4>
                  <p>See your workflow at a glance with intuitive boards</p>
                </div>
              </div>

              <div className='benefit-item'>
                <div className='benefit-icon'>⚡</div>
                <div className='benefit-text'>
                  <h4>Boost Productivity</h4>
                  <p>Track progress and identify bottlenecks easily</p>
                </div>
              </div>

              <div className='benefit-item'>
                <div className='benefit-icon'>🤝</div>
                <div className='benefit-text'>
                  <h4>Team Collaboration</h4>
                  <p>Work together seamlessly on projects and tasks</p>
                </div>
              </div>
            </div>

            <div className='testimonial'>
              <p>
                "This Kanban board transformed how our team manages projects.
                Highly recommended!"
              </p>
              <div className='testimonial-author'>
                — Sarah J., Product Manager
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--grey-50) 0%, var(--white) 100%);
  padding: 2rem;

  .register-container {
    display: flex;
    max-width: 1200px;
    width: 100%;
    background: var(--white);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }

  .form-side {
    flex: 1;
    padding: 3rem;
    position: relative;
  }

  .info-side {
    flex: 1;
    background: linear-gradient(
      135deg,
      var(--primary-500) 0%,
      var(--primary-700) 100%
    );
    color: white;
    padding: 3rem;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .info-side::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,.05)' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .form-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .form-header h2 {
    font-size: 1.8rem;
    color: var(--grey-900);
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: var(--grey-600);
    font-size: 1rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-row {
    position: relative;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--grey-700);
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--grey-300);
    border-radius: 8px;
    background: var(--grey-50);
    transition: all 0.3s;
  }

  .form-input:focus {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-100);
    background: white;
  }

  .btn {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background: var(--primary-500);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn:hover:not(:disabled) {
    background: var(--primary-600);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .form-footer {
    margin-top: 1.5rem;
    text-align: center;
  }

  .login-link {
    display: inline-block;
    margin-left: 0.5rem;
    color: var(--primary-500);
    font-weight: 600;
    transition: all 0.3s;
  }

  .login-link:hover {
    color: var(--primary-600);
    text-decoration: underline;
  }

  .alert {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  .alert-danger {
    background-color: var(--red-50);
    color: var(--red-700);
    border: 1px solid var(--red-100);
  }

  .alert-success {
    background-color: var(--green-50);
    color: var(--green-700);
    border: 1px solid var(--green-100);
  }

  .info-content {
    position: relative;
    z-index: 2;
    max-width: 400px;
  }

  .info-content h2 {
    font-size: 2.2rem;
    margin-bottom: 2rem;
    font-weight: 700;
  }

  .benefits {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .benefit-icon {
    font-size: 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  .benefit-text h4 {
    margin-bottom: 0.25rem;
    font-weight: 600;
  }

  .benefit-text p {
    opacity: 0.8;
    font-size: 0.9rem;
  }

  .testimonial {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 12px;
    font-style: italic;
  }

  .testimonial p {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .testimonial-author {
    font-weight: 600;
    font-style: normal;
    opacity: 0.8;
  }

  .success-message {
    text-align: center;
    padding: 2rem 1rem;
  }

  .success-icon {
    width: 4rem;
    height: 4rem;
    background: var(--green-100);
    color: var(--green-700);
    font-size: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }

  .success-message h3 {
    margin-bottom: 1rem;
    color: var(--grey-900);
  }

  .success-message p {
    color: var(--grey-600);
    margin-bottom: 1.5rem;
  }

  @media (max-width: 992px) {
    .register-container {
      flex-direction: column;
      max-width: 500px;
    }

    .info-side {
      display: none;
    }

    .form-side {
      padding: 2rem;
    }
  }

  @media (max-width: 576px) {
    padding: 0;

    .register-container {
      box-shadow: none;
      border-radius: 0;
    }
  }
`

export default Register
