import React from "react";
import TenderTable from "./components/Table";

function App() {
  return (
    <div>
      <header
        style={{
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src="/images/logo.png" alt="Logo" style={{ height: "60px" }} />
      </header>
      <TenderTable />
    </div>
  );
}

export default App;
