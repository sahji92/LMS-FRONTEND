import axios from "axios";
const apiConnection = async(endpoint, method,payload=null,headersObject={}) => {
  return await axios({
    method:method,
    url:`http://127.0.0.1:8000${endpoint}`,
    headers: {
      ...headersObject
    },
    data:{
      ...payload
    }
  })
  .then(res=>res.data)
  .catch(err=>err)
}
export default apiConnection 