import {
  ToastContainer,
  toast,
  TypeOptions,
  ToastContent,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Alert = (content: ToastContent, type: TypeOptions) => {
  return toast(content, {
    type,
    theme: "colored",
  });
};

export const AlertModel = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
