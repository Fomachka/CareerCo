import { Routes, Route } from "react-router-dom";

import {
  LoginPage,
  SignUp,
  ErrorPage,
  MainPage,
  Dashboard,
  SearchJobs,
  AddJob,
  MyJobs,
  JobDetails,
  Sidebar,
} from "./components";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className={`'App' ${isLoggedIn ? "App__logged" : ""}`}>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="*" element={<ErrorPage to="/" />} />
          <Route path="/" element={<MainPage />} />
          <Route path="accounts" element={<MainPage />} />
          <Route path="accounts/login" element={<LoginPage />} />
          <Route path="accounts/signup" element={<SignUp />} />

          {isLoggedIn && (
            <>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="searchjobs" element={<SearchJobs />} />
              <Route path="searchjobs/:id" element={<JobDetails />} />
              <Route path="myjobs" element={<MyJobs />} />
              <Route path="addjob" element={<AddJob />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
