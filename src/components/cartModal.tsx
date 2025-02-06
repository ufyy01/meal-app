"use client";

import { changeQuantity } from "@/store/cartSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const CartModal = ({
	show,
	handleClose,
}: {
	show: boolean;
	handleClose: () => void;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const cartItems = useSelector((state: RootState) => state.cart.items);

	const handleIncrement = (id: string) => {
		dispatch(changeQuantity({ id, delta: 1 }));
	};

	const handleDecrement = (id: string) => {
		dispatch(changeQuantity({ id, delta: -1 }));
	};

	return (
		<Modal show={show} onHide={handleClose} size="sm">
			<Modal.Body style={{ padding: 0 }} className="position-absolute cartPos">
				<div className="rounded-2 bg-white position-relative text-black text-muted">
					<div>
						<div>
							<p
								className="fw-bold shadow-sm ps-3 py-2"
								style={{ fontSize: "16px" }}>
								Cart
							</p>
							{cartItems.map((item) => (
								<div
									key={item.id}
									className="mx-3 border border-success-subtle p-2 rounded-1 position-relative mb-2"
									style={{ height: "8rem" }}>
									<p className="fw-bold mb-1" style={{ fontSize: "14px" }}>
										{item.name}
									</p>
									<p style={{ fontSize: "13px" }} className="mb-1">
										Succulent {item.name} for your enjoyment
									</p>
									<div
										className="d-flex justify-content-between align-items-center mt-1 mb-0 position-absolute w-100 px-2"
										style={{ left: 0, bottom: 5, fontSize: "17px" }}>
										<p className="mb-1 text-success">
											₦ {item.price * item.quantity}
										</p>
										<div style={{ display: "flex", alignItems: "center" }}>
											<button
												onClick={() => handleDecrement(item.id)}
												className="rounded-pill px-2 border-0 bg-success-subtle ">
												-
											</button>
											<span style={{ margin: "0 8px" }}>{item.quantity}</span>
											<button
												onClick={() => handleIncrement(item.id)}
												className="rounded-pill px-2 border-0 bg-success-subtle ">
												+
											</button>
										</div>
									</div>
								</div>
							))}
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
					{cartItems.length > 0 && (
						<div className="d-flex bg-success-subtle py-2 justify-content-between px-3 align-items-center">
							<Button
								className="btn-sm rounded-pill bg-white border-0 text-black"
								style={{ fontSize: "14px" }}>
								View Cart
							</Button>
							<Button
								className="btn-sm rounded-pill border-0 bg-success shadow-sm"
								style={{ fontSize: "14px" }}>
								Checkout
								<Icon
									icon="mynaui:arrow-right-solid"
									width="25"
									height="25"
									style={{ color: "#fff" }}
								/>
							</Button>
						</div>
					)}
					{cartItems.length === 0 && (
						<div className=" px-2 text-center">
							<Icon
								icon="mingcute:empty-box-line"
								width="40"
								height="40"
								style={{ color: "#51cd64" }}
							/>
							<p className="fs-6 text-muted">No items in the cart.</p>
						</div>
					)}
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default CartModal;
