import React from "react";
import { Link } from "react-router-dom";

// components
import PostForm from "../PostForm";

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark">
        <Link className="navbar-brand" to="/">
          Tellie Test
        </Link>
        <PostForm />
      </nav>
    );
  }
}
