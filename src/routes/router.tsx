import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from '../app/home/page'
import AuthPage from '../app/auth/page'
import { AuthRoute } from "./auth-route";
import { PrivateRoute } from "./private-route";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute />}>
          <Route index element={<AuthPage />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
