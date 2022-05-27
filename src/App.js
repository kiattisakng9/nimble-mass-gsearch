import { useRef } from "react";
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

function App() {
  const isAuthenticated = useRef(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<LayoutContainer isLoggedIn={isAuthenticated.current} />}
        >
          <Route path='/' element={<DefaultHome />} />
          <Route
            path='/register'
            element={
              <AuthRestricted isAuthenticated={isAuthenticated.current}>
                <RegistrationPage />
              </AuthRestricted>
            }
          />
          <Route
            path='/login'
            element={
              <AuthRestricted isAuthenticated={isAuthenticated.current}>
                <LoginPage />
              </AuthRestricted>
            }
          />
          <Route
            path='/search'
            element={
              <Protected isAuthenticated={isAuthenticated.current}>
                <SearchPage />
              </Protected>
            }
          />
          <Route
            path='/keywords'
            element={
              <Protected isAuthenticated={isAuthenticated.current}>
                <KeywordsPage />
              </Protected>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
