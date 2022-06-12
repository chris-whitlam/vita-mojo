import React from 'react';
import { Button, Space, DatePicker, Row, Col, Select } from 'antd';
import styled from 'styled-components';
import TextInput from './TextInput';

const { RangePicker } = DatePicker;
const { Option } = Select;

const StyledSpace = styled(Space)`
  width: 100%;
  align-items: center;
`;

export default function ({ setFilters }) {
  function findByLocation() {
    alert('TODO: Search for stores by current user location');
  }

  function onTimeRangeSubmit([startDate, endDate]: [
    moment.Moment,
    moment.Moment,
  ]) {
    if (startDate && endDate) {
      alert(
        `TODO: Search for store by active hours
        from ${startDate.format('HH:mm')} to ${endDate.format('HH:mm')}`,
      );
    }
  }

  function onWeekdayChange(value: number) {
    alert(`TODO: Search for store by weekday ${value}`);
  }

  const filterByStoreName = (storeName: string) => {
    setFilters((filters) => ({
      ...filters,
      searchQuery: storeName,
    }));
  };

  return (
    <>
      <StyledSpace direction="vertical">
        <Row>
          <Col>
            <Space direction="horizontal">
              <Button type="primary" onClick={findByLocation}>
                Filter by current user location
              </Button>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col>
            <Space direction="horizontal">
              <TextInput
                label="Filter stores by name"
                onPressEnter={filterByStoreName}
              />
            </Space>
          </Col>
        </Row>
        <Row>
          <Col>
            Filter stores by working hours
            <Select onChange={onWeekdayChange} placeholder="Pick week day">
              <Option value={1}>Monday</Option>
              <Option value={2}>Tuesday</Option>
              <Option value={3}>Wednesday</Option>
              <Option value={4}>Thursday</Option>
              <Option value={5}>Friday</Option>
              <Option value={6}>Saturday</Option>
              <Option value={7}>Sunday</Option>
            </Select>
            <RangePicker
              format="HH:mm"
              onChange={console.log}
              onOk={onTimeRangeSubmit}
              picker="time"
            />
          </Col>
        </Row>
      </StyledSpace>
    </>
  );
}
