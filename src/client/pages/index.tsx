import React from 'react';
import { NextPage } from 'next';
import Homepage from '../components/Homepage';

const Home: NextPage<{ data: string }> = () => {
  return <Homepage />;
};

export default Home;
