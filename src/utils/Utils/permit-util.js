import moment from 'moment'


export function nameList(data){
    
    const concatNameList = data.map( item => {
        var newObj = {}
        newObj.x = `${item.FirstName} ${item.LastName}`
        item.value = newObj.x
        return item
    })

    return concatNameList.map( ({ContractType, CostCenter, DateofBirth, FirstName,
                                 Gender,
                                 ID_From,
                                 ID_Number,
                                 ID_Type,
                                 LastName,
                                 Manager,
                                 MiddleName,
                                 Phone,
                                 Section,
                                 Status,
                                 age,
                                 id,
                                 jobposition,
                                 modId,
                                 personnel_id_mach_field, ...rest }) => rest )
}

export function permitDuration(dateArr){
    var startDate = moment(dateArr[0], 'YYYY-MM-DD HH:mm:ss.SS Z')
    var endDate = moment(dateArr[1], 'YYYY-MM-DD HH:mm:ss.SS Z')
    console.log(`${startDate}`)
    console.log(`${endDate}`)
    
    //var duration = moment.duration(startDate.diff(endDate)).asSeconds()
    var hoursDuration = moment.duration(endDate.diff(startDate)).asHours()
    var daysDuration = moment.duration(endDate.diff(startDate)).asDays()
    console.log(`Hours: ${hoursDuration}`)
    console.log(`Days: ${daysDuration}`)
}