import FiltrableTenderTable from "./components/FiltrableTenderTable";
import Header from "./components/Header";
import { tenders } from "./assets/data.js";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <FiltrableTenderTable tenders={tenders} />
    </div>
  );
}
