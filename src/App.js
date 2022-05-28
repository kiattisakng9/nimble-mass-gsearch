import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegistrationPage from "./Pages/RegistrationPage";
import LoginPage from "./Pages/LoginPage";
import SearchPage from "./Pages/SearchPage";
import KeywordsPage from "./Pages/KeywordsPage";
import LayoutContainer from "./Pages/LayoutContainer";
import Protected from "./Protected";
import NotFoundPage from "./Pages/NotFoundPage";
import AuthRestricted from "./AuthRestricted";
import DefaultHome from "./DefaultHome";
import { ProvideAuth } from "./Contexts/AuthContext";

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutContainer />}>
            <Route path='/' element={<DefaultHome />} />
            <Route
              path='/register'
              element={
                <AuthRestricted>
                  <RegistrationPage />
                </AuthRestricted>
              }
            />
            <Route
              path='/login'
              element={
                <AuthRestricted>
                  <LoginPage />
                </AuthRestricted>
              }
            />
            <Route
              path='/search'
              element={
                <Protected>
                  <SearchPage />
                </Protected>
              }
            />
            <Route
              path='/keywords'
              element={
                <Protected>
                  <KeywordsPage />
                </Protected>
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
