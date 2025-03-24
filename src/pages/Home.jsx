import { Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import main from '../assets/Icons/main.svg'
import { useGlobalContext } from '../context'

function Home() {
  const { user } = useGlobalContext()
  return (
    <>
      {user && <Navigate to='/dashboard' />}
      <Wrapper className='page'>
        <div className='hero-content'>
          <div className='text-container'>
            <h1 className='title'>
              Organize Your Workflow with <span>Kanban</span>
            </h1>
            <p className='subtitle'>
              Visualize your projects, streamline your tasks, and boost your
              productivity with our intuitive Kanban board system.
            </p>
            <div className='cta-buttons'>
              <Link to='/login' className='btn btn-login'>
                Sign In
              </Link>
              <Link to='/register' className='btn btn-register'>
                Get Started
              </Link>
            </div>
          </div>
          <div className='image-container'>
            <img
              src={main}
              alt='Kanban board visualization'
              className='img main-img'
            />
            <div className='floating-card card-1'>
              <div className='card-header'></div>
              <div className='card-body'></div>
            </div>
            <div className='floating-card card-2'>
              <div className='card-header'></div>
              <div className='card-body'></div>
            </div>
            <div className='floating-card card-3'>
              <div className='card-header'></div>
              <div className='card-body'></div>
            </div>
          </div>
        </div>
        <div className='features'>
          <div className='feature'>
            <div className='feature-icon'>📋</div>
            <h3>Visualize Tasks</h3>
            <p>See all your projects at a glance with customizable boards</p>
          </div>
          <div className='feature'>
            <div className='feature-icon'>🔄</div>
            <h3>Track Progress</h3>
            <p>
              Move tasks through custom workflows with drag and drop simplicity
            </p>
          </div>
          <div className='feature'>
            <div className='feature-icon'>👥</div>
            <h3>Collaborate</h3>
            <p>Work together with your team in real-time</p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow-x: hidden;
  background: linear-gradient(135deg, var(--white) 0%, var(--grey-50) 100%);

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 2rem;
    min-height: 80vh;
    position: relative;
  }

  .text-container {
    text-align: center;
    max-width: 600px;
    z-index: 2;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    color: var(--grey-900);
  }

  .title span {
    color: var(--primary-500);
    position: relative;
  }

  .title span::after {
    content: '';
    position: absolute;
    height: 6px;
    width: 100%;
    background: var(--primary-200);
    bottom: 5px;
    left: 0;
    z-index: -1;
    border-radius: 4px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--grey-600);
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .btn {
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
    font-size: 1rem;
  }

  .btn-login {
    background-color: transparent;
    color: var(--primary-500);
    border: 2px solid var(--primary-500);
  }

  .btn-login:hover {
    background-color: var(--primary-50);
    transform: translateY(-3px);
  }

  .btn-register {
    background-color: var(--primary-500);
    color: white;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }

  .btn-register:hover {
    background-color: var(--primary-600);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  .image-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin-top: 2rem;
  }

  .main-img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    z-index: 1;
    position: relative;
  }

  .floating-card {
    position: absolute;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 120px;
    height: 80px;
    z-index: 2;
    overflow: hidden;
  }

  .card-header {
    height: 20%;
    background: var(--primary-300);
  }

  .card-body {
    height: 80%;
    background: white;
    position: relative;
  }

  .card-body::before,
  .card-body::after {
    content: '';
    position: absolute;
    height: 8px;
    border-radius: 4px;
    background: var(--grey-200);
    left: 10px;
    right: 10px;
  }

  .card-body::before {
    top: 15px;
  }

  .card-body::after {
    top: 35px;
    width: 60%;
  }

  .card-1 {
    top: 10%;
    left: -5%;
    transform: rotate(-10deg);
  }

  .card-2 {
    bottom: 20%;
    right: -5%;
    transform: rotate(8deg);
  }

  .card-3 {
    top: 40%;
    right: 5%;
    transform: rotate(-5deg);
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 4rem 2rem;
    background-color: white;
  }

  .feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    border-radius: 12px;
    background: white;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }

  .feature:hover {
    transform: translateY(-10px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  .feature h3 {
    margin-bottom: 1rem;
    color: var(--grey-800);
  }

  .feature p {
    color: var(--grey-600);
    line-height: 1.6;
  }

  @media (min-width: 992px) {
    .hero-content {
      flex-direction: row;
      justify-content: space-between;
      padding: 5rem;
    }

    .text-container {
      flex: 1;
      text-align: left;
      padding-right: 2rem;
    }

    .title {
      font-size: 3.5rem;
    }

    .cta-buttons {
      justify-content: flex-start;
    }

    .image-container {
      flex: 1;
      margin-top: 0;
    }

    .features {
      padding: 6rem 5rem;
    }
  }

  @media (max-width: 768px) {
    .floating-card {
      display: none;
    }

    .title {
      font-size: 2rem;
    }
  }
`

export default Home
