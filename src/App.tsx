import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import Employees from './pages/employee/Employees';
import Departments from './pages/department/Departments';
import Attendance from './pages/attendance/Attendance';
import Leaves from './pages/leave/Leaves';
import Payroll from './pages/payroll/Payroll';

import Dashboard
  from './pages/dashboard/Dashboard';

import Login
  from './pages/auth/Login';

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Application Layout */}

        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
          path="/employees"
          element={<Employees />}
        />

        <Route
          path="/departments"
          element={<Departments />}
        />

        <Route
          path="/leaves"
          element={<Leaves />}
        />

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/payroll"
          element={<Payroll />}
        />

        </Route>

        {/* Default */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;