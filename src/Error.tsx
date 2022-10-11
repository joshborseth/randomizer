type Props = { errorText: string };

const Error = (props: Props) => {
  return <div className="text-red-500">{props.errorText}</div>;
};

export default Error;
