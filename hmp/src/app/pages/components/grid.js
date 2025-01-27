"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Grid({ people }) {
	const targetSkills = [
		"Creating Wireframes",
		"Creating Basic Prototypes",
		"Creation of Brands",
		"Applying Color Theory",
		"Using Figma for Design",
		"Application of Typography",
		"Creating Effective Icons",
		"Optimizing Touch Points",
		"Addressing user Pain Points",
		"Conducting user Research",
		"Applying Questioning Skills",
		"Conducting Heuristic Evaluation",
		"Gathering User feedback",
		"Conducting Usability Tests",
		"Creating user Personas",
		"Conducting Market Research",
		"Crafting Effective Questions",
		"Creating Effective Surveys",
		"Creating Sitemaps",
		"Designing user Flows",
	];

	const [processedData, setProcessedData] = useState([]);
	const [loading, setLoading] = useState(true);

	const getCellColor = (score) => {
		if (score === 0) return "#808080";
		if (score === 1) return "#FFF9C4";
		if (score === 2) return "#FFEB3B";
		if (score === 3) return "#81C784";
		if (score === 4) return "#4CAF50";
		if (score === 5) return "#388E3C";
		return "#808080";
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const allProcessedData = await Promise.all(
					people.map(async (person) => {
						try {
							const response = await axios.get(
								`https://forinterview.onrender.com/people/${person}`
							);
							const personData = response.data?.data;

							const skillData = targetSkills.reduce((acc, skill) => {
								let found = false;
								personData.data.skillset?.forEach((skillCategory) => {
									skillCategory.skills?.forEach((skillItem) => {
										if (skillItem.name.toLowerCase() === skill.toLowerCase()) {
											const consensusScore =
												skillItem.pos?.[0]?.consensus_score ?? 0;
											acc[skill] = consensusScore;
											found = true;
										}
									});
								});
								if (!found) acc[skill] = 0;
								return acc;
							}, {});

							return { ...personData, ...skillData };
						} catch (error) {
							console.error("Error fetching person data:", error);
							return null;
						}
					})
				);

				setProcessedData(allProcessedData.filter((person) => person !== null));
			} catch (error) {
				console.error("Error processing people data:", error);
			} finally {
				setLoading(false);
			}
		};

		if (people.length > 0) {
			fetchData();
		}
	}, [people]);

	return (
		<div className="w-full">
			<h1 className="text-center text-2xl font-bold mb-6">
				Skills and Consensus Scores
			</h1>

			{loading ? (
				<p className="text-center text-gray-500">Loading data...</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full table-auto border-collapse">
						<thead>
							<tr className="bg-green-600 text-white">
								<th className="px-6 py-3 text-left" style={{ width: "250px" }}>
									Skill
								</th>
								{/* Add empty columns if no people yet */}
								{processedData.length > 0
									? processedData.map((person) => (
											<th
												key={person.id}
												className="px-6 py-3"
												style={{ width: "150px" }}
											>
												{person.name ? person.name.slice(0, 3) : "N/A"}
											</th>
									  ))
									: Array(people.length)
											.fill(null)
											.map((_, index) => (
												<th
													key={index}
													className="px-6 py-3"
													style={{ width: "150px" }}
												>
													N/A
												</th>
											))}
							</tr>
						</thead>
						<tbody>
							{targetSkills.map((skill, index) => (
								<tr key={`${skill}-${index}`} className="hover:bg-gray-200">
									<td className="px-6 py-4" style={{ width: "250px" }}>
										{skill}
									</td>
									{processedData.length > 0
										? processedData.map((person, personIndex) => (
												<td
													key={`${personIndex}-${skill}`}
													className="px-6 py-4"
													style={{
														backgroundColor: getCellColor(person[skill]),
														color: person[skill] === 0 ? "black" : "white",
														width: "150px",
													}}
												>
													{person[skill]}
												</td>
										  ))
										: // Empty cells while loading
										  Array(people.length)
												.fill(null)
												.map((_, index) => (
													<td
														key={`${index}-${skill}`}
														className="px-6 py-4"
														style={{ width: "150px" }}
													></td>
												))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default Grid;
