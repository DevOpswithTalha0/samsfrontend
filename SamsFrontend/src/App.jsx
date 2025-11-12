import AppRoutes from "./routes/AppRoutes";
import InitializeAuth from "./components/InitializeAuth";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <InitializeAuth />
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#4a90e2",
              secondary: "#black",
            },
          },
        }}
      />
    </>
  );
}

export default App;
