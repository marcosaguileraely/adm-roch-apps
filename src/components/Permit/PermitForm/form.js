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

const Form = () => {

    const [name, setName]             = useState('')
    const [lastName, setLastName]     = useState('')
    const [email, setEmail]           = useState('')
    const [dniType, setDniType]       = useState('')
    const [dni, setDni]               = useState('')
    const [permitType, setPermitType] = useState('')
    const [position, setPosition]     = useState('')
    const [date, setDate]             = useState([])
    const [coworker, setCoworker]     = useState('')
    const [reason, setReason]         = useState('')
    const [isAgreeDisable, setAgreeDisable] = useState(true)

    const [personnelList, setPersonnelList] = useState([])
    const [personnelItemList, setPersonnelItemList] = useState([])
    //const [counter, dispatch] = useReducer(reducer, initialState)

    const fetchPersonnel = async () => {
        const personnel = await net.getPersonnel()
        const itemList = util.nameList(personnel)
        console.log(`>>>Total data fetched: ${itemList.length} elements.`)
        setPersonnelList(personnel)
        setPersonnelItemList(itemList)
    }

    useEffect(() => {
        fetchPersonnel()
    }, [])

    const changeName       = (e) => setName(e.target.value)
    const changeLastName   = (e) => setLastName(e.target.value)
    const changeEmail      = (e) => setEmail(e.target.value)
    const changeDniType    = (e) => setDniType(e.label)
    const changeDni        = (e) => setDni(e.target.value)
    const changePermitType = (e) => setPermitType(e.target.value)
    const changePisition   = (e) => setPosition(e.target.value)
    const changeDate       = (value, dateString) => setDate(dateString)
    const selectCoworker   = (value) => setCoworker(value)
    const changeReason     = (e) => setReason(e.target.value)
    const changeAgree      = (e) => setAgreeDisable(!e.target.checked)

    const clearFields = () => {
        console.log("clear here!")
    }

    const createTicket = () => {
        console.log("sending...")

        var permit               = {}
        permit.name              = name
        permit.last_name         = lastName
        permit.email             = email
        permit.type_dni          = dniType
        permit.dni               = dni
        permit.position          = position
        permit.permit_type       = permitType
        permit.permit_start_date = date[0]
        permit.permit_end_date   = date[1]
        permit.who_is_replacement= coworker
        permit.permit_reason     = reason
        permit.accept            = isAgreeDisable

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

                <Input size="large" placeholder="Cargo del empleado" onChange={e => changePisition(e)}/>

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

                <AutoComplete
                    style={{ width: '100%' }}
                    options={personnelItemList}
                    placeholder="¿Quién hará el reemplazo?"
                    onSelect={selectCoworker}
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />

                <TextArea
                    value={reason}
                    onChange={e => changeReason(e)}
                    placeholder="Motivo de la ausencia"
                    autoSize={{ minRows: 2 }}
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
        </div>
    );
}

export default Form;