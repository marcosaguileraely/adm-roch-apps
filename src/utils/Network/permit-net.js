import axios from 'axios'
//import moment from 'moment'

import { url } from '../../Variables'

export async function getPersonnel() {
    const res = await axios.get(`${url}/api/people/personnel`)
    return res.data
}