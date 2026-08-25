import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  FaUsers,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaPhone,
  FaBriefcase,
  FaCalendarAlt,
  FaTimes,
} from 'react-icons/fa';

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  type EmployeeRequest,
  type EmployeeResponse,
} from '../../services/employeeService';

import {
  getDepartments,
  type DepartmentResponse,
} from '../../services/departmentService';

import './Employ.css';
import { useSettings } from '../../context/SettingsContext';


/* =====================================================
   EMPTY FORM
===================================================== */

const emptyForm: EmployeeRequest = {

  employeeCode: '',

  firstName: '',

  lastName: '',

  phone: '',

  gender: '',

  dateOfBirth: '',

  joiningDate: '',

  designation: '',

  salary: 0,

  address: '',

  email: '',

  password: '',

  departmentId: 0,
};

const translations = {
  en: {
    loading: 'Loading employees...', title: 'Employees', description: "Manage your organization's employees",
    addEmployee: 'Add Employee', totalEmployees: 'Total Employees', active: 'Active', inactive: 'Inactive', resigned: 'Resigned',
    search: 'Search employees...', allStatus: 'All Status', noEmployees: 'No employees found', tryDifferentSearch: 'Try a different search.', startAdding: 'Start by adding your first employee.',
    employee: 'Employee', code: 'Code', phone: 'Phone', designation: 'Designation', joiningDate: 'Joining Date', salary: 'Salary', status: 'Status', actions: 'Actions', selectDepartment: 'Select department',
    editEmployee: 'Edit Employee', addNewEmployee: 'Add New Employee', updateInfo: 'Update employee information', enterInfo: 'Enter employee information', employeeCode: 'Employee Code', firstName: 'First Name', lastName: 'Last Name', gender: 'Gender', selectGender: 'Select gender', male: 'Male', female: 'Female', other: 'Other', dateOfBirth: 'Date of Birth', email: 'Email', password: 'Password', department: 'Department', userAccount: 'User Account', employeeLogin: 'Login credentials for this employee', address: 'Address', cancel: 'Cancel', saving: 'Saving...', update: 'Update Employee', noAddress: 'No address provided', view: 'View', edit: 'Edit', delete: 'Delete', deleteConfirm: 'Are you sure you want to delete this employee?', loadError: 'Unable to load employees.', saveError: 'Unable to save employee.', deleteError: 'Unable to delete employee.',
  },
  hi: {
    loading: 'कर्मचारी लोड हो रहे हैं...', title: 'कर्मचारी', description: 'अपने संगठन के कर्मचारियों का प्रबंधन करें',
    addEmployee: 'कर्मचारी जोड़ें', totalEmployees: 'कुल कर्मचारी', active: 'सक्रिय', inactive: 'निष्क्रिय', resigned: 'इस्तीफा दे चुके',
    search: 'कर्मचारियों को खोजें...', allStatus: 'सभी स्थिति', noEmployees: 'कोई कर्मचारी नहीं मिला', tryDifferentSearch: 'कोई दूसरा खोज शब्द आज़माएं।', startAdding: 'अपने पहले कर्मचारी को जोड़कर शुरुआत करें।',
    employee: 'कर्मचारी', code: 'कोड', phone: 'फ़ोन', designation: 'पद', joiningDate: 'शामिल होने की तारीख', salary: 'वेतन', status: 'स्थिति', actions: 'कार्यवाही', selectDepartment: 'विभाग चुनें',
    editEmployee: 'कर्मचारी संपादित करें', addNewEmployee: 'नया कर्मचारी जोड़ें', updateInfo: 'कर्मचारी की जानकारी अपडेट करें', enterInfo: 'कर्मचारी की जानकारी दर्ज करें', employeeCode: 'कर्मचारी कोड', firstName: 'पहला नाम', lastName: 'उपनाम', gender: 'लिंग', selectGender: 'लिंग चुनें', male: 'पुरुष', female: 'महिला', other: 'अन्य', dateOfBirth: 'जन्म तिथि', email: 'ईमेल', password: 'पासवर्ड', department: 'विभाग', userAccount: 'यूज़र अकाउंट', employeeLogin: 'इस कर्मचारी के लॉगिन की जानकारी', address: 'पता', cancel: 'रद्द करें', saving: 'सेव हो रहा है...', update: 'कर्मचारी अपडेट करें', noAddress: 'पता उपलब्ध नहीं है', view: 'देखें', edit: 'संपादित करें', delete: 'हटाएं', deleteConfirm: 'क्या आप इस कर्मचारी को हटाना चाहते हैं?', loadError: 'कर्मचारी लोड नहीं हो सके।', saveError: 'कर्मचारी सेव नहीं हो सका।', deleteError: 'कर्मचारी हटाया नहीं जा सका।',
  },
  zh: {
    loading: '正在加载员工...', title: '员工', description: '管理员工信息',
    addEmployee: '添加员工', totalEmployees: '员工总数', active: '在职', inactive: '停用', resigned: '已离职',
    search: '搜索员工...', allStatus: '全部状态', noEmployees: '未找到员工', tryDifferentSearch: '请尝试其他搜索词。', startAdding: '先添加您的第一位员工。',
    employee: '员工', code: '编号', phone: '电话', designation: '职位', joiningDate: '入职日期', salary: '薪资', status: '状态', actions: '操作', selectDepartment: '选择部门',
    editEmployee: '编辑员工', addNewEmployee: '添加新员工', updateInfo: '更新员工信息', enterInfo: '输入员工信息', employeeCode: '员工编号', firstName: '名', lastName: '姓', gender: '性别', selectGender: '选择性别', male: '男', female: '女', other: '其他', dateOfBirth: '出生日期', email: '电子邮箱', password: '密码', department: '部门', userAccount: '用户账户', employeeLogin: '此员工的登录信息', address: '地址', cancel: '取消', saving: '正在保存...', update: '更新员工', noAddress: '未提供地址', view: '查看', edit: '编辑', delete: '删除', deleteConfirm: '确定要删除这名员工吗？', loadError: '无法加载员工。', saveError: '无法保存员工。', deleteError: '无法删除员工。',
  },
};


