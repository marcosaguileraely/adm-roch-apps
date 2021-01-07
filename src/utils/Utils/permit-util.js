
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