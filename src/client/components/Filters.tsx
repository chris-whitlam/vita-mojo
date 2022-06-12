import React, { useRef } from 'react';
import { Button, Space, DatePicker, Row, Col, Select } from 'antd';
import styled from 'styled-components';
import TextInput from './TextInput';

export interface Filters {
  searchQuery?: string;
  lat?: number;
  lng?: number;
  weekday?: number;
  startHour?: string;
  endHour?: string;
}

interface HourFilters {
  startHour?: string;
  endHour?: string;
  weekday?: number;
}

const { RangePicker } = DatePicker;
const { Option } = Select;

const StyledSpace = styled(Space)`
  width: 100%;
  align-items: center;
`;

export default function ({ setFilters }) {
  let hoursFilters = useRef<HourFilters>({});

  function findByLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setFilters((filters) => ({
        ...filters,
        lat: latitude,
        lng: longitude
      }));
    });
  }

  function onTimeRangeSubmit([startHour, endHour]: [
    moment.Moment,
    moment.Moment,
  ]) {
    hoursFilters.current = {
      ...hoursFilters.current,
      startHour: startHour.format('HH:mm'),
      endHour: endHour.format('HH:mm')
    }

    if (hoursFilters.current.startHour && hoursFilters.current.endHour && hoursFilters.current.weekday) {
      setFilters((filters: Filters) => ({
        ...filters,
        ...hoursFilters.current
      }));
    }
  }

  function onWeekdayChange(weekday: number) {
    hoursFilters.current = {
      ...hoursFilters.current,
      weekday,
    }

    if (hoursFilters.current.startHour && hoursFilters.current.endHour && hoursFilters.current.weekday) {
      setFilters((filters: Filters) => ({
        ...filters,
        ...hoursFilters.current
      }));
    }
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
              onOk={onTimeRangeSubmit}
              picker="time"
            />
          </Col>
        </Row>
      </StyledSpace>
    </>
  );
}
