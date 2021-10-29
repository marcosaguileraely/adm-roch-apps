import React from 'react';
import { Layout, Row, Col, Input, Divider } from 'antd';
import { GoogleLogin } from 'react-google-login';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import "./Login.css"
import config from '../../../src/config.json';

const { Header, Content, Footer } = Layout;

const Login = () => {

    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.El);
        console.log(response.profileObj);
        console.log(response.profileObj.email);

        var email_user = response.profileObj.email;
        var familyName = response.profileObj.familyName;
        var givenName = response.profileObj.givenName;
        var googleId = response.profileObj.googleId;
        var imageUrl = response.profileObj.imageUrl;
        var name = response.profileObj.name;

        // var data       = {};
        // data.name      = response.profileObj.givenName;
        // data.lastName  = response.profileObj.familyName;
        // data.lastName  = response.profileObj.familyName;
        // data.fullName  = response.profileObj.name;
        // data.email     = response.profileObj.email;
        // data.googleId  = response.profileObj.googleId;
        // data.imageUrl  = response.profileObj.imageUrl;

        if (email_user.includes("@rochester.edu.co")) {
            console.log("Ok. Rochester account :)");
            //window.alert("ok");
            //   this.setState({
            //     isAuthorize: true,
            //     isRochesterUser: true,
            //     email_loggedin: email_user
            //   }, () => {
            //     this.nextPath(data);
            //     //this.validateAuth(email_user, data);
            //   })
        } else {
            window.alert("Nope. Isn't a Rochester account :(");
        }
    }

    return (
        <div id="initial-container" style={{ height: '100%' }}>
            <Layout className="layout" style={{ background: "none" }}>
                <Content id="content" >
                    <div className="site-layout-content">
                        <Row id="login-row" gutter={16}>
                            <Col id="col1" xs={0} sm={0} md={12} lg={16} xl={16}>
                                <main id="col1-panel">
                                    <div className="col-1-container">
                                        <div><h2>Innovamos cada día para ofrecerte los mejores servicios en línea</h2></div>
                                        <div><h1>Empieza ahora</h1></div>
                                    </div>
                                </main>
                            </Col>
                            <Col id="col2" xs={24} sm={24} md={12} lg={8} xl={8}>
                                <main id="login-form">
                                    <div className="container">
                                        <div><img src="https://ik.imagekit.io/rochester59bucket/Rochester_School/Logos/tr:w-230/logo-rocherste_xo5QmkidKB.png" alt="Rochester School bilingual K-12 school"/></div>
                                        <div><h3>INGRESA A TU PORTAL DE EMPLEADO</h3></div>
                                        <div className="items"><Input placeholder="User" /></div>
                                        <div className="items"><Input.Password placeholder="Password" /></div>
                                        <Divider id="custom-div">Or</Divider>
                                        <div className="items">
                                            <GoogleLogin
                                                className="gsuite-btn"
                                                clientId={config.GOOGLE_CLIENT_ID}
                                                buttonText="Sign-in with Google Account"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle}
                                            />
                                        </div>
                                        <div>item6</div>
                                    </div>
                                </main>
                            </Col>
                        </Row>
                    </div>
                </Content>
                <Footer className="footer">Colegio Rochester | desde 1959</Footer>
            </Layout>
        </div>
    );
};

export default Login;