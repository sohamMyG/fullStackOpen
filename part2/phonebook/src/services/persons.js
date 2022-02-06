import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(r=>r.data)
}

const create = (newNum) => {
    return(
    axios
        .post(baseUrl,newNum)
        .then(response => response.data)
    )
}

const update = (id,newNum) => {
    const request = axios.put(`${baseUrl}/${id}`, newNum)
    return request.then(response => response.data)
}

const deleteNum = (id) => {
    console.log({id})
    axios
        .delete(`${baseUrl}/${id}`)
        .then(()=>{console.log("deleted")})
}

const personService = {getAll,create,update,deleteNum}
export default personService