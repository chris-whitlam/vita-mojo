import React from 'react';
import { Space } from 'antd';
import InfiniteScroll from "react-infinite-scroll-component";

import useLoadStores from './hooks/useLoadStores';
import StoreCard from './StoreCard';
import styled from 'styled-components';

const StyledSpace = styled(Space)`
  width: 100%;
`;

export default function ({ filters }) {
  const [{ data: { stores, hasMoreToLoad }, error }, loadMore] = useLoadStores(filters);

  if (!stores?.length || error) {
    return null;
  }

  return (
    <StyledSpace direction="vertical" align="center">
      <InfiniteScroll
        dataLength={stores.length}
        next={loadMore}
        hasMore={hasMoreToLoad}
        loader={<h4>Loading...</h4>}
      >
        {stores.map(store => <StoreCard key={store.uuid} {...store} />)}
      </InfiniteScroll>
    </StyledSpace>
  );
}
