import {NotificationManager} from 'react-notifications';
 
const createNotification = (type, message, title = '', timeout = 7000, callback = () => { }) => {
    switch (type) {
        case 'info':
            NotificationManager.info(message, title, timeout, callback);
            break;
        case 'success':
            NotificationManager.success(message, title, timeout, callback);
            break;
        case 'warning':
            NotificationManager.warning(message, title, timeout, callback);
            break;
        case 'error':
            NotificationManager.error(message, title, timeout, callback);
            break;
    }
};
 
export default createNotification;