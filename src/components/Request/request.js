import { Input, Select, Radio } from 'antd';

const { Option } = Select;

function handleChange(value) {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
}

const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
  ];



const request = () => {

    // onChange4 = e => {
    //     console.log('radio4 checked', e);
    // };

    return (
        <div>
            <Input size="large" placeholder="Nombres" />
            <Input size="large" placeholder="Apellidos" />
            <Input.Group compact>
                <Select 
                    size="large" 
                    labelInValue
                    defaultValue={{ value: 'cc' }}
                    style={{ width: '25%' }}
                    onChange={handleChange}>
                    <Option value="cc">Cédula Ciudadanía (C.C)</Option>
                    <Option value="ce">Cédula Extranjería (C.E)</Option>
                    <Option value="ps">Pasaporte (PS)</Option>
                </Select>
                <Input size="large" style={{ width: '75%' }} placeholder="Identificación" />
            </Input.Group>
            <Input size="large" placeholder="Cargo del empleado" />
            <Radio.Group
                options={optionsWithDisabled}
                // onChange={e => onChange4(e)}
                value={"Apple"}
                optionType="button"
                buttonStyle="solid"
            />
            

        </div>
    );
}

export default request;