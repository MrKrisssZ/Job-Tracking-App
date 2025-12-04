import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateJob from './pages/CreateJob';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/jobs/update/:id" element={<CreateJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
