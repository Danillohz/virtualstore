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
    if (emailValue === "ceo@gmail.com" && passwordValue === "123") {// Senha encontrada, prossegue com o login
      window.alert("parabens")
    }
    else if (emailValue ==="client@gmail.com" && passwordValue === "321"){
      window.alert("parabens1")
    }
     else {//Caso a senha não seja encontrada, exibe uma mensagem de erro
      window.alert("Email ou Senha incorreta")
    }
  }

  const ceoEmailPassword = () =>{ //completa o email e a senha com a de um ceo
    setEmailValue("ceo@gmail.com")
    setPasswordValue("123")
  }
  const clientEmailPassword = () =>{ //completa o email e a senha com a de um cliente
    setEmailValue("client@gmail.com")
    setPasswordValue("321")
  }
  

    return (
      <div className="Login-form-container">
        <form className="Login-form">
          <div className="Login-form-content">
            <h3 className="Login-form-title">Sign In</h3>
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
            <p className="forgot-password text-right mt-2">
              Forgot <a href="kkk">password?</a>
            </p>
            <div className=" d-md-flex justify-content-md-end ">
              <button className="btn btn-info" type="button" onClick={ceoEmailPassword}>CEO</button>
              <button className="btn btn-info mx-2" type="button" onClick={clientEmailPassword}>Client</button>
            </div>

          </div>
        </form>
      </div>
    )
  
}