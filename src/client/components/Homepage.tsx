import React from 'react';
import styled from 'styled-components';
import { Layout, Avatar, Row, Col, Typography } from 'antd';

import 'antd/dist/antd.compact.css';
import StoreList from './StoreList';
import Filters from './Filters';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const StyledHeader = styled(Header)`
  color: #fff;
  background: #fff;
  box-shadow: rgb(109 114 120 / 25%) 0px 2px;
  z-index: 1;
`;

const BgImage = styled.div`
  position: relative;
  pointer-events: none;
  width: 100%;
  height: 100vh;
  padding: 64px;
  color: rgb(0, 0, 0);
  align-items: flex-start;
  background-image: url('https://s3.vitamojo.com/static/vitamojo/vitamojoBackgroundCategory.jpg');
  background-size: cover;
  background-position: center center;
`;

const StyledTitle = styled(Title)`
  text-align: center;
`;

export default function () {


  return (
    <Layout>
      <StyledHeader>
        <Avatar src="https://s3.vitamojo.com/static/vm-logo.svg" size="large" />
      </StyledHeader>
      <Content>
        <Row>
          <Col span={12}>
            <Filters />
            <StyledTitle level={2}>Stores</StyledTitle>
            <StoreList />
          </Col>
          <Col span={12}>
            <BgImage>
              <Title>Vitamojo</Title>
              <Text>
                Fully customised meals. Order on the iPads or online for a meal
                at a taste and price point that suits you.
              </Text>
            </BgImage>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