function Employees() {

  /* ===================================================
     STATES
  =================================================== */

  const [employees, setEmployees] =
    useState<EmployeeResponse[]>([]);

const [departments, setDepartments] =
  useState<DepartmentResponse[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [search, setSearch] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('ALL');

  const [showModal, setShowModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeResponse | null>(null);

  const [form, setForm] =
    useState<EmployeeRequest>(emptyForm);

  const [saving, setSaving] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState<number | null>(null);

  const { language } = useSettings();
  const text = translations[language];

  const getStatusLabel = (status: string) => {
    if (status === 'ACTIVE') return text.active;
    if (status === 'INACTIVE') return text.inactive;
    if (status === 'RESIGNED') return text.resigned;
    return status;
  };


  /* ===================================================
     LOAD EMPLOYEES
  =================================================== */

  const loadEmployees = async () => {

    try {

      setLoading(true);

      setError('');

      const [
        employeeData,
        departmentData,
      ] = await Promise.all([
        getEmployees(),
        getDepartments(),
      ]);

      setEmployees(employeeData);
      setDepartments(departmentData);

    } catch (error: any) {

      console.error(
        'Employees API Error:',
        error
      );

      setError(
        error?.response?.data?.message ||
        text.loadError
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadEmployees();

  }, []);


  /* ===================================================
     FILTER
  =================================================== */

  const filteredEmployees =
    useMemo(() => {

      return employees.filter(
        employee => {

          const fullName =
            `${employee.firstName} ${employee.lastName}`
              .toLowerCase();

          const searchValue =
            search.toLowerCase().trim();

          const matchesSearch =
            fullName.includes(searchValue) ||
            employee.employeeCode
              .toLowerCase()
              .includes(searchValue) ||
            employee.designation
              .toLowerCase()
              .includes(searchValue) ||
            employee.phone
              .toLowerCase()
              .includes(searchValue);

          const matchesStatus =
            statusFilter === 'ALL' ||
            employee.status === statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    }, [
      employees,
      search,
      statusFilter,
    ]);


  /* ===================================================
     COUNTS
  =================================================== */

  const totalEmployees =
    employees.length;

  const activeEmployees =
    employees.filter(
      employee =>
        employee.status === 'ACTIVE'
    ).length;

  const inactiveEmployees =
    employees.filter(
      employee =>
        employee.status === 'INACTIVE'
    ).length;

  const resignedEmployees =
    employees.filter(
      employee =>
        employee.status === 'RESIGNED'
    ).length;


  /* ===================================================
     OPEN ADD
  =================================================== */

  const openAddModal = () => {

    setEditingId(null);

    setForm({
      ...emptyForm,
    });

    setShowModal(true);
  };


  /* ===================================================
     OPEN EDIT
  =================================================== */

  const openEditModal = (
    employee: EmployeeResponse
  ) => {

    setEditingId(employee.id);

    setForm({
      employeeCode:
        employee.employeeCode,

      firstName:
        employee.firstName,

      lastName:
        employee.lastName,

      phone:
        employee.phone,

      gender:
        employee.gender,

      dateOfBirth:
        employee.dateOfBirth,

      joiningDate:
        employee.joiningDate,

      designation:
        employee.designation,

      salary:
        employee.salary,

      address:
        employee.address || '',

      email: '',

      password: '',

      departmentId: 0,
    });

    setShowModal(true);
  };


  /* ===================================================
     VIEW
  =================================================== */

  const openViewModal = (
    employee: EmployeeResponse
  ) => {

    setSelectedEmployee(employee);

    setShowViewModal(true);
  };


  /* ===================================================
     CLOSE
  =================================================== */

  const closeModal = () => {

    if (saving) {
      return;
    }

    setShowModal(false);

    setEditingId(null);

    setForm({
      ...emptyForm,
    });
  };


  /* ===================================================
     INPUT CHANGE
  =================================================== */

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    const {
      name,
      value,
    } = event.target;

    setForm(
      previous => ({
        ...previous,

        [name]:
          name === 'salary' ||
          name === 'departmentId'
            ? Number(value)
            : value,
      })
    );
  };


  /* ===================================================
     SAVE
  =================================================== */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    try {

      setSaving(true);

      if (editingId) {

        await updateEmployee(
          editingId,
          form
        );

      } else {

        await addEmployee(form);

      }

      closeModal();

      await loadEmployees();

    } catch (error: any) {

      console.error(
        'Employee Save Error:',
        error
      );

      alert(
        error?.response?.data?.message ||
        text.saveError
      );

    } finally {

      setSaving(false);

    }
  };


  /* ===================================================
     DELETE
  =================================================== */

  const handleDelete = async (
    id: number
  ) => {

    const confirmed =
      window.confirm(
        text.deleteConfirm
      );

    if (!confirmed) {
      return;
    }

    try {

      setDeleteLoading(id);

      await deleteEmployee(id);

      setEmployees(
        previous =>
          previous.filter(
            employee =>
              employee.id !== id
          )
      );

    } catch (error: any) {

      console.error(
        'Delete Employee Error:',
        error
      );

      alert(
        error?.response?.data?.message ||
        text.deleteError
      );

    } finally {

      setDeleteLoading(null);

    }
  };


  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {

    return (
      <div className="employees-loading">

        <div
          className="spinner-border"
          role="status"
        />

        <p>
          {text.loading}
        </p>

      </div>
    );
  }


  /* ===================================================
     UI
  =================================================== */

  return (

    <div className="employees-page">


      {/* Background */}

      <div className="employees-bg-dots" />

      <div className="employees-bg-wave employees-wave-one" />

      <div className="employees-bg-wave employees-wave-two" />


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="employees-header">

        <div>

          <div className="employees-title-row">

            <div className="employees-title-icon">
              <FaUsers />
            </div>

            <div>

              <h1>
                {text.title}
              </h1>

              <p>
                {text.description}
              </p>

            </div>

          </div>

        </div>


        <button
          type="button"
          className="add-employee-btn"
          onClick={openAddModal}
        >

          <FaPlus />

          <span>
            {text.addEmployee}
          </span>

        </button>

      </div>


      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="employee-stats">


        {/* Total */}

        <div className="employee-stat-card stat-blue">

          <div className="employee-stat-icon stat-icon">
            <FaUsers />
          </div>

          <div className="stat-content">

            <span>
              {text.totalEmployees}
            </span>

            <strong>
              {totalEmployees}
            </strong>

          </div>

          <div className="stat-circle" />

        </div>


        {/* Active */}

        <div className="employee-stat-card stat-green">

          <div className="employee-stat-icon stat-icon">
              ✓
          </div>

          <div className="stat-content">

            <span>
              {text.active}
            </span>

            <strong>
              {activeEmployees}
            </strong>

          </div>

          <div className="stat-circle" />

        </div>


        {/* Inactive */}

        <div className="employee-stat-card stat-orange">

          <div className="employee-stat-icon stat-icon">
            ⏸
          </div>

          <div className="stat-content">

            <span>
              {text.inactive}
            </span>

            <strong>
              {inactiveEmployees}
            </strong>

          </div>

          <div className="stat-circle" />

        </div>


        {/* Resigned */}

        <div className="employee-stat-card stat-purple">

          <div className="employee-stat-icon stat-icon">
            ↗
          </div>

          <div className="stat-content">

            <span>
              {text.resigned}
            </span>

            <strong>
              {resignedEmployees}
            </strong>

          </div>

          <div className="stat-circle" />

        </div>

      </div>


      {/* =================================================
          TABLE CARD
      ================================================= */}

      <div className="employees-table-card">


        {/* Toolbar */}

        <div className="employees-toolbar">

          <div className="employee-search">

            <FaSearch />

            <input
              type="text"
              placeholder={text.search}
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


          <div className="employee-filter">

            <select
              value={statusFilter}
              onChange={event =>
                setStatusFilter(
                  event.target.value
                )
              }
            >

              <option value="ALL">
                {text.allStatus}
              </option>

              <option value="ACTIVE">
                {text.active}
              </option>

              <option value="INACTIVE">
                {text.inactive}
              </option>

              <option value="RESIGNED">
                {text.resigned}
              </option>

            </select>

          </div>

        </div>


        {/* Error */}

        {error && (

          <div className="employee-error">
            {error}
          </div>

        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {filteredEmployees.length === 0 ? (

          <div className="employees-empty">

            <div className="empty-icon">
              <FaUsers />
            </div>

            <h3>
              {text.noEmployees}
            </h3>

            <p>
              {search
                ? text.tryDifferentSearch
                : text.startAdding}
            </p>

            {!search && (

              <button
                type="button"
                onClick={openAddModal}
                className="empty-add-btn"
              >
                <FaPlus />
                {text.addEmployee}
              </button>

            )}

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="employee-table-wrapper">

            <table className="employee-table">

              <thead>

                <tr>

                  <th>
                    {text.employee}
                  </th>

                  <th>
                    {text.code}
                  </th>

                  <th>
                    {text.phone}
                  </th>

                  <th>
                    {text.designation}
                  </th>

                  <th>
                    {text.joiningDate}
                  </th>

                  <th>
                    {text.salary}
                  </th>

                  <th>
                    {text.status}
                  </th>

                  <th>
                    {text.actions}
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredEmployees.map(
                  employee => (

                    <tr
                      key={employee.id}
                    >

                      {/* Employee */}

                      <td>

                        <div className="employee-info">

                          <div className="employee-avatar">
                            {employee.firstName
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {
                                employee.firstName
                              }{' '}
                              {
                                employee.lastName
                              }
                            </strong>

                            <span>
                              {employee.gender}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* Code */}

                      <td>

                        <span className="employee-code">
                          {
                            employee.employeeCode
                          }
                        </span>

                      </td>


                      {/* Phone */}

                      <td>

                        <div className="employee-phone">

                          <FaPhone />

                          {
                            employee.phone
                          }

                        </div>

                      </td>


                      {/* Designation */}

                      <td>

                        <div className="employee-designation">

                          <FaBriefcase />

                          {
                            employee.designation
                          }

                        </div>

                      </td>


                      {/* Joining */}

                      <td>

                        <div className="employee-date">

                          <FaCalendarAlt />

                          {
                            employee.joiningDate
                          }

                        </div>

                      </td>


                      {/* Salary */}

                      <td>

                        <strong className="employee-salary">

                          ₹
                          {Number(
                            employee.salary
                          ).toLocaleString(
                            'en-IN'
                          )}

                        </strong>

                      </td>


                      {/* Status */}

                      <td>

                        <span
                          className={`employee-status ${employee.status.toLowerCase()}`}
                        >
                          {getStatusLabel(employee.status)}
                        </span>

                      </td>


                      {/* Actions */}

                      <td>

                        <div className="employee-actions">

                          <button
                            type="button"
                            className="view-action"
                            title={text.view}
                            onClick={() =>
                              openViewModal(
                                employee
                              )
                            }
                          >
                            <FaEye />
                          </button>


                          <button
                            type="button"
                            className="edit-action"
                            title={text.edit}
                            onClick={() =>
                              openEditModal(
                                employee
                              )
                            }
                          >
                            <FaEdit />
                          </button>


                          <button
                            type="button"
                            className="delete-action"
                            title={text.delete}
                            disabled={
                              deleteLoading ===
                              employee.id
                            }
                            onClick={() =>
                              handleDelete(
                                employee.id
                              )
                            }
                          >
                            {deleteLoading ===
                            employee.id ? (
                              <span className="mini-spinner" />
                            ) : (
                              <FaTrash />
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div className="employee-modal-overlay">

          <div className="employee-modal">

            {/* Modal Header */}

            <div className="employee-modal-header">

              <div>

                <h2>
                  {editingId
                    ? text.editEmployee
                    : text.addNewEmployee}
                </h2>

                <p>
                  {editingId
                    ? text.updateInfo
                    : text.enterInfo}
                </p>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
              >
                <FaTimes />
              </button>

            </div>


            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="employee-form"
            >

              <div className="employee-form-grid">


                {/* Employee Code */}

                <div className="employee-form-field">

                  <label>
                    {text.employeeCode} *
                  </label>

                  <input
                    type="text"
                    name="employeeCode"
                    value={
                      form.employeeCode
                    }
                    onChange={handleChange}
                    placeholder="EMP001"
                    required
                  />

                </div>


                {/* First Name */}

                <div className="employee-form-field">

                  <label>
                    {text.firstName} *
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={
                      form.firstName
                    }
                    onChange={handleChange}
                    placeholder={text.firstName}
                    required
                  />

                </div>


                {/* Last Name */}

                <div className="employee-form-field">

                  <label>
                    {text.lastName} *
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={
                      form.lastName
                    }
                    onChange={handleChange}
                    placeholder={text.lastName}
                    required
                  />

                </div>


                {/* Phone */}

                <div className="employee-form-field">

                  <label>
                    {text.phone} *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={
                      form.phone
                    }
                    onChange={handleChange}
                    placeholder="9876543210"
                    required
                  />

                </div>


                {/* Gender */}

                <div className="employee-form-field">

                  <label>
                    {text.gender} *
                  </label>

                  <select
                    name="gender"
                    value={
                      form.gender
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      {text.selectGender}
                    </option>

                    <option value="MALE">
                      {text.male}
                    </option>

                    <option value="FEMALE">
                      {text.female}
                    </option>

                    <option value="OTHER">
                      {text.other}
                    </option>

                  </select>

                </div>


                {/* Designation */}

                <div className="employee-form-field">

                  <label>
                    {text.designation} *
                  </label>

                  <input
                    type="text"
                    name="designation"
                    value={
                      form.designation
                    }
                    onChange={handleChange}
                    placeholder={text.designation}
                    required
                  />

                </div>


                {/* DOB */}

                <div className="employee-form-field">

                  <label>
                    {text.dateOfBirth} *
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={
                      form.dateOfBirth
                    }
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Joining */}

                <div className="employee-form-field">

                  <label>
                    {text.joiningDate} *
                  </label>

                  <input
                    type="date"
                    name="joiningDate"
                    value={
                      form.joiningDate
                    }
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Salary */}

                <div className="employee-form-field">

                  <label>
                    {text.salary} *
                  </label>

                  <div className="salary-input">

                    <span>
                      ₹
                    </span>

                    <input
                      type="number"
                      name="salary"
                      min="0"
                      value={
                        form.salary || ''
                      }
                      onChange={handleChange}
                      placeholder="35000"
                      required
                    />

                  </div>

                </div>


                {/* Login Email */}

                <div className="employee-form-field">

                  <label>
                    {text.email} *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={text.email}
                    required
                  />

                </div>


                {/* Login Password */}

                <div className="employee-form-field">

                  <label>
                    {text.password} *
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder={text.password}
                    required={!editingId}
                  />

                </div>


                {/* Department */}

                <div className="employee-form-field">

                  <label>
                    {text.department} *
                  </label>

                  <select
                    name="departmentId"
                    value={form.departmentId}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      {text.selectDepartment}
                    </option>

                    {departments.map(department => (
                      <option
                        key={department.id}
                        value={department.id}
                      >
                        {department.departmentName}
                      </option>
                    ))}

                  </select>

                </div>


                {/* Address */}

                <div className="employee-form-field full">

                  <label>
                    {text.address}
                  </label>

                  <textarea
                    name="address"
                    value={
                      form.address
                    }
                    onChange={handleChange}
                    placeholder={text.address}
                    rows={3}
                  />

                </div>

              </div>


              {/* Buttons */}

              <div className="employee-form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                  disabled={saving}
                >
                  {text.cancel}
                </button>

                <button
                  type="submit"
                  className="save-employee-btn"
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <span className="mini-spinner" />
                      {text.saving}
                    </>
                  ) : (
                    editingId
                      ? text.update
                      : text.addEmployee
                  )}

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
        selectedEmployee && (

        <div className="employee-modal-overlay">

          <div className="employee-view-modal">

            <div className="employee-view-header">

              <div className="employee-view-avatar">

                {
                  selectedEmployee.firstName
                    .charAt(0)
                    .toUpperCase()
                }

              </div>

              <div>

                <h2>

                  {
                    selectedEmployee.firstName
                  }{' '}

                  {
                    selectedEmployee.lastName
                  }

                </h2>

                <p>
                  {
                    selectedEmployee
                      .employeeCode
                  }
                </p>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                <FaTimes />
              </button>

            </div>


            <div className="employee-view-body">

              <div className="view-detail">

                <span>
                  {text.phone}
                </span>

                <strong>
                  {
                    selectedEmployee.phone
                  }
                </strong>

              </div>


              <div className="view-detail">

                <span>
                  {text.gender}
                </span>

                <strong>
                  {
                    selectedEmployee.gender
                  }
                </strong>

              </div>


              <div className="view-detail">

                <span>
                  {text.dateOfBirth}
                </span>

                <strong>
                  {
                    selectedEmployee
                      .dateOfBirth
                  }
                </strong>

              </div>


              <div className="view-detail">

                <span>
                  {text.joiningDate}
                </span>

                <strong>
                  {
                    selectedEmployee
                      .joiningDate
                  }
                </strong>

              </div>


              <div className="view-detail">

                <span>
                  {text.designation}
                </span>

                <strong>
                  {
                    selectedEmployee
                      .designation
                  }
                </strong>

              </div>


              <div className="view-detail">

                <span>
                  {text.salary}
                </span>

                <strong>
                  ₹
                  {Number(
                    selectedEmployee.salary
                  ).toLocaleString(
                    'en-IN'
                  )}
                </strong>

              </div>


              <div className="view-detail">

                <span>
                  {text.status}
                </span>

                <span
                  className={`employee-status ${selectedEmployee.status.toLowerCase()}`}
                >
                  {
                    getStatusLabel(selectedEmployee.status)
                  }
                </span>

              </div>


              <div className="view-detail full">

                <span>
                  {text.address}
                </span>

                <strong>
                  {
                    selectedEmployee.address ||
                    text.noAddress
                  }
                </strong>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Employees;