import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  FaCalendarCheck,
  FaClock,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
  FaEye,
  FaTimes,
} from 'react-icons/fa';

import {
  getAttendance,
  checkIn,
  checkOut,
} from '../../services/attendanceService';

import type {
  AttendanceResponse,
  AttendanceStatus,
} from '../../services/attendanceService';

import { useSettings } from '../../context/SettingsContext';

import './Attendance.css';


/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {

  en: {

    title: 'Attendance',

    subtitle:
      "Manage your organization's employee attendance",

    checkIn: 'Check In',

    checkOut: 'Check Out',

    totalRecords:
      'Total Records',

    present:
      'Present',

    absent:
      'Absent',

    late:
      'Late',

    search:
      'Search attendance...',

    employee:
      'Employee',

    date:
      'Date',

    checkInTime:
      'Check In',

    checkOutTime:
      'Check Out',

    workingHours:
      'Working Hours',

    status:
      'Status',

    actions:
      'Actions',

    view:
      'View',

    noRecords:
      'No attendance records',

    noRecordsDescription:
      'Attendance records will appear here.',

    loading:
      'Loading attendance...',

    employeeId:
      'Employee ID',

    employeeName:
      'Employee Name',

    attendanceDate:
      'Attendance Date',

    workingMinutes:
      'Working Minutes',

    close:
      'Close',

    selectEmployee:
      'Enter Employee ID',

    employeeIdPlaceholder:
      'Enter employee ID',

    confirmCheckIn:
      'Do you want to check in this employee?',

    confirmCheckOut:
      'Do you want to check out this employee?',

    invalidEmployee:
      'Please enter a valid employee ID.',

    successCheckIn:
      'Employee checked in successfully.',

    successCheckOut:
      'Employee checked out successfully.',

    error:
      'Unable to process attendance.',

  },


  hi: {

    title: 'उपस्थिति',

    subtitle:
      'कर्मचारियों की उपस्थिति का प्रबंधन करें',

    checkIn:
      'चेक इन',

    checkOut:
      'चेक आउट',

    totalRecords:
      'कुल रिकॉर्ड',

    present:
      'उपस्थित',

    absent:
      'अनुपस्थित',

    late:
      'देर से',

    search:
      'उपस्थिति खोजें...',

    employee:
      'कर्मचारी',

    date:
      'दिनांक',

    checkInTime:
      'चेक इन',

    checkOutTime:
      'चेक आउट',

    workingHours:
      'कार्य समय',

    status:
      'स्थिति',

    actions:
      'कार्रवाई',

    view:
      'देखें',

    noRecords:
      'कोई उपस्थिति रिकॉर्ड नहीं',

    noRecordsDescription:
      'उपस्थिति रिकॉर्ड यहां दिखाई देंगे।',

    loading:
      'उपस्थिति लोड हो रही है...',

    employeeId:
      'कर्मचारी ID',

    employeeName:
      'कर्मचारी का नाम',

    attendanceDate:
      'उपस्थिति दिनांक',

    workingMinutes:
      'कार्य मिनट',

    close:
      'बंद करें',

    selectEmployee:
      'कर्मचारी ID दर्ज करें',

    employeeIdPlaceholder:
      'कर्मचारी ID दर्ज करें',

    confirmCheckIn:
      'क्या आप इस कर्मचारी को चेक इन करना चाहते हैं?',

    confirmCheckOut:
      'क्या आप इस कर्मचारी को चेक आउट करना चाहते हैं?',

    invalidEmployee:
      'कृपया सही कर्मचारी ID दर्ज करें।',

    successCheckIn:
      'कर्मचारी सफलतापूर्वक चेक इन हो गया।',

    successCheckOut:
      'कर्मचारी सफलतापूर्वक चेक आउट हो गया।',

    error:
      'उपस्थिति प्रक्रिया पूरी नहीं हो सकी।',

  },


  zh: {

    title: '考勤',

    subtitle:
      '管理组织员工的考勤',

    checkIn:
      '签到',

    checkOut:
      '签退',

    totalRecords:
      '总记录',

    present:
      '出勤',

    absent:
      '缺勤',

    late:
      '迟到',

    search:
      '搜索考勤...',

    employee:
      '员工',

    date:
      '日期',

    checkInTime:
      '签到',

    checkOutTime:
      '签退',

    workingHours:
      '工作时间',

    status:
      '状态',

    actions:
      '操作',

    view:
      '查看',

    noRecords:
      '没有考勤记录',

    noRecordsDescription:
      '考勤记录将显示在这里。',

    loading:
      '正在加载考勤...',

    employeeId:
      '员工 ID',

    employeeName:
      '员工姓名',

    attendanceDate:
      '考勤日期',

    workingMinutes:
      '工作分钟',

    close:
      '关闭',

    selectEmployee:
      '输入员工 ID',

    employeeIdPlaceholder:
      '输入员工 ID',

    confirmCheckIn:
      '确定要为此员工签到吗？',

    confirmCheckOut:
      '确定要为此员工签退吗？',

    invalidEmployee:
      '请输入有效的员工 ID。',

    successCheckIn:
      '员工签到成功。',

    successCheckOut:
      '员工签退成功。',

    error:
      '无法处理考勤。',

  },

};


