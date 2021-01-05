import axios from 'axios'
//import moment from 'moment'

import { url } from '../../Variables'

export function getPersonnel() {
    axios.get(`${url}/api/people/personnel`)
        .then(res => {
            console.log(res.data)
        })
}