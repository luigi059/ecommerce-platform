import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './index.css';
import AdminRoutes from './pages/Admin/AdminRoutes.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';
import ProductsAdmin from './pages/Admin/ProductsAdmin.jsx';
import UpdateProduct from './pages/Admin/UpdateProduct.jsx';
import UserList from './pages/Admin/UserList.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';
import Likes from './pages/Products/Likes.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';
import UpdateProfile from './pages/User/UpdateProfile.jsx';
import store from './redux/store.js';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<PrivateRoute />}>
				<Route path="/profile" element={<UpdateProfile />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route index={true} path="/" element={<Home />} />
			<Route path="/favourites" element={<Likes />} />
			<Route path="/product/:id" element={<ProductDetails />} />
			<Route path="/cart" element={<Cart />} />
			<Route path="/admin" element={<AdminRoutes />}>
				<Route path="userlist" element={<UserList />} />
				<Route path="categorylist" element={<CategoryList />} />
				<Route path="products" element={<ProductsAdmin />} />
				<Route path="product/update/:_id" element={<UpdateProduct />} />
				<Route path="createproduct" element={<CreateProduct />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
