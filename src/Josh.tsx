import React from "react";

type Props = { title: number; body: string };

const Josh = (props: Props) => {
  return <div>{props.title}</div>;
};

export default Josh;
