import { NavLink } from 'react-router-dom';

import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTimes,
  FaChevronLeft,
} from 'react-icons/fa';

import { useSettings } from '../../context/SettingsContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { language } = useSettings();

  const translations = {
    en: {
      title: 'Employee Payroll',
      dashboard: 'Dashboard',
      employees: 'Employees',
      departments: 'Departments',
      attendance: 'Attendance',
      leaves: 'Leaves',
      payroll: 'Payroll',
      rights: 'All rights reserved.',
    },
    hi: {
      title: 'कर्मचारी पेरोल',
      dashboard: 'डैशबोर्ड',
      employees: 'कर्मचारी',
      departments: 'विभाग',
      attendance: 'उपस्थिति',
      leaves: 'छुट्टियां',
      payroll: 'पेरोल',
      rights: 'सर्वाधिकार सुरक्षित।',
    },
    zh: {
      title: '员工薪资',
      dashboard: '仪表板',
      employees: '员工',
      departments: '部门',
      attendance: '考勤',
      leaves: '请假',
      payroll: '薪资',
      rights: '版权所有。',
    },
  };

  const text = translations[language];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay d-md-none"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${
          isOpen ? 'sidebar-open' : ''
        }`}
      >
        {/* LOGO */}

        <div className="sidebar-logo">
          <div className="logo-icon">
            <FaUsers />
          </div>

          <span>{text.title}</span>

          <button
            type="button"
            className="sidebar-close d-md-none"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* MENU */}

        <nav className="sidebar-nav">

          <NavLink
            to="/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? 'active' : ''
              }`
            }
          >
            <FaTachometerAlt />
            <span>{text.dashboard}</span>
          </NavLink>

          <NavLink
            to="/employees"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? 'active' : ''
              }`
            }
          >
            <FaUsers />
            <span>{text.employees}</span>
          </NavLink>

          <NavLink
            to="/departments"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? 'active' : ''
              }`
            }
          >
            <FaBuilding />
            <span>{text.departments}</span>
          </NavLink>

          <NavLink
            to="/attendance"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? 'active' : ''
              }`
            }
          >
            <FaCalendarCheck />
            <span>{text.attendance}</span>
          </NavLink>

          <NavLink
            to="/leaves"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? 'active' : ''
              }`
            }
          >
            <FaCalendarAlt />
            <span>{text.leaves}</span>
          </NavLink>

          <NavLink
            to="/payroll"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? 'active' : ''
              }`
            }
          >
            <FaMoneyBillWave />
            <span>{text.payroll}</span>
          </NavLink>

        </nav>

        {/* COLLAPSE BUTTON */}

        <button
          type="button"
          className="sidebar-collapse-btn"
        >
          <FaChevronLeft />
        </button>

        {/* FOOTER */}

        <div className="sidebar-footer">

          <div className="sidebar-footer-icon">
            <FaUsers />
          </div>

          <div className="sidebar-footer-text">
            <strong>
              © 2026 Employee Payroll
            </strong>

            <span>{text.rights}</span>
          </div>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;