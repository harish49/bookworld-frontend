import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Loginpage from "./components/Loginpage";
import Registerpage from "./components/Registerpage";
import ProfileUpdate from "./components/ProfileUpdate";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Placeorder from "./components/Placeorder";
const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className="py-2">
          <Route
            exact
            path="/books/defaultbooks/:id"
            component={withRouter(BookDetails)}
          />

          <Route path="/checkout" component={withRouter(Checkout)} exact />
          <Route path="/placeorder" component={withRouter(Placeorder)} exact />
          <Route path="/payment" component={withRouter(Payment)} exact />
          <Route path="/cart/:id?" component={withRouter(Cart)} exact />
          <Route path="/" component={withRouter(Home)} exact />
          <Route path="/login" component={withRouter(Loginpage)} exact />
          <Route path="/register" component={withRouter(Registerpage)} exact />
          <Route path="/profile" component={withRouter(ProfileUpdate)} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
