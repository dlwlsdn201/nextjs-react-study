import axios from 'axios';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import Item from '../../src/components/Item';
import { Loader } from 'semantic-ui-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Post = ({ item, name }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ padding: '100px 0' }}>
        <Loader active inline="centered">
          Loading...
        </Loader>
      </div>
    );
  }

  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description} />
          </Head>
          {name} 환경 입니다.
          <Item data={item} />;
        </>
      )}
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '740' } },
      { params: { id: '730' } },
      { params: { id: '729' } }
    ],
    fallback: true
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name
    }
  };
};
