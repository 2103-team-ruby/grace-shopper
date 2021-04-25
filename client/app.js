import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./routes";

const App = () => {
	return (
		<div>
			<Navbar />
			<Routes />
		</div>
	);
};

export default App;
