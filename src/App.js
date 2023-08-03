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
import UserProvider from "./context/UserProvider";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className={`${user ? "App__logged" : ""}`}>
      {!loading && !error && (
        <UserProvider>
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/accounts" element={<MainPage />} />
              <Route path="/accounts/login" element={<LoginPage />} />
              <Route path="/accounts/signup" element={<SignUp />} />
              <Route path="*" element={<ErrorPage />} />

              {user && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/searchjobs" element={<SearchJobs />} />
                  <Route path="/searchjobs/:id" element={<JobDetails />} />
                  <Route path="/myjobs" element={<MyJobs />} />
                  <Route path="/addjob" element={<AddJob />} />
                  <Route path="*" element={<ErrorPage />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </UserProvider>
      )}
    </div>
  );
};

export default App;
