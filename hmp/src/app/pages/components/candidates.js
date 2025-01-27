// Candidates.jsx
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Candidates({ people, setPeople }) {
	const [data, setData] = useState([]);
	const [clickedIds, setClickedIds] = useState(new Set());

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(
				"https://forinterview.onrender.com/people"
			);
			if (response.data) {
				setData(response.data);
			}
		}
		fetchData();
	}, []);

	const handleButtonClick = (item) => {
		if (clickedIds.has(item.id)) {
			setPeople(people.filter((id) => id !== item.id));
			setClickedIds(
				(prev) => new Set([...prev].filter((id) => id !== item.id))
			);
		} else {
			setPeople([...people, item.id]);
			setClickedIds((prev) => new Set([...prev, item.id]));
		}
	};

	return (
		<div className="space-y-4">
			{data.map((item) => {
				const isAdded = clickedIds.has(item.id);
				return (
					<div
						key={item.id}
						className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
					>
						<span className="text-lg font-semibold text-gray-800">
							{item.name}
						</span>
						<button
							onClick={() => handleButtonClick(item)}
							className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
								isAdded
									? "bg-red-500 hover:bg-red-600"
									: "bg-green-500 hover:bg-green-600"
							}`}
						>
							{isAdded ? "Remove" : "+"}
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default Candidates;
