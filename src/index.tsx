import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import PostList from "./components/PostList";
import { initializeApp } from "firebase/app";
import LoginPage from "./components/LoginPage";
import "./styles/index.scss";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";

const firebaseConfig = {
	apiKey: "AIzaSyB436ppWgG3adw6aef8zv1fo34UT2uOtJ0",
	authDomain: "peaceteddie-blog.firebaseapp.com",
	projectId: "peaceteddie-blog",
	storageBucket: "peaceteddie-blog.appspot.com",
	messagingSenderId: "182602569646",
	appId: "1:182602569646:web:02acaf4f4935c651125a3f",
};

const app = initializeApp(firebaseConfig);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<App />}
		>
			<Route
				index
				element={<Home />}
			/>
			,
			<Route
				path={"create"}
				element={<CreatePost />}
			/>
			<Route
				path={"posts"}
				element={<PostList />}
			/>
			<Route
				path={"login"}
				element={<LoginPage />}
			/>
		</Route>
	)
);

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<ColorModeScript />
		<RouterProvider router={router} />
	</React.StrictMode>
);
