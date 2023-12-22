import axios from "axios";
const apiConnection = async(endpoint, method,payload=null) => {
  return await axios({
    method:method,
    url:`http://127.0.0.1:3000${endpoint}`,
    withCredentials: true,
    data:{
      ...payload
    }
  })
  .then(res=>res.data)
  .catch(err=>err)
}
export default apiConnection 