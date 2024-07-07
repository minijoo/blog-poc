type Props = {
  children?: React.ReactNode;
};

const ContainerHome = ({ children }: Props) => {
  return <div className="container mx-auto">{children}</div>;
};

export default ContainerHome;
