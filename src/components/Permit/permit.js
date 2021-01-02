import { useState } from 'react';
import { Input, Select, Radio, Space, DatePicker, Row, Col } from 'antd';

import './permit.css'

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

const Permit = () => {
    const [type, setType] = useState('Permiso')
    const [reason, setReason] = useState('')
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

    const onOk = (value) => {
        console.log('onOk: ', value);
    }

    return (
        <main>
            <Row>
                <Col span={16}>
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

                    </Space>

                </Col>
                <Col span={8}>
                    <h3>Información importante:</h3>
                    <p className="text-info">Cuando se haya concedido un permiso telefónicamente por causa de enfermedad o incapacidad, se diligenciará este formulario cuando regrese la persona a su trabajo y se adjuntar a la certificación médica o la incapacidad para validar el permiso o licencia.</p>
                    <p className="text-info">En general los permisos por corto tiempo <b>(horas media jornada y hasta un día) son remunerados, y las licencias no remuneradas se conceden para periodos más largos, hasta 60 días y suspenden el contrato de trabajo para efectos de prestaciones sociales y salario</b>. La incapacidad por maternidad tiene <b>duración de 18 semanas y durante este periodo se le continúa pagando el salario a la persona</b>, quien deberá informar al colegio tan pronto como se concedan y enviarla a la oficina de Personal junto con los documentos correspondientes.</p>
                    <p className="text-info">Este formulario se archivará en la carpeta de la persona junto con la copia de la incapacidad si la hubiere.</p>
                </Col>
            </Row>


        </main>
    );
}

export default Permit;