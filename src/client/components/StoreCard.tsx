import React from 'react';
import { Card } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Meta } = Card;

interface StoreCardProps {
  address: string;
  email: string;
  lat: number;
  long: number;
  name: string;
  sortOrder: number;
  status: boolean;
  uuid: string;

  // TODO implement this on backend
  distance?: number;

  // TODO return these fields from backend
  storeHours?: {
    weekday: number;
    from: string;
    to: string;
  };
}

const StyledEnvironmentOutlined = styled(EnvironmentOutlined)`
  margin-right: 8px;
`;

export default function (props: StoreCardProps) {
  return (
    <Card
      title={
        <Meta
          description={
            <div>
              <StyledEnvironmentOutlined />
              {props.address}
            </div>
          }
          title={props.name}
        />
      }
      style={{ width: 300 }}
    >
      {props.distance ? (
        <p>Distance: {props.distance}km</p>
      ) : (
        <>
          <p>Lat: {props.lat}</p>
          <p>Lon: {props.long}</p>
          {props.storeHours && (
            <p>
              Opens at {props.storeHours.from}; Closes at {props.storeHours.to};
            </p>
          )}
        </>
      )}
    </Card>
  );
}
