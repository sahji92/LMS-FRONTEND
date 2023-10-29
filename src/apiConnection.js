import axios from "axios";
const apiConnection = async(endpoint, method,payload=null) => {
  return await axios({
    method:method,
    url:`http://localhost:3000${endpoint}`,
    data:{
      ...payload
    }
  })
  .then(res=>res.data)
  .catch(err=>err)
}
export default apiConnection 