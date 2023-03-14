import { toast } from 'react-toastify';
const ALERT_EXPIRATION_PERIOD = 4000;

export const alertSuccess = (setAlert: any,message: any,status: any)=> {
    setAlert({show: true, class: "success", message: message+" sucessfully",status:status});
}


export const alertFailer = (setAlert: any, message: any, status: any)=> {
    setAlert({show: true, class: "error", message: message,status:status});
}

export const alertWarning = (setAlert: any, message: any, status: any)=> {
    setAlert({show: true, class: "warn", message: message,status:status});
}

export const alertInfo = (setAlert: any, message: any, status: any)=> {
  setAlert({show: true, class: "info", message: message,status:status});
}


export const notifySuccess = (successMess: any) => toast.success(successMess, {position: toast.POSITION.TOP_RIGHT, autoClose: ALERT_EXPIRATION_PERIOD, theme: "colored"});
export const notifyError = (successMess: any) => toast.error(successMess, {position: toast.POSITION.TOP_RIGHT, autoClose: ALERT_EXPIRATION_PERIOD,theme: "colored"});
export const notifyWarning = (successMess: any) => toast.warn(successMess, {position: toast.POSITION.TOP_RIGHT, autoClose: ALERT_EXPIRATION_PERIOD,theme: "colored"});
export const notifyInfo = (successMess: any) => toast.info(successMess, {position: toast.POSITION.TOP_RIGHT, autoClose: ALERT_EXPIRATION_PERIOD,theme: "colored"});

export  const basic_alerts = (setLoading: any, setAlert: any)=>{
    window.setTimeout(function () {
          setLoading(false);
          setAlert({ message: "", class: "", show: false })
       }, ALERT_EXPIRATION_PERIOD);
}