/* =====================================================
   STATUS TEXT
===================================================== */

const statusText = (
  status: AttendanceStatus,
  t: typeof translations.en
) => {

  switch (status) {

    case 'PRESENT':
      return t.present;

    case 'ABSENT':
      return t.absent;

    case 'LATE':
      return t.late;

    case 'HALF_DAY':
      return 'Half Day';

    default:
      return status;

  }

};


/* =====================================================
   COMPONENT
===================================================== */

function Attendance() {

  const { language } =
    useSettings();

  const currentLanguage =
    language as keyof typeof translations;

  const t =
    translations[currentLanguage] ||
    translations.en;


  /* =====================================================
     STATES
  ===================================================== */

  const [
    attendance,
    setAttendance,
  ] = useState<AttendanceResponse[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    processing,
    setProcessing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState('');

  const [
    success,
    setSuccess,
  ] = useState('');

  const [
    search,
    setSearch,
  ] = useState('');

  const [
    employeeId,
    setEmployeeId,
  ] = useState('');

  const [
    selectedRecord,
    setSelectedRecord,
  ] = useState<AttendanceResponse | null>(
    null
  );

  const [
    showViewModal,
    setShowViewModal,
  ] = useState(false);


  /* =====================================================
     LOAD ATTENDANCE
  ===================================================== */

  const loadAttendance = async () => {

    try {

      setLoading(true);

      setError('');

      const data =
        await getAttendance();

      setAttendance(data);

    } catch (err: any) {

      console.error(
        'Attendance API Error:',
        err
      );

      setError(
        err?.response?.data?.message ||
        t.error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadAttendance();

  }, []);


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredAttendance =
    useMemo(() => {

      const searchText =
        search.toLowerCase();

      return attendance.filter(
        (record) => {

          return (

            String(
              record.employeeId
            ).includes(searchText)

            ||

            record.employeeName
              ?.toLowerCase()
              .includes(searchText)

            ||

            record.status
              ?.toLowerCase()
              .includes(searchText)

            ||

            record.attendanceDate
              ?.includes(searchText)

          );

        }
      );

    }, [
      attendance,
      search,
    ]);


  /* =====================================================
     STATISTICS
  ===================================================== */

  const total =
    attendance.length;

  const present =
    attendance.filter(
      (item) =>
        item.status === 'PRESENT'
    ).length;

  const absent =
    attendance.filter(
      (item) =>
        item.status === 'ABSENT'
    ).length;

  const late =
    attendance.filter(
      (item) =>
        item.status === 'LATE'
    ).length;


  /* =====================================================
     CHECK IN
  ===================================================== */

  const handleCheckIn = async () => {

    const id =
      Number(employeeId);

    if (
      !employeeId ||
      Number.isNaN(id) ||
      id <= 0
    ) {

      setError(
        t.invalidEmployee
      );

      return;
    }

    if (
      !window.confirm(
        t.confirmCheckIn
      )
    ) {

      return;
    }

    try {

      setProcessing(true);

      setError('');

      setSuccess('');

      await checkIn(id);

      setEmployeeId('');

      setSuccess(
        t.successCheckIn
      );

      await loadAttendance();

    } catch (err: any) {

      console.error(
        'Check In Error:',
        err
      );

      setError(
        err?.response?.data?.message ||
        t.error
      );

    } finally {

      setProcessing(false);

    }
  };


  /* =====================================================
     CHECK OUT
  ===================================================== */

  const handleCheckOut = async () => {

    const id =
      Number(employeeId);

    if (
      !employeeId ||
      Number.isNaN(id) ||
      id <= 0
    ) {

      setError(
        t.invalidEmployee
      );

      return;
    }

    if (
      !window.confirm(
        t.confirmCheckOut
      )
    ) {

      return;
    }

    try {

      setProcessing(true);

      setError('');

      setSuccess('');

      await checkOut(id);

      setEmployeeId('');

      setSuccess(
        t.successCheckOut
      );

      await loadAttendance();

    } catch (err: any) {

      console.error(
        'Check Out Error:',
        err
      );

      setError(
        err?.response?.data?.message ||
        t.error
      );

    } finally {

      setProcessing(false);

    }
  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (
    record: AttendanceResponse
  ) => {

    setSelectedRecord(
      record
    );

    setShowViewModal(true);

  };


  /* =====================================================
     TIME FORMAT
  ===================================================== */

  const formatTime = (
    value: string | null
  ) => {

    if (!value) {
      return '--';
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return value;

    }

    return date.toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );

  };


  /* =====================================================
     WORKING HOURS
  ===================================================== */

  const formatWorkingTime = (
    minutes: number | null
  ) => {

    if (
      minutes === null ||
      minutes === undefined
    ) {

      return '--';

    }

    const hours =
      Math.floor(
        minutes / 60
      );

    const remaining =
      minutes % 60;

    return `${hours}h ${remaining}m`;

  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <div className="attendance-page">

        <div className="attendance-loading">

          <div className="attendance-spinner" />

          <h3>
            {t.loading}
          </h3>

        </div>

      </div>

    );

  }


  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="attendance-page">

      {/* Background */}

      <div className="attendance-dots" />

      <div className="attendance-wave-one" />

      <div className="attendance-wave-two" />


      {/* =================================================
         HEADER
      ================================================= */}

      <div className="attendance-header">

        <div className="attendance-title">

          <div className="attendance-title-icon">

            <FaCalendarCheck />

          </div>

          <div>

            <h1>
              {t.title}
            </h1>

            <p>
              {t.subtitle}
            </p>

          </div>

        </div>


        {/* CHECK IN / OUT BOX */}

        <div className="attendance-action-box">

          <input
            type="number"
            min="1"
            value={employeeId}
            placeholder={
              t.employeeIdPlaceholder
            }
            onChange={(event) =>
              setEmployeeId(
                event.target.value
              )
            }
          />


          <button
            type="button"
            className="check-in-button"
            disabled={processing}
            onClick={
              handleCheckIn
            }
          >

            <FaSignInAlt />

            {t.checkIn}

          </button>


          <button
            type="button"
            className="check-out-button"
            disabled={processing}
            onClick={
              handleCheckOut
            }
          >

            <FaSignOutAlt />

            {t.checkOut}

          </button>

        </div>

      </div>


      {/* =================================================
         ALERTS
      ================================================= */}

      {error && (

        <div className="attendance-alert error">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError('')
            }
          >

            <FaTimes />

          </button>

        </div>

      )}


      {success && (

        <div className="attendance-alert success">

          <span>
            {success}
          </span>

          <button
            type="button"
            onClick={() =>
              setSuccess('')
            }
          >

            <FaTimes />

          </button>

        </div>

      )}


      {/* =================================================
         STATS
      ================================================= */}

      <div className="attendance-stats">


        <div className="attendance-stat-card blue">

          <div className="attendance-stat-icon">

            <FaCalendarCheck />

          </div>

          <div>

            <span>
              {t.totalRecords}
            </span>

            <strong>
              {total}
            </strong>

          </div>

          <div className="attendance-stat-circle" />

        </div>


        <div className="attendance-stat-card green">

          <div className="attendance-stat-icon">

            <FaUserCheck />

          </div>

          <div>

            <span>
              {t.present}
            </span>

            <strong>
              {present}
            </strong>

          </div>

          <div className="attendance-stat-circle" />

        </div>


        <div className="attendance-stat-card red">

          <div className="attendance-stat-icon">

            <FaUserTimes />

          </div>

          <div>

            <span>
              {t.absent}
            </span>

            <strong>
              {absent}
            </strong>

          </div>

          <div className="attendance-stat-circle" />

        </div>


        <div className="attendance-stat-card orange">

          <div className="attendance-stat-icon">

            <FaClock />

          </div>

          <div>

            <span>
              {t.late}
            </span>

            <strong>
              {late}
            </strong>

          </div>

          <div className="attendance-stat-circle" />

        </div>

      </div>


      {/* =================================================
         TABLE CARD
      ================================================= */}

      <div className="attendance-table-card">


        {/* TOOLBAR */}

        <div className="attendance-toolbar">

          <div className="attendance-search">

            <FaSearch />

            <input
              type="text"
              value={search}
              placeholder={
                t.search
              }
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

            {search && (

              <button
                type="button"
                onClick={() =>
                  setSearch('')
                }
              >

                <FaTimes />

              </button>

            )}

          </div>

        </div>


        {/* TABLE */}

        {filteredAttendance.length >
        0 ? (

          <div className="attendance-table-wrapper">

            <table className="attendance-table">

              <thead>

                <tr>

                  <th>
                    {t.employee}
                  </th>

                  <th>
                    {t.date}
                  </th>

                  <th>
                    {t.checkInTime}
                  </th>

                  <th>
                    {t.checkOutTime}
                  </th>

                  <th>
                    {t.workingHours}
                  </th>

                  <th>
                    {t.status}
                  </th>

                  <th>
                    {t.actions}
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredAttendance.map(
                  (record) => (

                    <tr
                      key={
                        record.id
                      }
                    >

                      {/* Employee */}

                      <td>

                        <div className="attendance-employee">

                          <div className="attendance-avatar">

                            <FaUsers />

                          </div>

                          <div>

                            <strong>
                              {
                                record.employeeName
                              }
                            </strong>

                            <small>
                              ID-
                              {
                                record.employeeId
                              }
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* Date */}

                      <td>

                        <span className="date-value">

                          {
                            record.attendanceDate
                          }

                        </span>

                      </td>


                      {/* Check In */}

                      <td>

                        <span className="time-value check-in-time">

                          {formatTime(
                            record.checkIn
                          )}

                        </span>

                      </td>


                      {/* Check Out */}

                      <td>

                        <span className="time-value check-out-time">

                          {formatTime(
                            record.checkOut
                          )}

                        </span>

                      </td>


                      {/* Working */}

                      <td>

                        <span className="working-value">

                          <FaClock />

                          {
                            formatWorkingTime(
                              record.workingMinutes
                            )
                          }

                        </span>

                      </td>


                      {/* Status */}

                      <td>

                        <span
                          className={
                            `attendance-status ${record.status.toLowerCase()}`
                          }
                        >

                          <span className="status-dot" />

                          {
                            statusText(
                              record.status,
                              t
                            )
                          }

                        </span>

                      </td>


                      {/* Actions */}

                      <td>

                        <button
                          type="button"
                          className="attendance-view-button"
                          title={t.view}
                          onClick={() =>
                            handleView(
                              record
                            )
                          }
                        >

                          <FaEye />

                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="attendance-empty">

            <div className="attendance-empty-icon">

              <FaCalendarCheck />

            </div>

            <h3>
              {t.noRecords}
            </h3>

            <p>
              {
                t.noRecordsDescription
              }
            </p>

          </div>

        )}

      </div>


      {/* =================================================
         VIEW MODAL
      ================================================= */}

      {showViewModal &&
        selectedRecord && (

        <div
          className="attendance-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setShowViewModal(false);

            }

          }}
        >

          <div className="attendance-view-modal">


            <div className="attendance-modal-header">

              <div className="attendance-modal-icon">

                <FaCalendarCheck />

              </div>

              <div>

                <h2>
                  {
                    selectedRecord
                      .employeeName
                  }
                </h2>

                <span>
                  ID-
                  {
                    selectedRecord
                      .employeeId
                  }
                </span>

              </div>


              <button
                type="button"
                className="attendance-modal-close"
                onClick={() =>
                  setShowViewModal(false)
                }
              >

                <FaTimes />

              </button>

            </div>


            <div className="attendance-modal-body">


              <div className="attendance-detail">

                <span>
                  {t.employeeId}
                </span>

                <strong>
                  {
                    selectedRecord
                      .employeeId
                  }
                </strong>

              </div>


              <div className="attendance-detail">

                <span>
                  {t.employeeName}
                </span>

                <strong>
                  {
                    selectedRecord
                      .employeeName
                  }
                </strong>

              </div>


              <div className="attendance-detail">

                <span>
                  {t.attendanceDate}
                </span>

                <strong>
                  {
                    selectedRecord
                      .attendanceDate
                  }
                </strong>

              </div>


              <div className="attendance-detail">

                <span>
                  {t.checkInTime}
                </span>

                <strong>
                  {formatTime(
                    selectedRecord
                      .checkIn
                  )}
                </strong>

              </div>


              <div className="attendance-detail">

                <span>
                  {t.checkOutTime}
                </span>

                <strong>
                  {formatTime(
                    selectedRecord
                      .checkOut
                  )}
                </strong>

              </div>


              <div className="attendance-detail">

                <span>
                  {t.workingMinutes}
                </span>

                <strong>
                  {
                    selectedRecord
                      .workingMinutes ??
                    '--'
                  }
                </strong>

              </div>


              <div className="attendance-detail full">

                <span>
                  {t.status}
                </span>

                <strong>

                  <span
                    className={
                      `attendance-status ${selectedRecord.status.toLowerCase()}`
                    }
                  >

                    <span className="status-dot" />

                    {
                      statusText(
                        selectedRecord.status,
                        t
                      )
                    }

                  </span>

                </strong>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default Attendance;