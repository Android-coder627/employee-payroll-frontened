import { useEffect, useState } from 'react';

import {
  FaUsers,
  FaBuilding,
  FaUserCheck,
  FaClipboardList,
} from 'react-icons/fa';

import {
  getDashboard,
  type DashboardResponse,
} from '../../services/dashboardService';

import {
  useSettings,
} from '../../context/SettingsContext';

function Dashboard() {

  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const { language } = useSettings();

  const translations = {

    en: {
      dashboard: 'Dashboard',
      overview:
        'Employee Payroll Management Overview',
      totalEmployees: 'Total Employees',
      activeEmployees: 'Active Employees',
      departments: 'Departments',
      totalDepartments: 'Total Departments',
      presentToday: 'Present Today',
      markedPresent: 'Marked Present',
      pendingLeaves: 'Pending Leaves',
      awaitingApproval: 'Awaiting Approval',
      loading: 'Loading dashboard...',
      error: 'Unable to load dashboard data.',
    },

    hi: {
      dashboard: 'डैशबोर्ड',
      overview:
        'कर्मचारी पेरोल प्रबंधन अवलोकन',
      totalEmployees: 'कुल कर्मचारी',
      activeEmployees: 'सक्रिय कर्मचारी',
      departments: 'विभाग',
      totalDepartments: 'कुल विभाग',
      presentToday: 'आज उपस्थित',
      markedPresent: 'उपस्थित दर्ज',
      pendingLeaves: 'लंबित छुट्टियां',
      awaitingApproval: 'अनुमोदन की प्रतीक्षा',
      loading: 'डैशबोर्ड लोड हो रहा है...',
      error: 'डैशबोर्ड डेटा लोड नहीं हो सका।',
    },

    zh: {
      dashboard: '仪表板',
      overview: '员工薪资管理概览',
      totalEmployees: '员工总数',
      activeEmployees: '在职员工',
      departments: '部门',
      totalDepartments: '部门总数',
      presentToday: '今日出勤',
      markedPresent: '已签到',
      pendingLeaves: '待处理请假',
      awaitingApproval: '等待批准',
      loading: '正在加载仪表板...',
      error: '无法加载仪表板数据。',
    },
  };

  const text = translations[language];

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const data = await getDashboard();

        setDashboard(data);

      } catch (error) {

        console.error(
          'Dashboard API Error:',
          error
        );

        setError(
          'Unable to load dashboard data.'
        );

      } finally {

        setLoading(false);

      }
    };

    loadDashboard();

  }, []);

  if (loading) {

    return (
      <div className="dashboard-loading">

        <div
          className="spinner-border"
          role="status"
        />

        <p>{text.loading}</p>

      </div>
    );
  }

  if (error) {

    return (
      <div className="alert alert-danger">
        {text.error}
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="dashboard-page">

      <div className="background-dots" />

      <div className="background-wave wave-one" />

      <div className="background-wave wave-two" />


      {/* HEADER */}

      <div className="dashboard-header">

        <h1>{text.dashboard}</h1>

        <p>
          {text.overview}
          <span className="wave-emoji">
            👋
          </span>
        </p>

      </div>


      {/* CARDS */}

      <div className="row dashboard-cards">

        {/* Employees */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="dashboard-card employee-card">

            <div className="card-content">

              <div>
                <p className="card-title">
                  {text.totalEmployees}
                </p>

                <h2>
                  {dashboard.totalEmployees}
                </h2>

                <p className="card-subtitle">
                  {text.activeEmployees}
                </p>
              </div>

              <div className="card-icon">
                <FaUsers />
              </div>

            </div>

            <div className="card-progress">
              <span />
            </div>

          </div>

        </div>


        {/* Departments */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="dashboard-card department-card">

            <div className="card-content">

              <div>
                <p className="card-title">
                  {text.departments}
                </p>

                <h2>
                  {dashboard.totalDepartments}
                </h2>

                <p className="card-subtitle">
                  {text.totalDepartments}
                </p>
              </div>

              <div className="card-icon">
                <FaBuilding />
              </div>

            </div>

            <div className="card-progress">
              <span />
            </div>

          </div>

        </div>


        {/* Attendance */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="dashboard-card attendance-card">

            <div className="card-content">

              <div>
                <p className="card-title">
                  {text.presentToday}
                </p>

                <h2>
                  {dashboard.todayPresent}
                </h2>

                <p className="card-subtitle">
                  {text.markedPresent}
                </p>
              </div>

              <div className="card-icon">
                <FaUserCheck />
              </div>

            </div>

            <div className="card-progress">
              <span />
            </div>

          </div>

        </div>


        {/* Leaves */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="dashboard-card leave-card">

            <div className="card-content">

              <div>
                <p className="card-title">
                  {text.pendingLeaves}
                </p>

                <h2>
                  {dashboard.pendingLeaves}
                </h2>

                <p className="card-subtitle">
                  {text.awaitingApproval}
                </p>
              </div>

              <div className="card-icon">
                <FaClipboardList />
              </div>

            </div>

            <div className="card-progress">
              <span />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;