import { toast } from "react-toastify";

export function success(msj) {
    toast.success(msj, {
        position: toast.POSITION.TOP_CENTER,
    });
}

export function error(msj) {
    toast.error(msj, {
        position: toast.POSITION.TOP_CENTER,
    });
}
