import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});


instance.interceptors.response.use(null, data => {
  console.log(data.response.status)
  if (data.response.status === 401) {
    window.location.href = '/'
  }
  return data
})

export default instance;