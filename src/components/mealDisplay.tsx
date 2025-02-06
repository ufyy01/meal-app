"use client";
import React from "react";
import MealCard from "./mealCard";
import { useFetchData } from "@/hooks/useFetch";
import Loader from "./loader";

export interface Meal {
	strMeal: string;
	strMealThumb: string;
	idMeal: string;
}

interface MealList {
	meals: Meal[];
}

const MealDisplay = ({ category }: { category: string }) => {
	const { data, error, isPending } = useFetchData<MealList>(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
	);
	return (
		<div className="mt-4 overflow-hidden ms-2">
			{error && <div>{error}</div>}
			{isPending && <Loader />}
			{data && (
				<div className="d-flex flex-wrap gap-2">
					{data.meals.map((meal) => (
						<MealCard key={meal.idMeal} data={meal} />
					))}
				</div>
			)}
			{data === null && <div>No meals found for this category.</div>}
		</div>
	);
};

export default MealDisplay;
