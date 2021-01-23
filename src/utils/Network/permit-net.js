import axios from 'axios'
//import moment from 'moment'

import { url } from '../../Variables'

export async function getPersonnel() {
    const res = await axios.get(`${url}/api/people/personnel`)
    return res.data
}

export async function addPermitRequest(permitObj){
    console.log(permitObj)
    const res = await axios.post(`${url}/api/people/personnel/permit`, permitObj)
                           .then(res => {
                               console.log(res.data)
                           })
}