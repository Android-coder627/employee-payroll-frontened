import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  FormEvent,
} from 'react';

import {
  FaCalendarAlt,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
  FaEye,
  FaCheck,
  FaTimes,
  FaPlus,
  FaUsers,
} from 'react-icons/fa';

import {
  getLeaves,
  applyLeave,
  approveLeave,
  rejectLeave,
} from '../../services/leaveService';

import type {
  LeaveResponse,
  LeaveType,
} from '../../services/leaveService';

import { useSettings } from '../../context/SettingsContext';

import './Leaves.css';


/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {

  en: {

    title: 'Leaves',

    subtitle:
      "Manage your organization's leave requests",

    applyLeave:
      'Apply Leave',

    totalLeaves:
      'Total Leaves',

    pending:
      'Pending',

    approved:
      'Approved',

    rejected:
      'Rejected',

    search:
      'Search leave requests...',

    employee:
      'Employee',

    leaveType:
      'Leave Type',

    startDate:
      'Start Date',

    endDate:
      'End Date',

    duration:
      'Duration',

    reason:
      'Reason',

    status:
      'Status',

    actions:
      'Actions',

    view:
      'View',

    approve:
      'Approve',

    reject:
      'Reject',

    noLeaves:
      'No leave requests',

    noLeavesDescription:
      'Leave requests will appear here.',

    loading:
      'Loading leaves...',

    applyNewLeave:
      'Apply New Leave',

    employeeId:
      'Employee ID',

    employeeIdPlaceholder:
      'Enter employee ID',

    selectLeaveType:
      'Select leave type',

    startDateLabel:
      'Start Date',

    endDateLabel:
      'End Date',

    reasonPlaceholder:
      'Enter reason for leave...',

    cancel:
      'Cancel',

    submit:
      'Apply Leave',

    close:
      'Close',

    leaveDetails:
      'Leave Details',

    confirmApprove:
      'Are you sure you want to approve this leave?',

    confirmReject:
      'Are you sure you want to reject this leave?',

    successApply:
      'Leave applied successfully.',

    successApprove:
      'Leave approved successfully.',

    successReject:
      'Leave rejected successfully.',

    error:
      'Unable to process leave request.',

    invalidEmployee:
      'Please enter a valid employee ID.',

    invalidDates:
      'End date cannot be before start date.',

  },


  hi: {

    title: 'छुट्टियां',

    subtitle:
      'कर्मचारियों की छुट्टी के अनुरोध प्रबंधित करें',

    applyLeave:
      'छुट्टी आवेदन',

    totalLeaves:
      'कुल छुट्टियां',

    pending:
      'लंबित',

    approved:
      'स्वीकृत',

    rejected:
      'अस्वीकृत',

    search:
      'छुट्टी खोजें...',

    employee:
      'कर्मचारी',

    leaveType:
      'छुट्टी प्रकार',

    startDate:
      'शुरू होने की तारीख',

    endDate:
      'अंतिम तारीख',

    duration:
      'अवधि',

    reason:
      'कारण',

    status:
      'स्थिति',

    actions:
      'कार्रवाई',

    view:
      'देखें',

    approve:
      'स्वीकृत करें',

    reject:
      'अस्वीकृत करें',

    noLeaves:
      'कोई छुट्टी अनुरोध नहीं',

    noLeavesDescription:
      'छुट्टी के अनुरोध यहां दिखाई देंगे।',

    loading:
      'छुट्टियां लोड हो रही हैं...',

    applyNewLeave:
      'नई छुट्टी का आवेदन',

    employeeId:
      'कर्मचारी ID',

    employeeIdPlaceholder:
      'कर्मचारी ID दर्ज करें',

    selectLeaveType:
      'छुट्टी प्रकार चुनें',

    startDateLabel:
      'शुरू होने की तारीख',

    endDateLabel:
      'अंतिम तारीख',

    reasonPlaceholder:
      'छुट्टी का कारण दर्ज करें...',

    cancel:
      'रद्द करें',

    submit:
      'छुट्टी आवेदन करें',

    close:
      'बंद करें',

    leaveDetails:
      'छुट्टी विवरण',

    confirmApprove:
      'क्या आप इस छुट्टी को स्वीकृत करना चाहते हैं?',

    confirmReject:
      'क्या आप इस छुट्टी को अस्वीकृत करना चाहते हैं?',

    successApply:
      'छुट्टी का आवेदन सफल रहा।',

    successApprove:
      'छुट्टी सफलतापूर्वक स्वीकृत हुई।',

    successReject:
      'छुट्टी सफलतापूर्वक अस्वीकृत हुई।',

    error:
      'छुट्टी प्रक्रिया पूरी नहीं हो सकी।',

    invalidEmployee:
      'कृपया सही कर्मचारी ID दर्ज करें।',

    invalidDates:
      'अंतिम तारीख शुरू होने की तारीख से पहले नहीं हो सकती।',

  },


  zh: {

    title: '休假',

    subtitle:
      '管理员工休假申请',

    applyLeave:
      '申请休假',

    totalLeaves:
      '总申请',

    pending:
      '待处理',

    approved:
      '已批准',

    rejected:
      '已拒绝',

    search:
      '搜索休假申请...',

    employee:
      '员工',

    leaveType:
      '休假类型',

    startDate:
      '开始日期',

    endDate:
      '结束日期',

    duration:
      '持续时间',

    reason:
      '原因',

    status:
      '状态',

    actions:
      '操作',

    view:
      '查看',

    approve:
      '批准',

    reject:
      '拒绝',

    noLeaves:
      '没有休假申请',

    noLeavesDescription:
      '休假申请将显示在这里。',

    loading:
      '正在加载休假...',

    applyNewLeave:
      '申请新休假',

    employeeId:
      '员工 ID',

    employeeIdPlaceholder:
      '输入员工 ID',

    selectLeaveType:
      '选择休假类型',

    startDateLabel:
      '开始日期',

    endDateLabel:
      '结束日期',

    reasonPlaceholder:
      '输入休假原因...',

    cancel:
      '取消',

    submit:
      '申请休假',

    close:
      '关闭',

    leaveDetails:
      '休假详情',

    confirmApprove:
      '确定要批准此休假吗？',

    confirmReject:
      '确定要拒绝此休假吗？',

    successApply:
      '休假申请成功。',

    successApprove:
      '休假批准成功。',

    successReject:
      '休假拒绝成功。',

    error:
      '无法处理休假申请。',

    invalidEmployee:
      '请输入有效的员工 ID。',

    invalidDates:
      '结束日期不能早于开始日期。',

  },

};


