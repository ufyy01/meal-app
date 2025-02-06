"use client";
import { useFetchData } from "@/hooks/useFetch";
import { addToCart } from "@/store/cartSlice";
import { AppDispatch } from "@/store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ToastPop from "./toast";
import { useState } from "react";

interface Meals {
	meals: {
		strMeal: string;
		strMealThumb: string;
		strArea: string;
		strCategory: string;
		strInstructions: string;
		strIngredient1: string;
		strIngredient2: string;
		strIngredient3: string;
		strIngredient4: string;
		strIngredient5: string;
		strIngredient6: string;
		strIngredient7: string;
		strIngredient8: string;
		strIngredient9: string;
	}[];
}

const ModalMenu = ({
	show,
	handleClose,
	id,
}: {
	show: boolean;
	handleClose: () => void;
	id: string;
}) => {
	const { data } = useFetchData<Meals>(
		`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
	);

	const ingredients = [
		data?.meals[0].strIngredient1,
		data?.meals[0].strIngredient2,
		data?.meals[0].strIngredient3,
		data?.meals[0].strIngredient4,
		data?.meals[0].strIngredient5,
		data?.meals[0].strIngredient6,
		data?.meals[0].strIngredient7,
		data?.meals[0].strIngredient8,
		data?.meals[0].strIngredient9,
	];

	const [toastShow, setToastShow] = useState(false);

	const dispatch = useDispatch<AppDispatch>();
	const handleAdd = () => {
		dispatch(
			addToCart({
				id: `${id}`,
				name: `${data?.meals[0].strMeal}`,
				price: 3500,
				quantity: 1,
			})
		);
		setToastShow(!toastShow);
		setTimeout(() => setToastShow(false), 1000);
	};

	return (
		<>
			{data && (
				<Modal show={show} onHide={handleClose} size="lg">
					<Modal.Body style={{ padding: 0 }}>
						<div className=" d-lg-flex rounded-2 bg-white position-relative text-black text-muted">
							<div
								className="rounded-start"
								style={{
									backgroundColor: "#f4f4f4",
									padding: "20px",
								}}>
								<div className="bg-white p-2 d-flex justify-content-center  rounded-1 shadow-sm">
									<Image
										src={data.meals[0].strMealThumb}
										alt="image"
										width={150}
										height={150}
										priority
										className="rounded-pill"
									/>
								</div>
								<div>
									<h5
										className="fw-semibold"
										style={{ fontSize: "16px", marginTop: "20px" }}>
										{data.meals[0].strMeal}
									</h5>
									<p style={{ fontSize: "14px" }}>
										Succulent {data.meals[0].strMeal} for your enjoyment
									</p>
								</div>
							</div>
							<div className=" ">
								<div className="d-md-flex gap-2 mt-3 ms-1 ms-md-3 ">
									<div
										className="d-flex bg-success-subtle rounded-pill py-1 px-2 gap-1 align-items-center w-auto mb-2 mb-md-0 mx-3 mx-md-0"
										style={{ fontSize: "15px" }}>
										<div className="rounded-pill bg-white px-3 border border-success">
											Category
										</div>
										<div>{data.meals[0].strCategory}</div>
									</div>
									<div
										className="d-flex bg-success-subtle rounded-pill py-1 px-2 gap-1 align-items-center w-auto mx-3 mx-md-0"
										style={{ fontSize: "15px" }}>
										<div className="rounded-pill bg-white px-3 border border-success">
											Area
										</div>
										<div>{data.meals[0].strArea}</div>
									</div>
								</div>

								<div
									style={{
										fontSize: "14px",
										lineHeight: "1.5",
										padding: "20px",
									}}>
									<p className="text-muted mb-2">Instructions:</p>
									<p className="clamp3Lines">{data.meals[0].strInstructions}</p>
									<p className="fw-semibold">Key Ingredients:</p>
									<div className="d-flex flex-wrap gap-1 mb-2 ">
										{ingredients.map((ingredient, index) => (
											<div key={index}>
												{ingredient && (
													<div
														className="d-flex bg-success-subtle rounded-pill py-1 px-2 align-items-center w-auto"
														style={{ fontSize: "14px" }}>
														{ingredient}
													</div>
												)}
											</div>
										))}
									</div>
									<div>
										<div
											className="d-flex bg-success-subtle rounded-pill py-1 px-2 justify-content-between align-items-center cartBtn mt-3"
											style={{ fontSize: "20px" }}>
											<div className="fw-bold"> ₦ 3,500</div>

											<Button
												className="rounded-pill border-0 px-3 bg-success shadow-sm"
												style={{ fontSize: "16px" }}
												onClick={handleAdd}>
												Add to Cart
												<Icon
													icon="tdesign:cart-filled"
													width="20"
													height="20"
													className="ms-2"
												/>
											</Button>
										</div>
									</div>
								</div>
								<div className="position-absolute" style={{ top: 0, right: 7 }}>
									<Button
										onClick={handleClose}
										className="btn-sm bg-transparent border-0 ">
										<Icon
											icon="hugeicons:cancel-01"
											width="20"
											height="20"
											style={{ color: "#f50404" }}
										/>
									</Button>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
			{toastShow && <ToastPop />}
		</>
	);
};

export default ModalMenu;
