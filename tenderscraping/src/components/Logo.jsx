export default function Logo() {
  return (
    <a href="http://www.geodatargentina.com.ar/">
      <img
        src={process.env.PUBLIC_URL + "/images/GeodataLogo.png"}
        alt="Geodata Logo"
      />
    </a>
  );
}
