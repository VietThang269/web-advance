import React from 'react';
import { useParams } from 'react-router-dom';

export default function MenuPageTest() {
  const { id } = useParams();

  return <div>MenuPageTest {id}</div>;
}
