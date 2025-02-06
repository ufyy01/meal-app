"use client";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Meal } from "./mealDisplay";
import ModalMenu from "./modal";
const MealCard = ({ data }: { data: Meal }) => {
	const [show, setShow] = useState(false);
	const [active, setActive] = useState<string | null>(null);

	const handleClose = () => setShow(false);

	const handleShow = (id: string) => {
		setShow(true);
		setActive(id);
	};
	return (
		<>
			<Card className="card bg-transparent">
				<div className="d-flex justify-content-center p-2 mt-2">
					<Card.Img
						variant="top"
						src={data.strMealThumb}
						className="rounded-pill w-50 shadow-md"
					/>
				</div>
				<Card.Body
					className="position-relative"
					style={{ color: "var(--foreground)" }}>
					<Card.Title className="fw-bolder" style={{ fontSize: "16px" }}>
						{data.strMeal}
					</Card.Title>
					<Card.Text style={{ fontSize: "13px" }}>
						Succulent {data.strMeal} for your enjoyment
					</Card.Text>
					<div
						className="d-flex justify-content-between align-items-center position-absolute w-100 px-3 fw-semibold"
						style={{ left: 0, bottom: 5, fontSize: "14px" }}>
						From ₦3,500
						<Button
							className="text-success bg-success-subtle rounded-pill border-0 btn-sm"
							style={{ fontSize: "14px" }}
							onClick={() => handleShow(data.idMeal)}>
							Select
						</Button>
					</div>
				</Card.Body>
			</Card>

			{active && (
				<ModalMenu show={show} handleClose={handleClose} id={active} />
			)}
		</>
	);
};

export default MealCard;
