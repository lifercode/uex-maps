import { Toaster } from "sonner";
import { Router } from "./routes/router";

function App() {
  return (
    <>
      <Router />
      <Toaster position="bottom-left" />
    </>
  );
}

export default App
