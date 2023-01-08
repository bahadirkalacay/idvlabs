import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage.js/HomePage";
import PrivateProtectRoute from "./components/Navbar/ProtectedRoute/PrivateProtectRoute";
import CreateProduct from "./components/Products/CreateProduct/CreateProduct";
import ProductList from "./components/Products/ProductList/ProductList";
import UpdateProduct from "./components/Products/UpdateProduct/UpdateProduct";
import AddProduct from './components/Products/AddProduct/AddProduct';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={HomePage} />
        <PrivateProtectRoute
          exact
          path="/create-product"
          component={CreateProduct}
        />
        <PrivateProtectRoute exact path="/products" component={ProductList} />
        <PrivateProtectRoute
          exact
          path="/update-product/:id"
          component={UpdateProduct}
        />
        <PrivateProtectRoute
          exact
          path="/add-product/:id"
          component={AddProduct}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
