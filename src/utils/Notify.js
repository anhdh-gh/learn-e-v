import { toast } from "react-toastify"

const Notify = {
    error: message => {
        toast.dismiss() // All the displayed toasts will be removed
        const id = toast.error(message)
        return id
    },

    warn: message => {
        toast.dismiss()
        const id = toast.warn(message)
        return id
    },

    info: message => {
        toast.dismiss()
        const id = toast.info(message)
        return id
    },    

    success: message => {
        toast.dismiss()
        const id = toast.success(message)
        return id
    },    

    loading: message => {
        toast.dismiss()
        const id = toast.loading(message)
        return id
    },

    update: (id, message) => {
        toast.update(id, {render: message})
    }
}

export default Notify