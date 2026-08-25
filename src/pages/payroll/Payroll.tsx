import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { FormEvent } from 'react';

import {
  FaMoneyBillWave,
  FaPlus,
  FaSearch,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaUserTie,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';

import {
  getPayrolls,
  generatePayroll,
} from '../../services/payrollService';

import type {
  PayrollResponse,
} from '../../services/payrollService';

import { useSettings } from '../../context/SettingsContext';

import './Payroll.css';


/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {

  en: {

    title: 'Payroll',

    subtitle:
      'Manage employee salaries and payroll records',

    generate:
      'Generate Payroll',

    totalPayroll:
      'Total Payroll',

    generated:
      'Generated',

    paid:
      'Paid',

    cancelled:
      'Cancelled',

    search:
      'Search payroll records...',

    employee:
      'Employee',

    month:
      'Month',

    year:
      'Year',

    basicSalary:
      'Basic Salary',

    bonus:
      'Bonus',

    deduction:
      'Deduction',

    netSalary:
      'Net Salary',

    status:
      'Status',

    actions:
      'Actions',

    view:
      'View',

    noPayroll:
      'No payroll records',

    noPayrollDescription:
      'Generated payroll records will appear here.',

    loading:
      'Loading payroll...',

    generateTitle:
      'Generate Payroll',

    employeeId:
      'Employee ID',

    employeeIdPlaceholder:
      'Enter employee ID',

    selectMonth:
      'Select Month',

    selectYear:
      'Select Year',

    bonusLabel:
      'Bonus',

    deductionLabel:
      'Deduction',

    bonusPlaceholder:
      'Enter bonus amount',

    deductionPlaceholder:
      'Enter deduction amount',

    cancel:
      'Cancel',

    generateButton:
      'Generate Payroll',

    payrollDetails:
      'Payroll Details',

    close:
      'Close',

    success:
      'Payroll generated successfully.',

    error:
      'Unable to process payroll.',

    invalidEmployee:
      'Please enter a valid employee ID.',

    invalidMonth:
      'Please select a month.',

    invalidYear:
      'Please select a year.',

    duplicate:
      'Payroll already generated for this month.',

    january:
      'January',

    february:
      'February',

    march:
      'March',

    april:
      'April',

    may:
      'May',

    june:
      'June',

    july:
      'July',

    august:
      'August',

    september:
      'September',

    october:
      'October',

    november:
      'November',

    december:
      'December',

  },


  hi: {

    title: 'पेरोल',

    subtitle:
      'कर्मचारियों के वेतन और पेरोल रिकॉर्ड प्रबंधित करें',

    generate:
      'पेरोल बनाएं',

    totalPayroll:
      'कुल पेरोल',

    generated:
      'जनरेटेड',

    paid:
      'भुगतान किया गया',

    cancelled:
      'रद्द',

    search:
      'पेरोल खोजें...',

    employee:
      'कर्मचारी',

    month:
      'महीना',

    year:
      'वर्ष',

    basicSalary:
      'मूल वेतन',

    bonus:
      'बोनस',

    deduction:
      'कटौती',

    netSalary:
      'नेट वेतन',

    status:
      'स्थिति',

    actions:
      'कार्रवाई',

    view:
      'देखें',

    noPayroll:
      'कोई पेरोल रिकॉर्ड नहीं',

    noPayrollDescription:
      'जनरेट किए गए पेरोल रिकॉर्ड यहां दिखाई देंगे।',

    loading:
      'पेरोल लोड हो रहा है...',

    generateTitle:
      'पेरोल बनाएं',

    employeeId:
      'कर्मचारी ID',

    employeeIdPlaceholder:
      'कर्मचारी ID दर्ज करें',

    selectMonth:
      'महीना चुनें',

    selectYear:
      'वर्ष चुनें',

    bonusLabel:
      'बोनस',

    deductionLabel:
      'कटौती',

    bonusPlaceholder:
      'बोनस राशि दर्ज करें',

    deductionPlaceholder:
      'कटौती राशि दर्ज करें',

    cancel:
      'रद्द करें',

    generateButton:
      'पेरोल बनाएं',

    payrollDetails:
      'पेरोल विवरण',

    close:
      'बंद करें',

    success:
      'पेरोल सफलतापूर्वक जनरेट हुआ।',

    error:
      'पेरोल प्रक्रिया पूरी नहीं हो सकी।',

    invalidEmployee:
      'कृपया सही कर्मचारी ID दर्ज करें।',

    invalidMonth:
      'कृपया महीना चुनें।',

    invalidYear:
      'कृपया वर्ष चुनें।',

    duplicate:
      'इस महीने का पेरोल पहले ही जनरेट हो चुका है.',

    january:
      'जनवरी',

    february:
      'फरवरी',

    march:
      'मार्च',

    april:
      'अप्रैल',

    may:
      'मई',

    june:
      'जून',

    july:
      'जुलाई',

    august:
      'अगस्त',

    september:
      'सितंबर',

    october:
      'अक्टूबर',

    november:
      'नवंबर',

    december:
      'दिसंबर',

  },


  zh: {

    title: '工资管理',

    subtitle:
      '管理员工工资和工资记录',

    generate:
      '生成工资',

    totalPayroll:
      '工资总额',

    generated:
      '已生成',

    paid:
      '已支付',

    cancelled:
      '已取消',

    search:
      '搜索工资记录...',

    employee:
      '员工',

    month:
      '月份',

    year:
      '年份',

    basicSalary:
      '基本工资',

    bonus:
      '奖金',

    deduction:
      '扣除',

    netSalary:
      '净工资',

    status:
      '状态',

    actions:
      '操作',

    view:
      '查看',

    noPayroll:
      '没有工资记录',

    noPayrollDescription:
      '生成的工资记录将显示在这里。',

    loading:
      '正在加载工资...',

    generateTitle:
      '生成工资',

    employeeId:
      '员工 ID',

    employeeIdPlaceholder:
      '输入员工 ID',

    selectMonth:
      '选择月份',

    selectYear:
      '选择年份',

    bonusLabel:
      '奖金',

    deductionLabel:
      '扣除',

    bonusPlaceholder:
      '输入奖金金额',

    deductionPlaceholder:
      '输入扣除金额',

    cancel:
      '取消',

    generateButton:
      '生成工资',

    payrollDetails:
      '工资详情',

    close:
      '关闭',

    success:
      '工资生成成功。',

    error:
      '无法处理工资。',

    invalidEmployee:
      '请输入有效的员工 ID。',

    invalidMonth:
      '请选择月份。',

    invalidYear:
      '请选择年份。',

    duplicate:
      '该月份的工资已经生成。',

    january:
      '一月',

    february:
      '二月',

    march:
      '三月',

    april:
      '四月',

    may:
      '五月',

    june:
      '六月',

    july:
      '七月',

    august:
      '八月',

    september:
      '九月',

    october:
      '十月',

    november:
      '十一月',

    december:
      '十二月',

  },

};


/* =====================================================
   MONTHS
===================================================== */

const monthKeys = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const;


/* =====================================================
   COMPONENT
===================================================== */

function Payroll() {

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
    payrolls,
    setPayrolls,
  ] = useState<PayrollResponse[]>([]);

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
    showGenerateModal,
    setShowGenerateModal,
  ] = useState(false);

  const [
    showViewModal,
    setShowViewModal,
  ] = useState(false);

  const [
    selectedPayroll,
    setSelectedPayroll,
  ] = useState<PayrollResponse | null>(
    null
  );


  /* =====================================================
     FORM
  ===================================================== */

  const [
    employeeId,
    setEmployeeId,
  ] = useState('');

  const [
    month,
    setMonth,
  ] = useState('');

  const [
    year,
    setYear,
  ] = useState('');

  const [
    bonus,
    setBonus,
  ] = useState('');

  const [
    deduction,
    setDeduction,
  ] = useState('');


  /* =====================================================
     LOAD PAYROLL
  ===================================================== */

  const loadPayrolls = async () => {

    try {

      setLoading(true);

      setError('');

      const data =
        await getPayrolls();

      setPayrolls(data);

    } catch (err: any) {

      console.error(
        'Payroll API Error:',
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

    loadPayrolls();

  }, []);


  /* =====================================================
     STATISTICS
  ===================================================== */

  const totalPayroll =
    payrolls.reduce(
      (
        total,
        payroll
      ) =>
        total +
        Number(
          payroll.netSalary
        ),
      0
    );

  const generated =
    payrolls.filter(
      payroll =>
        payroll.status ===
        'GENERATED'
    ).length;

  const paid =
    payrolls.filter(
      payroll =>
        payroll.status ===
        'PAID'
    ).length;

  const cancelled =
    payrolls.filter(
      payroll =>
        payroll.status ===
        'CANCELLED'
    ).length;


  /* =====================================================
     FORMAT MONEY
  ===================================================== */

  const formatMoney = (
    amount: number
  ) => {

    return new Intl.NumberFormat(
      'en-IN',
      {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
      }
    ).format(
      Number(amount || 0)
    );

  };


  /* =====================================================
     MONTH NAME
  ===================================================== */

  const getMonthName = (
    monthNumber: number
  ) => {

    const key =
      monthKeys[
        monthNumber - 1
      ];

    if (!key) {
      return String(
        monthNumber
      );
    }

    return t[key];

  };


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredPayrolls =
    useMemo(() => {

      const text =
        search
          .trim()
          .toLowerCase();

      if (!text) {
        return payrolls;
      }

      return payrolls.filter(
        payroll => {

          const employee =
            payroll.employeeName
              ?.toLowerCase() || '';

          const id =
            String(
              payroll.employeeId
            );

          const monthName =
            getMonthName(
              payroll.month
            ).toLowerCase();

          const yearText =
            String(
              payroll.year
            );

          const status =
            payroll.status
              .toLowerCase();

          return (

            employee.includes(
              text
            )

            ||

            id.includes(
              text
            )

            ||

            monthName.includes(
              text
            )

            ||

            yearText.includes(
              text
            )

            ||

            status.includes(
              text
            )

          );

        }
      );

    }, [
      payrolls,
      search,
      currentLanguage,
    ]);


  /* =====================================================
     RESET
  ===================================================== */

  const resetForm = () => {

    setEmployeeId('');

    setMonth('');

    setYear('');

    setBonus('');

    setDeduction('');

  };


  /* =====================================================
     GENERATE
  ===================================================== */

  const handleGeneratePayroll = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    setError('');

    setSuccess('');


    const employee =
      Number(employeeId);

    const selectedMonth =
      Number(month);

    const selectedYear =
      Number(year);

    const bonusAmount =
      bonus === ''
        ? 0
        : Number(bonus);

    const deductionAmount =
      deduction === ''
        ? 0
        : Number(deduction);


    if (
      !employeeId ||
      Number.isNaN(employee) ||
      employee <= 0
    ) {

      setError(
        t.invalidEmployee
      );

      return;
    }


    if (
      !month ||
      selectedMonth < 1 ||
      selectedMonth > 12
    ) {

      setError(
        t.invalidMonth
      );

      return;
    }


    if (
      !year ||
      selectedYear < 2000
    ) {

      setError(
        t.invalidYear
      );

      return;
    }


    if (
      Number.isNaN(
        bonusAmount
      ) ||
      Number.isNaN(
        deductionAmount
      )
    ) {

      setError(
        t.error
      );

      return;
    }


    try {

      setProcessing(true);

      await generatePayroll({

        employeeId:
          employee,

        month:
          selectedMonth,

        year:
          selectedYear,

        bonus:
          bonusAmount,

        deduction:
          deductionAmount,

      });


      resetForm();

      setShowGenerateModal(
        false
      );

      setSuccess(
        t.success
      );

      await loadPayrolls();

    } catch (err: any) {

      console.error(
        'Generate Payroll Error:',
        err
      );

      const message =
        err?.response?.data
          ?.message;

      if (
        message?.toLowerCase()
          ?.includes(
            'already generated'
          )
      ) {

        setError(
          t.duplicate
        );

      } else {

        setError(
          message ||
          t.error
        );

      }

    } finally {

      setProcessing(false);

    }
  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (
    payroll: PayrollResponse
  ) => {

    setSelectedPayroll(
      payroll
    );

    setShowViewModal(
      true
    );

  };


  /* =====================================================
     STATUS
  ===================================================== */

  const getStatusLabel = (
    status: string
  ) => {

    switch (status) {

      case 'GENERATED':
        return t.generated;

      case 'PAID':
        return t.paid;

      case 'CANCELLED':
        return t.cancelled;

      default:
        return status;

    }

  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <div className="payroll-page">

        <div className="payroll-loading">

          <div className="payroll-spinner" />

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

    <div className="payroll-page">

      <div className="payroll-dots" />

      <div className="payroll-wave-one" />

      <div className="payroll-wave-two" />


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="payroll-header">

        <div className="payroll-title">

          <div className="payroll-title-icon">

            <FaMoneyBillWave />

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
          className="generate-payroll-button"
          onClick={() => {

            setError('');

            setShowGenerateModal(
              true
            );

          }}
        >

          <FaPlus />

          {t.generate}

        </button>

      </div>


      {/* =================================================
          ALERTS
      ================================================= */}

      {error && (

        <div className="payroll-alert error">

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

        <div className="payroll-alert success">

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
          STAT CARDS
      ================================================= */}

      <div className="payroll-stats">

        <div className="payroll-stat-card blue">

          <div className="payroll-stat-icon">

            <FaMoneyBillWave />

          </div>

          <div>

            <span>
              {t.totalPayroll}
            </span>

            <strong>
              {formatMoney(
                totalPayroll
              )}
            </strong>

          </div>

          <div className="payroll-stat-circle" />

        </div>


        <div className="payroll-stat-card purple">

          <div className="payroll-stat-icon">

            <FaClock />

          </div>

          <div>

            <span>
              {t.generated}
            </span>

            <strong>
              {generated}
            </strong>

          </div>

          <div className="payroll-stat-circle" />

        </div>


        <div className="payroll-stat-card green">

          <div className="payroll-stat-icon">

            <FaCheckCircle />

          </div>

          <div>

            <span>
              {t.paid}
            </span>

            <strong>
              {paid}
            </strong>

          </div>

          <div className="payroll-stat-circle" />

        </div>


        <div className="payroll-stat-card red">

          <div className="payroll-stat-icon">

            <FaBan />

          </div>

          <div>

            <span>
              {t.cancelled}
            </span>

            <strong>
              {cancelled}
            </strong>

          </div>

          <div className="payroll-stat-circle" />

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="payroll-table-card">

        <div className="payroll-toolbar">

          <div className="payroll-search">

            <FaSearch />

            <input
              type="text"
              placeholder={
                t.search
              }
              value={search}
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


        {filteredPayrolls.length > 0 ? (

          <div className="payroll-table-wrapper">

            <table className="payroll-table">

              <thead>

                <tr>

                  <th>
                    {t.employee}
                  </th>

                  <th>
                    {t.month}
                  </th>

                  <th>
                    {t.year}
                  </th>

                  <th>
                    {t.basicSalary}
                  </th>

                  <th>
                    {t.bonus}
                  </th>

                  <th>
                    {t.deduction}
                  </th>

                  <th>
                    {t.netSalary}
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

                {filteredPayrolls.map(
                  payroll => (

                    <tr
                      key={
                        payroll.id
                      }
                    >

                      {/* Employee */}

                      <td>

                        <div className="payroll-employee">

                          <div className="payroll-avatar">

                            <FaUserTie />

                          </div>

                          <div>

                            <strong>
                              {
                                payroll.employeeName
                              }
                            </strong>

                            <small>
                              ID-
                              {
                                payroll.employeeId
                              }
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* Month */}

                      <td>

                        <span className="payroll-month">

                          <FaCalendarAlt />

                          {
                            getMonthName(
                              payroll.month
                            )
                          }

                        </span>

                      </td>


                      {/* Year */}

                      <td>

                        <span className="payroll-year">

                          {
                            payroll.year
                          }

                        </span>

                      </td>


                      {/* Basic */}

                      <td>

                        <strong className="salary-basic">

                          {
                            formatMoney(
                              payroll.basicSalary
                            )
                          }

                        </strong>

                      </td>


                      {/* Bonus */}

                      <td>

                        <span className="salary-bonus">

                          <FaArrowUp />

                          +
                          {
                            formatMoney(
                              payroll.bonus
                            )
                          }

                        </span>

                      </td>


                      {/* Deduction */}

                      <td>

                        <span className="salary-deduction">

                          <FaArrowDown />

                          -
                          {
                            formatMoney(
                              payroll.deduction
                            )
                          }

                        </span>

                      </td>


                      {/* Net */}

                      <td>

                        <strong className="salary-net">

                          {
                            formatMoney(
                              payroll.netSalary
                            )
                          }

                        </strong>

                      </td>


                      {/* Status */}

                      <td>

                        <span
                          className={
                            `payroll-status ${payroll.status.toLowerCase()}`
                          }
                        >

                          <span className="payroll-status-dot" />

                          {
                            getStatusLabel(
                              payroll.status
                            )
                          }

                        </span>

                      </td>


                      {/* Action */}

                      <td>

                        <button
                          type="button"
                          className="payroll-view-button"
                          title={t.view}
                          onClick={() =>
                            handleView(
                              payroll
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

          <div className="payroll-empty">

            <div className="payroll-empty-icon">

              <FaMoneyBillWave />

            </div>

            <h3>
              {t.noPayroll}
            </h3>

            <p>
              {t.noPayrollDescription}
            </p>

          </div>

        )}

      </div>


      {/* =================================================
          GENERATE MODAL
      ================================================= */}

      {showGenerateModal && (

        <div
          className="payroll-modal-overlay"
          onMouseDown={event => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setShowGenerateModal(
                false
              );

            }

          }}
        >

          <div className="payroll-form-modal">

            <div className="payroll-modal-header">

              <div className="payroll-modal-icon">

                <FaMoneyBillWave />

              </div>

              <div>

                <h2>
                  {t.generateTitle}
                </h2>

                <p>
                  {t.subtitle}
                </p>

              </div>


              <button
                type="button"
                className="payroll-modal-close"
                onClick={() =>
                  setShowGenerateModal(
                    false
                  )
                }
              >

                <FaTimes />

              </button>

            </div>


            <form
              onSubmit={
                handleGeneratePayroll
              }
            >

              <div className="payroll-form-body">

                {/* Employee */}

                <div className="payroll-form-group">

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


                {/* Month + Year */}

                <div className="payroll-form-row">

                  <div className="payroll-form-group">

                    <label>
                      {t.month}
                    </label>

                    <select
                      value={
                        month
                      }
                      onChange={event =>
                        setMonth(
                          event.target.value
                        )
                      }
                      required
                    >

                      <option value="">
                        {t.selectMonth}
                      </option>

                      {monthKeys.map(
                        (
                          key,
                          index
                        ) => (

                          <option
                            key={key}
                            value={
                              index + 1
                            }
                          >

                            {
                              t[key]
                            }

                          </option>

                        )
                      )}

                    </select>

                  </div>


                  <div className="payroll-form-group">

                    <label>
                      {t.year}
                    </label>

                    <select
                      value={
                        year
                      }
                      onChange={event =>
                        setYear(
                          event.target.value
                        )
                      }
                      required
                    >

                      <option value="">
                        {t.selectYear}
                      </option>

                      {Array.from(
                        {
                          length: 6,
                        },
                        (
                          _,
                          index
                        ) =>
                          2026 +
                          index
                      ).map(
                        yearValue => (

                          <option
                            key={
                              yearValue
                            }
                            value={
                              yearValue
                            }
                          >

                            {
                              yearValue
                            }

                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>


                {/* Bonus + Deduction */}

                <div className="payroll-form-row">

                  <div className="payroll-form-group">

                    <label>
                      {t.bonusLabel}
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder={
                        t.bonusPlaceholder
                      }
                      value={
                        bonus
                      }
                      onChange={event =>
                        setBonus(
                          event.target.value
                        )
                      }
                    />

                  </div>


                  <div className="payroll-form-group">

                    <label>
                      {t.deductionLabel}
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder={
                        t.deductionPlaceholder
                      }
                      value={
                        deduction
                      }
                      onChange={event =>
                        setDeduction(
                          event.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>


              <div className="payroll-form-footer">

                <button
                  type="button"
                  className="payroll-cancel-button"
                  onClick={() => {

                    resetForm();

                    setShowGenerateModal(
                      false
                    );

                  }}
                >

                  {t.cancel}

                </button>


                <button
                  type="submit"
                  className="payroll-submit-button"
                  disabled={
                    processing
                  }
                >

                  <FaPlus />

                  {
                    processing
                      ? '...'
                      : t.generateButton
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
        selectedPayroll && (

        <div
          className="payroll-modal-overlay"
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

          <div className="payroll-view-modal">

            <div className="payroll-modal-header">

              <div className="payroll-modal-icon">

                <FaMoneyBillWave />

              </div>

              <div>

                <h2>
                  {
                    selectedPayroll.employeeName
                  }
                </h2>

                <p>
                  {t.payrollDetails}
                </p>

              </div>


              <button
                type="button"
                className="payroll-modal-close"
                onClick={() =>
                  setShowViewModal(
                    false
                  )
                }
              >

                <FaTimes />

              </button>

            </div>


            <div className="payroll-detail-grid">

              <div className="payroll-detail">

                <span>
                  {t.employeeId}
                </span>

                <strong>
                  {
                    selectedPayroll.employeeId
                  }
                </strong>

              </div>


              <div className="payroll-detail">

                <span>
                  {t.employee}
                </span>

                <strong>
                  {
                    selectedPayroll.employeeName
                  }
                </strong>

              </div>


              <div className="payroll-detail">

                <span>
                  {t.month}
                </span>

                <strong>
                  {
                    getMonthName(
                      selectedPayroll.month
                    )
                  }
                </strong>

              </div>


              <div className="payroll-detail">

                <span>
                  {t.year}
                </span>

                <strong>
                  {
                    selectedPayroll.year
                  }
                </strong>

              </div>


              <div className="payroll-detail">

                <span>
                  {t.basicSalary}
                </span>

                <strong>
                  {
                    formatMoney(
                      selectedPayroll.basicSalary
                    )
                  }
                </strong>

              </div>


              <div className="payroll-detail">

                <span>
                  {t.bonus}
                </span>

                <strong className="detail-bonus">

                  +
                  {
                    formatMoney(
                      selectedPayroll.bonus
                    )
                  }

                </strong>

              </div>


              <div className="payroll-detail">

                <span>
                  {t.deduction}
                </span>

                <strong className="detail-deduction">

                  -
                  {
                    formatMoney(
                      selectedPayroll.deduction
                    )
                  }

                </strong>

              </div>


              <div className="payroll-detail">

                <span>
                  {t.status}
                </span>

                <strong>

                  <span
                    className={
                      `payroll-status ${selectedPayroll.status.toLowerCase()}`
                    }
                  >

                    <span className="payroll-status-dot" />

                    {
                      getStatusLabel(
                        selectedPayroll.status
                      )
                    }

                  </span>

                </strong>

              </div>


              <div className="payroll-detail payroll-net-detail">

                <span>
                  {t.netSalary}
                </span>

                <strong>
                  {
                    formatMoney(
                      selectedPayroll.netSalary
                    )
                  }
                </strong>

              </div>

            </div>


            <div className="payroll-view-footer">

              <button
                type="button"
                onClick={() =>
                  setShowViewModal(
                    false
                  )
                }
              >

                {t.close}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default Payroll;