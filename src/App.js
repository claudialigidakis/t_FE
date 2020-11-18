import { Route, Switch } from "react-router-dom";

// styling
import "./App.scss";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostCards from "./components/PostCards";
import Post from "./components/Post";

function App() {
  return (
    <div role="main" className="page">
      <Header />
      <Switch>
        <Route path="/" component={PostCards} exact />
        <Route path="/post/:id" component={Post} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
