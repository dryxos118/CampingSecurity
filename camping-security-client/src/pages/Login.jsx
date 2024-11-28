import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Axios from "axios";

const Login = ({ setUserId, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email !== undefined && password !== undefined) {
      try {
        const { data } = await Axios.post(
          "http://localhost:5000/api/v1/auth/login",
          {
            email,
            password,
          }
        );
        const id = data.user.id;
        const role = data.user.role;
        const token = data.token;
        setUserId(Number(id));
        setRole(role);
        localStorage.setItem("token", data.token);
      } catch (e) {
        console.log(e);
      }
    } else {
      setError("Il y a une erreur");
    }
  };

  return (
    <section className="full-screen">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
      >
        <div
          className="card shadow-lg"
          style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}
        >
          {/* Affichage de l'alerte en cas d'erreur */}
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          {/* Titre du formulaire */}
          <Typography variant="h5" align="center" className="mb-4">
            Login
          </Typography>

          {/* Formulaire de connexion */}
          <form onSubmit={handleLogin}>
            {/* Champ Email */}
            <div className="mb-3">
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Champ Mot de Passe */}
            <div className="mb-3">
              <TextField
                label="Mot de passe"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            {/* Bouton de Soumission */}
            <div className="d-grid gap-2">
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Se Connecter
              </Button>
            </div>

            {/* Lien pour mot de passe oublié */}
            <div className="text-center mt-3">
              <Typography variant="body2">
                <a href="" className="text-decoration-none text-primary">
                  Forgot your password?
                </a>
              </Typography>
            </div>

            {/* Lien pour inscription */}
            <div className="text-center mt-2">
              <Typography variant="body2">
                Don't have an account?{" "}
                <a href="/" className="text-decoration-none text-primary">
                  S'enregistrer
                </a>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