/* =====================================================
   LEAVE TYPE LABEL
===================================================== */

const getLeaveTypeLabel = (
  type: LeaveType,
  language: string
) => {

  const labels: Record<
    LeaveType,
    {
      en: string;
      hi: string;
      zh: string;
    }
  > = {

    CASUAL: {
      en: 'Casual Leave',
      hi: 'आकस्मिक अवकाश',
      zh: '事假',
    },

    SICK: {
      en: 'Sick Leave',
      hi: 'बीमारी की छुट्टी',
      zh: '病假',
    },

    EARNED: {
      en: 'Earned Leave',
      hi: 'अर्जित अवकाश',
      zh: '带薪年假',
    },

    MATERNITY: {
      en: 'Maternity Leave',
      hi: 'मातृत्व अवकाश',
      zh: '产假',
    },

    PATERNITY: {
      en: 'Paternity Leave',
      hi: 'पितृत्व अवकाश',
      zh: '陪产假',
    },

    LOSS_OF_PAY: {
      en: 'Loss of Pay',
      hi: 'बिना वेतन अवकाश',
      zh: '无薪休假',
    },

  };

  const item =
    labels[type];

  if (!item) {
    return type;
  }

  if (language === 'hi') {
    return item.hi;
  }

  if (language === 'zh') {
    return item.zh;
  }

  return item.en;
};


/* =====================================================
   COMPONENT
===================================================== */

