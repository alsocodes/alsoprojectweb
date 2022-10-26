import { GetStaticProps } from 'next';
import React from 'react';
import prisma from '../../../lib/prisma';

const Service = ({ feed }) => {
  console.log(feed);
  return <div>Service</div>;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.service.findMany({
    // where: { published: true },
    // include: {
    //   author: {
    //     select: { name: true },
    //   },
    // },
  });
  return {
    props: { data },
    revalidate: 10,
  };
};

export default Service;
