import { Layout } from 'antd';

import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div>
      
      <Layout>
        <Header>
          My header
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          Formulario de solicitudes
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            Content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Rochester School ©2021
        </Footer>
      </Layout>

    </div>
  );
}

export default App;
