// HomePage.jsx
"use client";
import React, { useState } from "react";
import Candidates from "./components/candidates";
import Grid from "./components/grid";

function HomePage() {
	const [people, setPeople] = useState([]);

	return (
		<div className="flex min-h-screen bg-gray-100 p-6">
			{/* Left Section (Candidates) */}
			<div className="w-1/3 bg-white p-4 rounded-lg shadow-lg h-full overflow-y-auto">
				<Candidates people={people} setPeople={setPeople} />
			</div>

			{/* Right Section (Grid) */}
			<div className="w-2/3 ml-6 bg-white p-6 rounded-lg shadow-lg">
				<Grid people={people} />
			</div>
		</div>
	);
}

export default HomePage;