function Leaves() {

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
    leaves,
    setLeaves,
  ] = useState<LeaveResponse[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    processing,
    setProcessing,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState('');

  const [
    error,
    setError,
  ] = useState('');

  const [
    success,
    setSuccess,
  ] = useState('');

  const [
    showApplyModal,
    setShowApplyModal,
  ] = useState(false);

  const [
    showViewModal,
    setShowViewModal,
  ] = useState(false);

  const [
    selectedLeave,
    setSelectedLeave,
  ] = useState<LeaveResponse | null>(
    null
  );


  /* =====================================================
     FORM STATES
  ===================================================== */

  const [
    employeeId,
    setEmployeeId,
  ] = useState('');

  const [
    leaveType,
    setLeaveType,
  ] = useState<LeaveType | ''>('');

  const [
    startDate,
    setStartDate,
  ] = useState('');

  const [
    endDate,
    setEndDate,
  ] = useState('');

  const [
    reason,
    setReason,
  ] = useState('');


  /* =====================================================
     LOAD LEAVES
  ===================================================== */

  const loadLeaves = async () => {

    try {

      setLoading(true);

      setError('');

      const data =
        await getLeaves();

      setLeaves(data);

    } catch (err: any) {

      console.error(
        'Leaves API Error:',
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

    loadLeaves();

  }, []);


  /* =====================================================
     STATISTICS
  ===================================================== */

  const total =
    leaves.length;

  const pending =
    leaves.filter(
      item =>
        item.status === 'PENDING'
    ).length;

  const approved =
    leaves.filter(
      item =>
        item.status === 'APPROVED'
    ).length;

  const rejected =
    leaves.filter(
      item =>
        item.status === 'REJECTED'
    ).length;


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredLeaves =
    useMemo(() => {

      const text =
        search.trim().toLowerCase();

      if (!text) {
        return leaves;
      }

      return leaves.filter(
        leave => {

          const employeeName =
            leave.employeeName
              ?.toLowerCase() || '';

          const employeeIdText =
            String(
              leave.employeeId
            );

          const leaveTypeText =
            getLeaveTypeLabel(
              leave.leaveType,
              currentLanguage
            ).toLowerCase();

          const statusText =
            leave.status
              .toLowerCase();

          return (

            employeeName.includes(text)

            ||

            employeeIdText.includes(text)

            ||

            leaveTypeText.includes(text)

            ||

            statusText.includes(text)

            ||

            leave.startDate.includes(text)

            ||

            leave.endDate.includes(text)

          );

        }
      );

    }, [
      leaves,
      search,
      currentLanguage,
    ]);


  /* =====================================================
     RESET FORM
  ===================================================== */

  const resetForm = () => {

    setEmployeeId('');

    setLeaveType('');

    setStartDate('');

    setEndDate('');

    setReason('');

  };


  /* =====================================================
     APPLY LEAVE
  ===================================================== */

  const handleApplyLeave = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

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
      !startDate ||
      !endDate ||
      endDate < startDate
    ) {

      setError(
        t.invalidDates
      );

      return;
    }

    if (!leaveType) {
      return;
    }

    try {

      setProcessing(true);

      setError('');

      setSuccess('');

      await applyLeave({

        employeeId: id,

        leaveType,

        startDate,

        endDate,

        reason,

      });

      resetForm();

      setShowApplyModal(false);

      setSuccess(
        t.successApply
      );

      await loadLeaves();

    } catch (err: any) {

      console.error(
        'Apply Leave Error:',
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
     APPROVE
  ===================================================== */

  const handleApprove = async (
    leave: LeaveResponse
  ) => {

    if (
      !window.confirm(
        t.confirmApprove
      )
    ) {
      return;
    }

    try {

      setProcessing(true);

      setError('');

      setSuccess('');

      await approveLeave(
        leave.id
      );

      setSuccess(
        t.successApprove
      );

      await loadLeaves();

    } catch (err: any) {

      console.error(
        'Approve Leave Error:',
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
     REJECT
  ===================================================== */

  const handleReject = async (
    leave: LeaveResponse
  ) => {

    if (
      !window.confirm(
        t.confirmReject
      )
    ) {
      return;
    }

    try {

      setProcessing(true);

      setError('');

      setSuccess('');

      await rejectLeave(
        leave.id
      );

      setSuccess(
        t.successReject
      );

      await loadLeaves();

    } catch (err: any) {

      console.error(
        'Reject Leave Error:',
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
    leave: LeaveResponse
  ) => {

    setSelectedLeave(
      leave
    );

    setShowViewModal(true);

  };


  /* =====================================================
     DURATION
  ===================================================== */

  const getDuration = (
    start: string,
    end: string
  ) => {

    const startDate =
      new Date(
        `${start}T00:00:00`
      );

    const endDate =
      new Date(
        `${end}T00:00:00`
      );

    const difference =
      endDate.getTime() -
      startDate.getTime();

    return (
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      ) + 1
    );

  };


  /* =====================================================
     STATUS TEXT
  ===================================================== */

  const getStatusText = (
    status: string
  ) => {

    switch (status) {

      case 'PENDING':
        return t.pending;

      case 'APPROVED':
        return t.approved;

      case 'REJECTED':
        return t.rejected;

      default:
        return status;

    }

  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <div className="leaves-page">

        <div className="leaves-loading">

          <div className="leaves-spinner" />

          <p>
            {t.loading}
          </p>

        </div>

      </div>

    );

  }


  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="leaves-page">

      {/* Background */}

      <div className="leaves-dots" />

      <div className="leaves-wave-one" />

      <div className="leaves-wave-two" />


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="leaves-header">

        <div className="leaves-title">

          <div className="leaves-title-icon">

            <FaClipboardList />

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


        <button
          type="button"
          className="apply-leave-button"
          onClick={() => {

            setError('');

            setShowApplyModal(
              true
            );

          }}
        >

          <FaPlus />

          {t.applyLeave}

        </button>

      </div>


      {/* =================================================
          ALERTS
      ================================================= */}

      {error && (

        <div className="leaves-alert error">

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

        <div className="leaves-alert success">

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

      <div className="leaves-stats">

        <div className="leave-stat-card blue">

          <div className="leave-stat-icon">

            <FaClipboardList />

          </div>

          <div>

            <span>
              {t.totalLeaves}
            </span>

            <strong>
              {total}
            </strong>

          </div>

          <div className="leave-stat-circle" />

        </div>


        <div className="leave-stat-card orange">

          <div className="leave-stat-icon">

            <FaClock />

          </div>

          <div>

            <span>
              {t.pending}
            </span>

            <strong>
              {pending}
            </strong>

          </div>

          <div className="leave-stat-circle" />

        </div>


        <div className="leave-stat-card green">

          <div className="leave-stat-icon">

            <FaCheckCircle />

          </div>

          <div>

            <span>
              {t.approved}
            </span>

            <strong>
              {approved}
            </strong>

          </div>

          <div className="leave-stat-circle" />

        </div>


        <div className="leave-stat-card red">

          <div className="leave-stat-icon">

            <FaTimesCircle />

          </div>

          <div>

            <span>
              {t.rejected}
            </span>

            <strong>
              {rejected}
            </strong>

          </div>

          <div className="leave-stat-circle" />

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="leaves-table-card">

        <div className="leaves-toolbar">

          <div className="leaves-search">

            <FaSearch />

            <input
              type="text"
              value={search}
              placeholder={
                t.search
              }
              onChange={event =>
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


        {filteredLeaves.length > 0 ? (

          <div className="leaves-table-wrapper">

            <table className="leaves-table">

              <thead>

                <tr>

                  <th>
                    {t.employee}
                  </th>

                  <th>
                    {t.leaveType}
                  </th>

                  <th>
                    {t.startDate}
                  </th>

                  <th>
                    {t.endDate}
                  </th>

                  <th>
                    {t.duration}
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

                {filteredLeaves.map(
                  leave => (

                    <tr
                      key={leave.id}
                    >

                      {/* Employee */}

                      <td>

                        <div className="leave-employee">

                          <div className="leave-avatar">

                            <FaUsers />

                          </div>

                          <div>

                            <strong>
                              {
                                leave.employeeName
                              }
                            </strong>

                            <small>
                              ID-
                              {
                                leave.employeeId
                              }
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* Type */}

                      <td>

                        <span className="leave-type">

                          {
                            getLeaveTypeLabel(
                              leave.leaveType,
                              currentLanguage
                            )
                          }

                        </span>

                      </td>


                      {/* Start */}

                      <td>
                        {leave.startDate}
                      </td>


                      {/* End */}

                      <td>
                        {leave.endDate}
                      </td>


                      {/* Duration */}

                      <td>

                        <span className="duration-value">

                          <FaCalendarAlt />

                          {
                            getDuration(
                              leave.startDate,
                              leave.endDate
                            )
                          }

                          {' days'}

                        </span>

                      </td>


                      {/* Status */}

                      <td>

                        <span
                          className={
                            `leave-status ${leave.status.toLowerCase()}`
                          }
                        >

                          <span className="status-dot" />

                          {
                            getStatusText(
                              leave.status
                            )
                          }

                        </span>

                      </td>


                      {/* Actions */}

                      <td>

                        <div className="leave-actions">

                          <button
                            type="button"
                            className="leave-view-button"
                            title={t.view}
                            onClick={() =>
                              handleView(
                                leave
                              )
                            }
                          >

                            <FaEye />

                          </button>


                          {leave.status ===
                            'PENDING' && (

                            <>

                              <button
                                type="button"
                                className="leave-approve-button"
                                title={t.approve}
                                disabled={
                                  processing
                                }
                                onClick={() =>
                                  handleApprove(
                                    leave
                                  )
                                }
                              >

                                <FaCheck />

                              </button>


                              <button
                                type="button"
                                className="leave-reject-button"
                                title={t.reject}
                                disabled={
                                  processing
                                }
                                onClick={() =>
                                  handleReject(
                                    leave
                                  )
                                }
                              >

                                <FaTimes />

                              </button>

                            </>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="leaves-empty">

            <div className="leaves-empty-icon">

              <FaClipboardList />

            </div>

            <h3>
              {t.noLeaves}
            </h3>

            <p>
              {t.noLeavesDescription}
            </p>

          </div>

        )}

      </div>


      {/* =================================================
          APPLY LEAVE MODAL
      ================================================= */}

      {showApplyModal && (

        <div
          className="leaves-modal-overlay"
          onMouseDown={event => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setShowApplyModal(
                false
              );

            }

          }}
        >

          <div className="leave-form-modal">

            <div className="leave-modal-header">

              <div className="leave-modal-icon">

                <FaCalendarAlt />

              </div>

              <div>

                <h2>
                  {t.applyNewLeave}
                </h2>

                <p>
                  {t.subtitle}
                </p>

              </div>

              <button
                type="button"
                className="leave-modal-close"
                onClick={() =>
                  setShowApplyModal(
                    false
                  )
                }
              >

                <FaTimes />

              </button>

            </div>


            <form
              onSubmit={
                handleApplyLeave
              }
            >

              <div className="leave-form-body">

                {/* Employee ID */}

                <div className="leave-form-group">

                  <label>
                    {t.employeeId}
                  </label>

                  <input
                    type="number"
                    min="1"
                    placeholder={
                      t.employeeIdPlaceholder
                    }
                    value={
                      employeeId
                    }
                    onChange={event =>
                      setEmployeeId(
                        event.target.value
                      )
                    }
                    required
                  />

                </div>


                {/* Leave Type */}

                <div className="leave-form-group">

                  <label>
                    {t.leaveType}
                  </label>

                  <select
                    value={
                      leaveType
                    }
                    onChange={event =>
                      setLeaveType(
                        event.target.value as LeaveType
                      )
                    }
                    required
                  >

                    <option value="">
                      {
                        t.selectLeaveType
                      }
                    </option>

                    <option value="CASUAL">
                      {getLeaveTypeLabel(
                        'CASUAL',
                        currentLanguage
                      )}
                    </option>

                    <option value="SICK">
                      {getLeaveTypeLabel(
                        'SICK',
                        currentLanguage
                      )}
                    </option>

                    <option value="EARNED">
                      {getLeaveTypeLabel(
                        'EARNED',
                        currentLanguage
                      )}
                    </option>

                    <option value="MATERNITY">
                      {getLeaveTypeLabel(
                        'MATERNITY',
                        currentLanguage
                      )}
                    </option>

                    <option value="PATERNITY">
                      {getLeaveTypeLabel(
                        'PATERNITY',
                        currentLanguage
                      )}
                    </option>

                    <option value="LOSS_OF_PAY">
                      {getLeaveTypeLabel(
                        'LOSS_OF_PAY',
                        currentLanguage
                      )}
                    </option>

                  </select>

                </div>


                {/* Dates */}

                <div className="leave-form-row">

                  <div className="leave-form-group">

                    <label>
                      {t.startDateLabel}
                    </label>

                    <input
                      type="date"
                      value={
                        startDate
                      }
                      onChange={event =>
                        setStartDate(
                          event.target.value
                        )
                      }
                      required
                    />

                  </div>


                  <div className="leave-form-group">

                    <label>
                      {t.endDateLabel}
                    </label>

                    <input
                      type="date"
                      value={
                        endDate
                      }
                      min={
                        startDate ||
                        undefined
                      }
                      onChange={event =>
                        setEndDate(
                          event.target.value
                        )
                      }
                      required
                    />

                  </div>

                </div>


                {/* Reason */}

                <div className="leave-form-group">

                  <label>
                    {t.reason}
                  </label>

                  <textarea
                    rows={4}
                    placeholder={
                      t.reasonPlaceholder
                    }
                    value={
                      reason
                    }
                    onChange={event =>
                      setReason(
                        event.target.value
                      )
                    }
                  />

                </div>

              </div>


              <div className="leave-form-footer">

                <button
                  type="button"
                  className="leave-cancel-button"
                  onClick={() => {

                    resetForm();

                    setShowApplyModal(
                      false
                    );

                  }}
                >

                  {t.cancel}

                </button>


                <button
                  type="submit"
                  className="leave-submit-button"
                  disabled={
                    processing
                  }
                >

                  <FaPlus />

                  {
                    processing
                      ? '...'
                      : t.submit
                  }

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =================================================
          VIEW MODAL
      ================================================= */}

      {showViewModal &&
        selectedLeave && (

        <div
          className="leaves-modal-overlay"
          onMouseDown={event => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setShowViewModal(
                false
              );

            }

          }}
        >

          <div className="leave-view-modal">

            <div className="leave-modal-header">

              <div className="leave-modal-icon">

                <FaClipboardList />

              </div>

              <div>

                <h2>
                  {
                    selectedLeave
                      .employeeName
                  }
                </h2>

                <p>
                  {t.leaveDetails}
                </p>

              </div>


              <button
                type="button"
                className="leave-modal-close"
                onClick={() =>
                  setShowViewModal(
                    false
                  )
                }
              >

                <FaTimes />

              </button>

            </div>


            <div className="leave-detail-grid">

              <div className="leave-detail">

                <span>
                  {t.employeeId}
                </span>

                <strong>
                  {
                    selectedLeave
                      .employeeId
                  }
                </strong>

              </div>


              <div className="leave-detail">

                <span>
                  {t.employee}
                </span>

                <strong>
                  {
                    selectedLeave
                      .employeeName
                  }
                </strong>

              </div>


              <div className="leave-detail">

                <span>
                  {t.leaveType}
                </span>

                <strong>
                  {
                    getLeaveTypeLabel(
                      selectedLeave.leaveType,
                      currentLanguage
                    )
                  }
                </strong>

              </div>


              <div className="leave-detail">

                <span>
                  {t.duration}
                </span>

                <strong>
                  {
                    getDuration(
                      selectedLeave.startDate,
                      selectedLeave.endDate
                    )
                  }
                  {' days'}
                </strong>

              </div>


              <div className="leave-detail">

                <span>
                  {t.startDate}
                </span>

                <strong>
                  {
                    selectedLeave
                      .startDate
                  }
                </strong>

              </div>


              <div className="leave-detail">

                <span>
                  {t.endDate}
                </span>

                <strong>
                  {
                    selectedLeave
                      .endDate
                  }
                </strong>

              </div>


              <div className="leave-detail full">

                <span>
                  {t.reason}
                </span>

                <strong>
                  {
                    selectedLeave.reason ||
                    '--'
                  }
                </strong>

              </div>


              <div className="leave-detail full">

                <span>
                  {t.status}
                </span>

                <strong>

                  <span
                    className={
                      `leave-status ${selectedLeave.status.toLowerCase()}`
                    }
                  >

                    <span className="status-dot" />

                    {
                      getStatusText(
                        selectedLeave.status
                      )
                    }

                  </span>

                </strong>

              </div>

            </div>


            {selectedLeave.status ===
              'PENDING' && (

              <div className="leave-view-actions">

                <button
                  type="button"
                  className="leave-modal-reject"
                  disabled={
                    processing
                  }
                  onClick={() => {

                    setShowViewModal(
                      false
                    );

                    handleReject(
                      selectedLeave
                    );

                  }}
                >

                  <FaTimes />

                  {t.reject}

                </button>


                <button
                  type="button"
                  className="leave-modal-approve"
                  disabled={
                    processing
                  }
                  onClick={() => {

                    setShowViewModal(
                      false
                    );

                    handleApprove(
                      selectedLeave
                    );

                  }}
                >

                  <FaCheck />

                  {t.approve}

                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );
}

export default Leaves;