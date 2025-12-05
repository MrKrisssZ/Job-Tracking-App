import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobForm from './pages/JobForm';
import JobDetails from './pages/JobDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-job" element={<JobForm />} />
        <Route path="/jobs/update/:id" element={<JobForm />} />
        <Route path="/jobs/details/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
