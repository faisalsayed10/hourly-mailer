import { List } from '.prisma/client';
import React from 'react'

interface Props {
  lists: List[]
}

const ListTable: React.FC<Props> = ({ lists }) => {
  return <div>{JSON.stringify(lists)}</div>;
};

export default ListTable