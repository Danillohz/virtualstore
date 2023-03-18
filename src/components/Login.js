import React, { useState } from 'react';

export default function Login(props) {

  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")


  const handleEmailChange = (event) => { // Função que será chamada toda vez que o usuário digitar algo no campo de e-mail
    setEmailValue(event.target.value);
  }
  const handlePasswordChange = (event) => { // Função que será chamada toda vez que o usuário digitar algo no campo de e-mail
    setPasswordValue(event.target.value);
  }

  const loginSubmit = () => {
    if (emailValue === ("sdasds")) {// Senha encontrada, prossegue com o login
      window.alert("parabens")
    } else {//Caso a senha não seja encontrada, exibe uma mensagem de erro
      window.alert("Email ou Senha incorreta")
    }


    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
    
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={emailValue}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={passwordValue}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={loginSubmit}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="kkk">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }


}
