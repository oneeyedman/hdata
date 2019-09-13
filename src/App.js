import React from 'react';

import './App.css';

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getNRandomNumbers(total, max) {
  let result = '';
  for (let i=0; i<total; i++) {
    result += getRandomNumber(max);
  }
  return result;
}

function getMyElement(originalArr, newArr, i) {
  const el = originalArr[i];
  if (newArr.includes(el)) {
    return 'god';
  } else {
    return el;
  }
}

function getBankAccount(countryCode) {
  let result = [];
  result[0] = `${countryCode}${getNRandomNumbers(2,10)}`;
  for (let i=1; i<6; i++) {
    result[i] = getNRandomNumbers(4,10);
  }
  return result.join(' ');
  
}

function getPswd(str) {
  const pass = ['123456', 'password', 'contraseña', '123', '0000', 'aaaa'];
  let finalPass = [str];
  for (let i = 1; i<3; i++) {
    const index = getRandomNumber(6);
    const newPass = getMyElement(pass, finalPass, index);
    finalPass.push(newPass);
  }
  return finalPass;
}

function getEmail(str) {
  const mails = ['gmail.com', 'gmail.com', 'aol.com', 'telefonica.es', 'hotmail.com'];
  const index = getRandomNumber(mails.length);
  const splitMail = str.split('@');
  let newMail = splitMail[0];
  newMail += '@' + mails[index];
  return newMail;

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "Sat Sep 07 2019 23:59:59 GMT-0300",
      data: []
    };
  }

  componentDidMount() {
    const MAINENDPOINT = 'https://randomuser.me/api/?results=100&nat=gb,us,es&format=json';
    fetch(MAINENDPOINT)
      .then(r=>r.json())
      .then(result => {
        this.setState({
          data: result.results
        });
      });
  }

  render() {
    let json = `{
    "date": "${this.state.date}",
    "data": [
      `;
    for (let i=0; i<this.state.data.length; i++) {
      const item = this.state.data[i];
      const {first, last} = item.name;
      const {email, login, nat} = item;
      const fullName = first + ' ' + last;
      json += `{
        "name": "${fullName}",
        "email": "${getEmail(email)}",
        "pswd": ["${getPswd(login.password).join('","')}"],
        "bank": {
          "account": "${getBankAccount(nat)}",
          "pin": "${getNRandomNumbers(4,10)}"
        }
      },`;
    }

    json += `
    ]
}`;
    return (
      <div className="app">
        <code>
          <pre>
            {json}
          </pre>
        </code>
      </div>
    );
  }
}

export default App;
