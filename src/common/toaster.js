import {toast} from 'react-toastify';

export const displaySuccess =msg=>{
    toast.success(msg)
}

export const displayError = err=>{
    toast.error(err)
}

export const displayWarning = warn =>{
    toast.warn(warn)
}

export const displayInfo = info=>{
    toast.info(info)
}