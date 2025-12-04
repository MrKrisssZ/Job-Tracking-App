import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobList from "./pages/JobList";
import CreateJob from './pages/CreateJob';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/create-job" element={<CreateJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
