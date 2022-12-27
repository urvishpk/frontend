import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateForm from "./components/CreateForm";
import CustomForm from "./components/CustomForm";
import FormList from "./components/FormList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/form/:slug" element={<CustomForm />} />
      </Routes>
    </Router>
  );
}

export default App;
