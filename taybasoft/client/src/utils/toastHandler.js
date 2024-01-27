import { toast } from "react-toastify"
export const toastHandler = (response, type) => {
  if (type === "success") {
    const msg = response.msg || response.status
    if (msg) {
      toast.success(msg)
    }
  } else {
    //const error = response?.data?.errors.map((err) => toast.error(err.message))
    if (response.data.errors) {
      response?.data?.errors.map((err) => toast.error(err.message))
    } else {
      toast.error(response.message)
    }
  }
}
