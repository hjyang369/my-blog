import { GetServerSideProps } from "next";
import React from "react";

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
