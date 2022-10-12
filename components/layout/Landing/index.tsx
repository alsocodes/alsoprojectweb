import Head from 'next/head';
import React from 'react';

const Landing = (props: any) => {
  const { children, data } = props;
  return (
    <div data-theme='emerald'>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{data?.title || 'Nextjs APP'} </title>
        <link
          rel='shortcut icon'
          href='assets/images/favicon.png'
          type='image/x-icon'
        />
      </Head>
      <main>{children}</main>
    </div>
  );
};

export default Landing;
