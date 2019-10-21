import React from "react";

import User from '../UserComponent';
import Footer from "./Footer";
const Home = (props) => {
  return(<div>
    {/* <div className="container-fluid" style={{ backgroundRepeat: "no-repeat", minHeight: "80vh", textAlign: "center", backgroundImage: 'url("https://images.unsplash.com/photo-1534297169727-a78dc2d3dea4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1078&q=80")' }}>
      <h1 style={{ fontFamily: "font-family: 'Ubuntu', cursive, sans-serif" }}>Welcome To Daily-Page</h1>
    </div> */}
    <div>
      <User/>
    </div>
  </div>
  );
};

export default Home;