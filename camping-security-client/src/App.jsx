import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import SharedLayout from "./components/SharedLayout";
import { getTheme } from "./theme";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  const theme = useMemo(() => getTheme("light"), []);

  return (
    <ThemeProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <Router>
        <Routes>
          <Route element={<SharedLayout />}>
            <Route
              index
              element={<Login setUserId={setUserId} setRole={setRole} />}
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute userID={userId}>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
