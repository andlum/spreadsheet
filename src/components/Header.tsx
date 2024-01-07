const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      style={{
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {children}
    </div>
  );
};

export default Header;
