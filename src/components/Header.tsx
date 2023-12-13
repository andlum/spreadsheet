const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      style={{
        padding: 4,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

export default Header;
