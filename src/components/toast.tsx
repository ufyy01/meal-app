import { Icon } from "@iconify/react/dist/iconify.js";
import { Toast, ToastContainer } from "react-bootstrap";

function ToastPop() {
	return (
		<ToastContainer
			className="p-3"
			position="bottom-end"
			style={{ zIndex: 2000 }}>
			<Toast>
				<Toast.Body className="fs-6 text-center text-black">
					<Icon
						icon="line-md:check-all"
						width="35"
						height="35"
						style={{ color: "#1b9e37" }}
					/>
					Cart Updated
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
}

export default ToastPop;
