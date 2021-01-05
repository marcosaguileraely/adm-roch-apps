import { useEffect, useState } from 'react';
import { Input, Select, Radio, Space, DatePicker, Checkbox, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import './form.css'

const net = require ('../../../utils/Network/permit-net')

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const optionsWithDisabled = [
    { label: 'Permiso', value: 'Permiso' },
    { label: 'Licencia', value: 'Licencia' },
    { label: 'Incapacidad', value: 'Incapacidad' },
];

const children = [];

for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const Form = () => {
    useEffect(() => {
        var people = []
        //call network threads
        const personnel = net.getPersonnel()
        console.log(personnel)
        setPersonnelList(personnel)
    },[])

    const [type, setType] = useState('Permiso')
    const [reason, setReason] = useState('')
    const [isDisable, setDisable] = useState(true)
    const [personnelList, setPersonnelList] = useState([])
    //const [counter, dispatch] = useReducer(reducer, initialState)

    const changeDocument = (value) => {
        console.log(value);
    }

    const changeType = (e) => {
        console.log(e.target.value)
        setType(e.target.value)
    }

    const changeDate = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    const selectCoworker = (value) => {
        console.log(`selected ${value}`);
    }

    const changeReason = (e) => {
        console.log(e.target.value)
        setReason(e.target.value)
    }

    const changeAgree = (e) => setDisable(!e.target.checked)

    const onOk = (value) => {
        console.log('onOk: ', value);
    }

    return (
        <div>
            <Space direction="vertical" size={18}>

                <Input size="large" placeholder="Nombres" />

                <Input size="large" placeholder="Apellidos" />

                <Input size="large" disabled placeholder="Correo electrónico" />

                <Input.Group compact>
                    <Select
                        size="large"
                        labelInValue
                        defaultValue={{ value: 'cc' }}
                        style={{ width: '25%' }}
                        onChange={changeDocument}>
                        <Option value="cc">Cédula Ciudadanía (C.C)</Option>
                        <Option value="ce">Cédula Extranjería (C.E)</Option>
                        <Option value="ps">Pasaporte (PS)</Option>
                    </Select>
                    <Input size="large" style={{ width: '75%' }} placeholder="Identificación" />
                </Input.Group>

                <Input size="large" placeholder="Cargo del empleado" />

                <Radio.Group
                    options={optionsWithDisabled}
                    onChange={e => changeType(e)}
                    value={type}
                    optionType="button"
                    buttonStyle="solid"
                />

                <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={changeDate}
                    onOk={onOk}
                />

                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="¿Quién(és) harán el reemplazo?"
                    // defaultValue={['a10', 'c12']}
                    onChange={selectCoworker} >
                    {children}
                </Select>

                <TextArea
                    value={reason}
                    onChange={e => changeReason(e)}
                    placeholder="Motivo de la ausencia"
                    autoSize={{ minRows: 2 }}
                />

                <div>
                    <span className="span-in-line" >
                        <Checkbox
                            value={false}
                            onChange={e => changeAgree(e)}
                        />
                    </span>
                    <span className="span-in-line terms-text" >
                        He leído y acepto la <a href="https://rochester.edu.co/politicas/" rel="noreferrer" target="_blank">Política para el tratamiento de los datos personales</a> del Colegio Rochester de conformidad a lo establecido por el Artículo 15 de la Constitución Política, la Ley 1581 de 2012, Decreto 1377 de 2013, la jurispruendencia de las altas cortes y las demás normas reglamentarias y concordantes. Además entiendo que al diligenciar la solicitud de permiso, licencia o incapacidad lo hago en pleno conocimiento de las responsabilidades legales y laborales del uso de este proceso.
                    </span>

                </div>

                <div>
                    <Button className="in-line-button" type="primary" icon={<SendOutlined />} size="large" disabled={isDisable}>
                        Enviar
                    </Button>
                    <Button className="in-line-button" size="large" >Restablecer</Button>
                </div>

            </Space>
        </div>
    );
}

export default Form;