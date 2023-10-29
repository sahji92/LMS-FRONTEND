export const setSession=(name,data)=>{
sessionStorage.setItem(name,data)
if(sessionStorage.getItem(name)) return true
return false
}

export const getSession=(name)=>{
    return sessionStorage.getItem(name)
}