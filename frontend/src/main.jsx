import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import store from './redux/store.js';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
