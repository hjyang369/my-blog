// import * as React from 'react'
import { GetServerSideProps } from "next";

const Error = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

export const getServerSideProps = async ({ res, req }) => {
  const statusCode = res.statusCode;

  return {
    props: {
      statusCode,
    },
  };
};

export default Error;
