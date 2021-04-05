import { useEffect, useState } from 'react';
import { Input, Select, Radio, Space, DatePicker, Checkbox, Button, AutoComplete } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import './form.css'

const net = require('../../../utils/Network/permit-net')
const util = require('../../../utils/Utils/permit-util')

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const optionsWithDisabled = [
    { label: 'Permiso', value: 'Permiso' },
    { label: 'Licencia', value: 'Licencia' },
    { label: 'Incapacidad', value: 'Incapacidad' },
];

const optionsWhoReplace = [
    { label: 'Empleado', value: 'Empleado' },
    { label: 'Externo', value: 'Externo' }
];

const Form = () => {

    const DOMElement = document.querySelectorAll('input');

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dniType, setDniType] = useState('')
    const [dni, setDni] = useState('')
    const [permitType, setPermitType] = useState('')
    const [position, setPosition] = useState('')
    const [date, setDate] = useState([])
    const [replaceType, setReplaceType] = useState('Empleado')
    const [coworker, setCoworker] = useState('')
    const [externalWorker, setExternalWorker] = useState('')
    const [reason, setReason] = useState('')
    const [isAgreeDisable, setAgreeDisable] = useState(true)

    const [personnelList, setPersonnelList] = useState([])
    const [personnelItemList, setPersonnelItemList] = useState([])

    //UI - behaviour - hooks
    const [hiddenInternalItem, setHiddenItemInternalEmployee] = useState('visible')
    const [hiddenExternalItem, setHiddenItemExternalEmployee] = useState('hidden')

    useEffect(() => {
        fetchPersonnel()
    }, [])

    const fetchPersonnel = async () => {
        const personnel = await net.getPersonnel()
        const itemList = util.nameList(personnel)
        console.log(`>>>Total data fetched: ${itemList.length} elements.`)
        setPersonnelList(personnel)
        setPersonnelItemList(itemList)
    }

    const changeName = (e) => setName(e.target.value)
    const changeLastName = (e) => setLastName(e.target.value)
    const changeEmail = (e) => setEmail(e.target.value)
    const changeDniType = (e) => setDniType(e.label)
    const changeDni = (e) => setDni(e.target.value)
    const changePermitType = (e) => setPermitType(e.target.value)
    const changePisition = (e) => setPosition(e.target.value)
    const changeDate = (value, dateString) => setDate(dateString)
    const selectCoworker = (value) => setCoworker(value)
    const changeExternalWorkerName = (e) => {
        console.log(e.target.value)
        setExternalWorker(e.target.value)
    }
    const changeReason = (e) => setReason(e.target.value)
    const changeAgree = (e) => setAgreeDisable(!e.target.checked)

    const changeReplaceType = (e) => {
        setReplaceType(e.target.value)

        if (e.target.value === 'Empleado') {
            setHiddenItemInternalEmployee('visible')
            setHiddenItemExternalEmployee('hidden')

        } else {
            setHiddenItemInternalEmployee('hidden')
            setHiddenItemExternalEmployee('visible')
        }
    }

    const clearFields = () => {
        console.log("clear here!")
        console.log(DOMElement)
        //DOMElement[1].value = '';
        
    }

    const createTicket = () => {
        console.log("sending...")
        var permit = {}
        permit.name = name
        permit.last_name = lastName
        permit.email = email
        permit.type_dni = dniType
        permit.dni = dni
        permit.position = position
        permit.permit_type = permitType
        permit.permit_start_date = date[0] + ":00"
        permit.permit_end_date = date[1] + ":00"
        permit.who_is_replacement = replaceType === 'Empleado' ? coworker : externalWorker
        permit.permit_reason = reason
        permit.accept = isAgreeDisable

        net.addPermitRequest(permit)
    }

    return (
        <div>
            <Space id="space-form" direction="vertical" size={18}>

                <Input size="large" placeholder="Nombres" onChange={e => changeName(e)} />
                <Input size="large" placeholder="Apellidos" onChange={e => changeLastName(e)} />
                <Input size="large" disabled placeholder="Correo electrónico" onChange={e => changeEmail(e)} />

                <Input.Group compact>
                    <Select
                        size="large"
                        labelInValue
                        defaultValue={{ value: '--' }}
                        style={{ width: '25%' }}
                        onChange={changeDniType}>
                        <Option value="--">Seleccione una opcion</Option>
                        <Option value="cc">Cédula Ciudadanía (C.C)</Option>
                        <Option value="ce">Cédula Extranjería (C.E)</Option>
                        <Option value="ps">Pasaporte (PS)</Option>
                    </Select>
                    <Input size="large" style={{ width: '75%' }} placeholder="No. identidad" onChange={e => changeDni(e)} />
                </Input.Group>

                <Input size="large" placeholder="Cargo del empleado" onChange={e => changePisition(e)} />

                <Radio.Group
                    options={optionsWithDisabled}
                    onChange={e => changePermitType(e)}
                    value={permitType}
                    optionType="button"
                    buttonStyle="solid"
                />

                <RangePicker
                    showTime={{ format: 'HH' }}
                    format="YYYY-MM-DD HH"
                    onChange={changeDate}
                />

                <span className="span-in-line" >
                    ¿Quién realizará el reemplazo?
                </span>
                <Radio.Group
                    options={optionsWhoReplace}
                    onChange={e => changeReplaceType(e)}
                    value={replaceType}
                    optionType="button"
                    buttonStyle="solid"
                />

                <AutoComplete
                    id="internal-replacement"
                    style={{ width: '100%', height: 40, visibility: hiddenInternalItem }}
                    options={personnelItemList}
                    placeholder="Seleccione una persona de la organización"
                    onSelect={selectCoworker}
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />

                <Input id="external-replacement"
                    style={{ width: '100%', visibility: hiddenExternalItem }}
                    size="large"
                    placeholder="Ingrese el nombre de la persona o empresa externa"
                    onChange={e => changeExternalWorkerName(e)}
                />

                <TextArea
                    value={reason}
                    onChange={e => changeReason(e)}
                    placeholder="Motivo de la ausencia"
                    autoSize={{ minRows: 4 }}
                />

                <div>
                    <span className="span-in-line" >
                        <Checkbox onChange={e => changeAgree(e)} />
                    </span>
                    <span className="span-in-line terms-text" >
                        He leído y acepto la <a href="https://rochester.edu.co/politicas/" rel="noreferrer" target="_blank">Política para el tratamiento de los datos personales</a> del Colegio Rochester de conformidad a lo establecido por el Artículo 15 de la Constitución Política, la Ley 1581 de 2012, Decreto 1377 de 2013, la jurispruendencia de las altas cortes y las demás normas reglamentarias y concordantes. Además entiendo que al diligenciar la solicitud de permiso, licencia o incapacidad lo hago en pleno conocimiento de las responsabilidades legales y laborales del uso de este proceso.
                    </span>
                </div>

                <div>
                    <Button className="in-line-button" type="primary" icon={<SendOutlined />} size="large" disabled={isAgreeDisable} onClick={createTicket}>
                        Enviar
                    </Button>
                    <Button className="in-line-button" size="large" onClick={clearFields}>Restablecer</Button>
                </div>

            </Space>
        </div >
    );
}

export default Form;