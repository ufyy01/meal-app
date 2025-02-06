"use client";
import { useFetchData } from "@/hooks/useFetch";
import Image from "next/image";
import React, { useRef, useState } from "react";
import MealDisplay from "./mealDisplay";
import Loader from "./loader";

interface Data {
	categories: {
		idCategory: string;
		strCategory: string;
		strCategoryThumb: string;
	}[];
}
const CategoryBar = () => {
	const { data, error, isPending } = useFetchData<Data>(
		"https://www.themealdb.com/api/json/v1/1/categories.php"
	);

	const scrollRef = useRef<HTMLDivElement>(null);
	const isDown = useRef<boolean>(false);
	const startX = useRef<number>(0);
	const scrollLeft = useRef<number>(0);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!scrollRef.current) return;
		isDown.current = true;
		if (scrollRef.current) {
		}
		scrollRef.current.classList.add("active");
		startX.current = e.pageX - scrollRef.current.offsetLeft;
		scrollLeft.current = scrollRef.current.scrollLeft;
	};

	const handleMouseLeave = () => {
		if (!scrollRef.current) return;
		isDown.current = false;
		scrollRef.current.classList.remove("active");
	};

	const handleMouseUp = () => {
		if (!scrollRef.current) return;
		isDown.current = false;
		scrollRef.current.classList.remove("active");
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!isDown.current || !scrollRef.current) return;
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX.current) * 2;
		scrollRef.current.scrollLeft = scrollLeft.current - walk;
	};

	const [isActive, setIsActive] = useState<number>(0);
	return (
		<div className="py-2">
			<div>
				{error && <div>{error}</div>}
				{isPending && <Loader />}
				{data && (
					<div>
						<div
							className="d-flex gap-2 hide-scrollbar ps-3 pb-2 shadow-sm "
							ref={scrollRef}
							onMouseDown={handleMouseDown}
							onMouseLeave={handleMouseLeave}
							onMouseUp={handleMouseUp}
							onMouseMove={handleMouseMove}>
							{data?.categories?.map((category, index: number) => (
								<div
									key={index}
									onClick={() => setIsActive(index)}
									className={`${
										isActive === index ? "border-success text-success" : ""
									} d-flex border rounded-pill px-3 py-1 justify-contents-center align-items-center gap-1 pointer`}>
									<Image
										src={category.strCategoryThumb}
										alt="image"
										width={30}
										height={30}
										priority
										className={isActive === index ? "" : "image-filter"}
									/>

									{category.strCategory}
								</div>
							))}
						</div>
						<MealDisplay category={data.categories[isActive].strCategory} />
					</div>
				)}
			</div>
		</div>
	);
};

export default CategoryBar;
