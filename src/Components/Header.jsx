import React, { useState, useEffect } from 'react';
import '../Styles/header.css';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import post from '../service/service';
import { useLocation } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'antiquewhite',
    border: 'solid 2px brown',
  },
};

const Header = () => {
  const location = useLocation(); // Use useLocation instead of useNavigate
  const [backgroundColor, setBackgroundColor] = useState('');
  const [display, setDisplay] = useState('none');
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const path = location.pathname; // Get pathname from location
    setAttributes(path);
  }, [location.pathname]);

  const setAttributes = (path) => {
    let bg, display;
    if (path === '/') {
      bg = '#000000';
      display = 'none';
    } else {
      bg = '#ff0000';
      display = 'inline-block';
    }
    setBackgroundColor(bg);
    setDisplay(display);
  };

  const handleLogin = () => {
    setLoginModalIsOpen(true);
  };

  const LoginModal = () => {
    var mail = document.getElementById('emailId').value;
    var password = document.getElementById('password').value;
    var req = {
      user_email: mail,
      user_password: password,
    };
    post('user/login', req).then((res) => {
      if (!res.error) {
        localStorage.setItem('token', res.data.user_token);
        setIsLoggedIn(true);
        setLoggedInUser(res.data.user_first_name + res.data.user_last_name);
        setLoginModalIsOpen(false);
      } else {
        console.log(res.message);
      }
    });
  };

  const closeModal = () => {
    setLoginModalIsOpen(false);
  };

  const handleSignup = () => {
    setSignupModalIsOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser('');
  };

  const responseGoogle = (response) => {
    // Implement your Google login logic here
  };

  const responseFacebook = (response) => {
    setIsLoggedIn(true);
    setLoggedInUser(response.name);
  };

  return (
    <div>
      <div className="redbox" style={{ backgroundColor }}>
        <div className="icon" style={{ display }}>
          e!
        </div>
        {!isLoggedIn ? (
          <div className="button1">
            <button className="login" onClick={handleLogin}>
              Log In
            </button>
            <button className="account" onClick={handleSignup}>
              Create an account
            </button>
          </div>
        ) : (
          <div className="button1">
            <button className="login">{loggedInUser}</button>
            <button className="account" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      <Modal isOpen={loginModalIsOpen} style={customStyles}>
        <div>
          <GoogleLogin
            clientId="792088046122-j7985s92v1mthrcu85jf5ceg17qa530g.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
        <br />
        <div>
          <FacebookLogin
            appId="2331378653693305"
            textButton="continue with Facebook"
            autoLoad={true}
            fields="name,email,picture"
            icon="fa-facebook"
            callback={responseFacebook}
          />
        </div>
        <div>
          <h2>Login</h2>
          <input type="text" id="emailId" placeholder="Email" />
          <br />
          <input type="password" id="password" placeholder="Password" />
          <br />
          <div>
            <button onClick={LoginModal}>Login</button>
            <button onClick={closeModal}>Cancel</button>
            <a href="#" aria-label="if you don't have account please sign-up"></a>
          </div>
        </div>
      </Modal>
      <Modal isOpen={signupModalIsOpen} style={customStyles}>
        <div>
          <h2>Sign-Up</h2>
          <input type="text" placeholder="First name" />
          <br />
          <input type="text" placeholder="Last name" />
          <br />
          <input type="text" placeholder="Email" />
          <br />
          <input type="password" placeholder="Password" />
          <br />
          <input type="password" placeholder="Re-Enter Password" />
          <div>
            <button>Sign-up</button>
            <button onClick={() => setSignupModalIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
