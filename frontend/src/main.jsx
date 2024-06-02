import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css'
import Homepage from './pages/Homepage.jsx';
import Signin from './pages/Signin.jsx';
import Register from './pages/Register.jsx';
import Preference from './pages/Preference.jsx';
import Nature from "./pages/Nature.jsx"
import City from './pages/City.jsx';
import Detail from './pages/Detail.jsx';
import Favorite from './pages/Favorite.jsx';
import Profile from './pages/Profile.jsx';

const theme = createTheme([
	{
		typography: {
			fontFamily: [
				'Nunito Sans',
				'sans-serif',
			].join(','),
		},
	}
])

const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/signin',
		element: <Signin />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/nature',
		element: <Nature />,
	},
	{
		path: '/city',
		element: <City />,
	},
	{
		path: '/detail/:Id',
		element: <Detail />,
	},
	{
		path: '/favorite',
		element: <Favorite/>,
	},
	{
		path: '/profile',
		element: <Profile/>,
	},
	{
		path: '/preference',
		element: <Preference/>
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<ThemeProvider theme={theme}>
		<RouterProvider router={router}>
		</RouterProvider>
	</ThemeProvider>
)
