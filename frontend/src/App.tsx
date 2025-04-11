import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import LoginPage from "./components/LoginButton";
import { AuthGuard } from "./components/AuthGuard";
import HomePage from "./pages/home";
import FolderPage from "./pages/folder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route index element={<HomePage />} />
          <Route path="/folder/*" element={<FolderPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
