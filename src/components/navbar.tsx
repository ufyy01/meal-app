"use client";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Icon } from "@iconify/react";
import CartModal from "./cartModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navigationbar = () => {
	const [show, setShow] = useState(false);
	const [totalQty, setTotalQty] = useState<number>(0);

	const handleClose = () => setShow(false);
	const cartItems = useSelector((state: RootState) => state.cart.items);

	useEffect(() => {
		setTotalQty(cartItems.reduce((acc, curr) => acc + curr.quantity, 0));
	}, [cartItems]);
	return (
		<>
			<Navbar expand="lg" className="py-1 shadow-sm">
				<Container fluid="lg">
					<Navbar.Brand href="#home" className="text-danger">
						Pizza Jungle
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto " style={{ fontSize: "18px" }}>
							<Nav.Link href="#home">Order Now</Nav.Link>
							<Nav.Link href="#link">Locations</Nav.Link>
							<Nav.Link href="#link">About</Nav.Link>
							<Nav.Link href="#link">Contact</Nav.Link>
						</Nav>
						<Nav className="ms-md-3 " style={{ fontSize: "18px" }}>
							<Nav.Link
								href="#link"
								className="text-success bg-success-subtle rounded-1">
								Login
							</Nav.Link>
							<Nav.Link
								href="#link"
								className="bg-success text-white mx-md-2 rounded-1 my-1 my-md-0">
								Signup
							</Nav.Link>
							<Nav.Link
								className="text-white rounded-1 position-relative"
								onClick={() => setShow(true)}
								style={{ backgroundColor: "orange" }}>
								<Icon icon="tdesign:cart-filled" width="20" height="20" />
								{totalQty > 0 && (
									<div
										className=" px-2 rounded-pill bg-danger text-white position-absolute"
										style={{ fontSize: "13px", top: -5, right: -5 }}>
										{totalQty}
									</div>
								)}
							</Nav.Link>
							<Nav.Link href="#link" className="ms-md-2">
								<Icon icon="line-md:bell" width="30" height="30" />
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<CartModal show={show} handleClose={handleClose} />
		</>
	);
};

export default Navigationbar;
