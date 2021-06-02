import React, { useState } from "react";
import ReactDOM from "react-dom";
import FacebookLogin from "react-facebook-login";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (res) => {
    setData(res);
    setPicture(res.picture.data.url);
    if (res.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div className="container">
      <Card style={{ width: "800px" }} className="mx-auto mt-5">
        <Card.Header className="pb-4">
          <h1>My React App</h1>
        </Card.Header>
        <Card.Body>
          {!login && (
            <React.Fragment>
              <Card.Text>Please login using one of the following</Card.Text>
              {/*Login form*/}
              <LoginForm />
              {/*FB login button*/}
              <FacebookLogin
                appId="479693013337796"
                autoLoud={false}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            </React.Fragment>
          )}
          {login && <Home fbpic={picture} fbdata={data} />}
        </Card.Body>
      </Card>
    </div>
  );
}

function LoginForm() {
  return (
    <form action="" className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <input type="text" name="name" placeholder="yourname" />
      <label classname="m-2">Email:</label>
      <input type="email" name="email" placeholder="youremail" />
      <input
        type="submit"
        value="login"
        className="btn bg-success text-white my-3"
      />
    </form>
  );
}

function Home({ fbpic, fbdata }) {
  return (
    <React.Fragment>
      <img src={fbpic} alt={fbdata.name} />
      <h3 className="d-inline text-success mx-2">
        Welcome back {fbdata.name}!
      </h3>
      <p className="my-5">This is the home page of the app.</p>
    </React.Fragment>
  );
}

export default App;
