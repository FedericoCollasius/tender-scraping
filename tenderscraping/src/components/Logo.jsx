import GeodataLogo from "../assets/GeodataLogo.png"

export default function Logo() {
  return (
    <a
      href="http://www.geodatargentina.com.ar/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src= {GeodataLogo} alt="Geodata Logo" className="logo" />
    </a>
  );
}
