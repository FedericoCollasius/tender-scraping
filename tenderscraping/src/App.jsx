import FiltrableTenderTable from "./components/FiltrableTenderTable";
import { tenders } from "./assets/data.js";

export default function App() {
  return <FiltrableTenderTable tenders={tenders} />;
}
