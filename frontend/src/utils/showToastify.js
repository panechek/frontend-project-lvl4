import { toast } from 'react-toastify';

export default (text, sign) => (sign ? toast.success(text) : toast.error(text));
