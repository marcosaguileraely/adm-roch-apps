import { Row, Col } from 'antd';

import Form from './PermitForm/form'
import Information from './PermitInformation/information'

import './permit.css'

const Permit = () => {
    
    return (
        <main>
            <Row gutter={[32, 8]}>
                <Col span={16}>
                    <Form />
                </Col>
                <Col span={8}>
                    <Information />
                </Col>
            </Row>
        </main>
    );
}

export default Permit;