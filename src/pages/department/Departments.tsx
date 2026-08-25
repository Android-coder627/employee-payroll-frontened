import {
  useEffect,
  useState,
} from 'react';

import type {
  FormEvent,
} from 'react';

import {
  FaBuilding,
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUsers,
} from 'react-icons/fa';

import {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from '../../services/departmentService';

import type {
  DepartmentRequest,
  DepartmentResponse,
} from '../../services/departmentService';

import { useSettings } from '../../context/SettingsContext';

import './Departments.css';


/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {

  en: {
    title: 'Departments',
    subtitle:
      "Manage your organization's departments",

    addDepartment: 'Add Department',

    totalDepartments: 'Total Departments',
    activeDepartments: 'Active Departments',
    emptyDepartments: 'Empty Departments',
    overview: 'Department Overview',

    search: 'Search departments...',

    department: 'Department',
    description: 'Description',
    actions: 'Actions',

    departmentName: 'Department Name',
    departmentDescription:
      'Department Description',

    namePlaceholder:
      'Enter department name',

    descriptionPlaceholder:
      'Enter department description',

    cancel: 'Cancel',
    save: 'Save Department',
    update: 'Update Department',

    view: 'View',
    edit: 'Edit',
    delete: 'Delete',

    close: 'Close',

    noDepartments:
      'No departments found',

    noDepartmentsDescription:
      'Create your first department to get started.',

    loading:
      'Loading departments...',

    deleteConfirm:
      'Are you sure you want to delete this department?',

    required:
      'Department name is required.',

    loadError:
      'Unable to load departments.',

    saveError:
      'Unable to save department.',

    deleteError:
      'Unable to delete department.',
  },


  hi: {
    title: 'विभाग',

    subtitle:
      'अपनी संस्था के विभागों का प्रबंधन करें',

    addDepartment:
      'विभाग जोड़ें',

    totalDepartments:
      'कुल विभाग',

    activeDepartments:
      'सक्रिय विभाग',

    emptyDepartments:
      'खाली विभाग',

    overview:
      'विभाग विवरण',

    search:
      'विभाग खोजें...',

    department:
      'विभाग',

    description:
      'विवरण',

    actions:
      'कार्रवाई',

    departmentName:
      'विभाग का नाम',

    departmentDescription:
      'विभाग का विवरण',

    namePlaceholder:
      'विभाग का नाम दर्ज करें',

    descriptionPlaceholder:
      'विभाग का विवरण दर्ज करें',

    cancel:
      'रद्द करें',

    save:
      'विभाग सहेजें',

    update:
      'विभाग अपडेट करें',

    view:
      'देखें',

    edit:
      'संपादित करें',

    delete:
      'हटाएं',

    close:
      'बंद करें',

    noDepartments:
      'कोई विभाग नहीं मिला',

    noDepartmentsDescription:
      'शुरू करने के लिए अपना पहला विभाग बनाएं।',

    loading:
      'विभाग लोड हो रहे हैं...',

    deleteConfirm:
      'क्या आप वाकई इस विभाग को हटाना चाहते हैं?',

    required:
      'विभाग का नाम आवश्यक है।',

    loadError:
      'विभाग लोड नहीं हो सके।',

    saveError:
      'विभाग सेव नहीं हो सका।',

    deleteError:
      'विभाग हटाया नहीं जा सका।',
  },


  zh: {
    title: '部门',

    subtitle:
      '管理您的组织部门',

    addDepartment:
      '添加部门',

    totalDepartments:
      '部门总数',

    activeDepartments:
      '活跃部门',

    emptyDepartments:
      '空部门',

    overview:
      '部门概览',

    search:
      '搜索部门...',

    department:
      '部门',

    description:
      '描述',

    actions:
      '操作',

    departmentName:
      '部门名称',

    departmentDescription:
      '部门描述',

    namePlaceholder:
      '输入部门名称',

    descriptionPlaceholder:
      '输入部门描述',

    cancel:
      '取消',

    save:
      '保存部门',

    update:
      '更新部门',

    view:
      '查看',

    edit:
      '编辑',

    delete:
      '删除',

    close:
      '关闭',

    noDepartments:
      '没有找到部门',

    noDepartmentsDescription:
      '创建您的第一个部门开始使用。',

    loading:
      '正在加载部门...',

    deleteConfirm:
      '确定要删除此部门吗？',

    required:
      '部门名称不能为空。',

    loadError:
      '无法加载部门。',

    saveError:
      '无法保存部门。',

    deleteError:
      '无法删除部门。',
  },

};


/* =====================================================
   COMPONENT
===================================================== */

function Departments() {

  const { language } = useSettings();

  const currentLanguage =
    language as keyof typeof translations;

  const t =
    translations[currentLanguage] ||
    translations.en;


  /* -------------------------------------------------
     STATE
  ------------------------------------------------- */

  const [
    departments,
    setDepartments,
  ] = useState<DepartmentResponse[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');

  const [
    search,
    setSearch,
  ] = useState('');

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    showViewModal,
    setShowViewModal,
  ] = useState(false);

  const [
    selectedDepartment,
    setSelectedDepartment,
  ] = useState<DepartmentResponse | null>(
    null
  );

  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(null);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    form,
    setForm,
  ] = useState<DepartmentRequest>({
    departmentName: '',
    description: '',
  });


  /* =====================================================
     LOAD DEPARTMENTS
  ===================================================== */

  const loadDepartments = async () => {

    try {

      setLoading(true);

      setError('');

      const data =
        await getDepartments();

      setDepartments(data);

    } catch (err: any) {

      console.error(
        'Department API Error:',
        err
      );

      setError(
        err?.response?.data?.message ||
        t.loadError
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadDepartments();

  }, []);


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredDepartments =
    departments.filter(
      (department) => {

        const name =
          department.departmentName
            ?.toLowerCase() || '';

        const description =
          department.description
            ?.toLowerCase() || '';

        const searchText =
          search.toLowerCase();

        return (
          name.includes(searchText) ||
          description.includes(searchText)
        );

      }
    );


  /* =====================================================
     OPEN ADD
  ===================================================== */

  const handleAdd = () => {

    setEditingId(null);

    setForm({
      departmentName: '',
      description: '',
    });

    setError('');

    setShowModal(true);
  };


  /* =====================================================
     OPEN EDIT
  ===================================================== */

  const handleEdit = (
    department: DepartmentResponse
  ) => {

    setEditingId(
      department.id
    );

    setForm({
      departmentName:
        department.departmentName,

      description:
        department.description || '',
    });

    setError('');

    setShowModal(true);
  };


  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const closeModal = () => {

    if (saving) {
      return;
    }

    setShowModal(false);

    setEditingId(null);

    setForm({
      departmentName: '',
      description: '',
    });

  };


  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (
    field: keyof DepartmentRequest,
    value: string
  ) => {

    setForm(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

  };


  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    if (
      !form.departmentName.trim()
    ) {

      setError(t.required);

      return;
    }

    try {

      setSaving(true);

      setError('');

      if (
        editingId !== null
      ) {

        await updateDepartment(
          editingId,
          form
        );

      } else {

        await addDepartment(
          form
        );

      }

      setShowModal(false);

      setEditingId(null);

      setForm({
        departmentName: '',
        description: '',
      });

      await loadDepartments();

    } catch (err: any) {

      console.error(
        'Department Save Error:',
        err
      );

      setError(
        err?.response?.data?.message ||
        t.saveError
      );

    } finally {

      setSaving(false);

    }
  };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (
    id: number
  ) => {

    const confirmed =
      window.confirm(
        t.deleteConfirm
      );

    if (!confirmed) {
      return;
    }

    try {

      setError('');

      await deleteDepartment(id);

      await loadDepartments();

    } catch (err: any) {

      console.error(
        'Department Delete Error:',
        err
      );

      setError(
        err?.response?.data?.message ||
        t.deleteError
      );

    }

  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (
    department: DepartmentResponse
  ) => {

    setSelectedDepartment(
      department
    );

    setShowViewModal(true);

  };


  /* =====================================================
     STATISTICS
  ===================================================== */

  const total =
    departments.length;

  /*
   * Backend currently does not provide
   * employeeCount in DepartmentResponse.
   *
   * Therefore we keep these values based
   * only on available backend data.
   */

  const active =
    departments.length;

  const empty =
    departments.length;


  /* =====================================================
     LOADING SCREEN
  ===================================================== */

  if (loading) {

    return (

      <div className="departments-page">

        <div className="departments-loading">

          <div className="department-spinner" />

          <h3>
            {t.loading}
          </h3>

        </div>

      </div>

    );

  }


  /* =====================================================
     MAIN UI
  ===================================================== */

  return (

    <div className="departments-page">

      {/* Background */}

      <div className="departments-dots" />

      <div className="departments-wave-one" />

      <div className="departments-wave-two" />


      {/* =================================================
         HEADER
      ================================================= */}

      <div className="departments-header">

        <div className="departments-title">

          <div className="departments-title-icon">

            <FaBuilding />

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
          className="add-department-button"
          onClick={handleAdd}
        >

          <FaPlus />

          <span>
            {t.addDepartment}
          </span>

        </button>

      </div>


      {/* =================================================
         ERROR
      ================================================= */}

      {error && (

        <div className="department-error">

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


      {/* =================================================
         STAT CARDS
      ================================================= */}

      <div className="department-stats">

        {/* Total */}

        <div className="department-stat-card stat-blue">

          <div className="stat-icon">

            <FaBuilding />

          </div>

          <div className="stat-content">

            <span>
              {t.totalDepartments}
            </span>

            <strong>
              {total}
            </strong>

          </div>

          <div className="stat-circle" />

        </div>


        {/* Active */}

        <div className="department-stat-card stat-green">

          <div className="stat-icon">

            <FaBuilding />

          </div>

          <div className="stat-content">

            <span>
              {t.activeDepartments}
            </span>

            <strong>
              {active}
            </strong>

          </div>

          <div className="stat-circle" />

        </div>


        {/* Empty */}

        <div className="department-stat-card stat-orange">

          <div className="stat-icon">

            <FaBuilding />

          </div>

          <div className="stat-content">

            <span>
              {t.emptyDepartments}
            </span>

            <strong>
              {empty}
            </strong>

          </div>

          <div className="stat-circle" />

        </div>


        {/* Overview */}

        <div className="department-stat-card stat-purple">

          <div className="stat-icon">

            <FaUsers />

          </div>

          <div className="stat-content">

            <span>
              {t.overview}
            </span>

            <strong>
              {total}
            </strong>

          </div>

          <div className="stat-circle" />

        </div>

      </div>


      {/* =================================================
         TABLE
      ================================================= */}

      <div className="departments-table-card">

        {/* Toolbar */}

        <div className="department-toolbar">

          <div className="department-search">

            <FaSearch />

            <input
              type="text"
              value={search}
              placeholder={t.search}
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


        {/* Data */}

        {filteredDepartments.length >
        0 ? (

          <div className="department-table-wrapper">

            <table className="department-table">

              <thead>

                <tr>

                  <th>
                    {t.department}
                  </th>

                  <th>
                    {t.description}
                  </th>

                  <th>
                    {t.actions}
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredDepartments.map(
                  (department) => (

                    <tr
                      key={
                        department.id
                      }
                    >

                      {/* Department */}

                      <td>

                        <div className="department-info">

                          <div className="department-avatar">

                            <FaBuilding />

                          </div>

                          <div>

                            <strong>
                              {
                                department.departmentName
                              }
                            </strong>

                            <small>
                              DEPT-
                              {String(
                                department.id
                              ).padStart(
                                3,
                                '0'
                              )}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* Description */}

                      <td>

                        <div className="department-description">

                          {
                            department.description ||
                            '-'
                          }

                        </div>

                      </td>


                      {/* Actions */}

                      <td>

                        <div className="department-actions">

                          <button
                            type="button"
                            className="view-action"
                            title={t.view}
                            onClick={() =>
                              handleView(
                                department
                              )
                            }
                          >

                            <FaEye />

                          </button>


                          <button
                            type="button"
                            className="edit-action"
                            title={t.edit}
                            onClick={() =>
                              handleEdit(
                                department
                              )
                            }
                          >

                            <FaEdit />

                          </button>


                          <button
                            type="button"
                            className="delete-action"
                            title={t.delete}
                            onClick={() =>
                              handleDelete(
                                department.id
                              )
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="department-empty">

            <div className="empty-icon">

              <FaBuilding />

            </div>

            <h3>
              {t.noDepartments}
            </h3>

            <p>
              {t.noDepartmentsDescription}
            </p>

            <button
              type="button"
              className="empty-add-button"
              onClick={handleAdd}
            >

              <FaPlus />

              {t.addDepartment}

            </button>

          </div>

        )}

      </div>


      {/* =================================================
         ADD / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div
          className="department-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              closeModal();

            }

          }}
        >

          <div className="department-modal">

            {/* Modal Header */}

            <div className="modal-header">

              <div>

                <h2>

                  {editingId !== null
                    ? t.edit
                    : t.addDepartment}

                </h2>

                <p>
                  {t.subtitle}
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
              className="department-form"
            >

              <div className="form-group">

                <label>
                  {t.departmentName}
                </label>

                <input
                  type="text"
                  value={
                    form.departmentName
                  }
                  placeholder={
                    t.namePlaceholder
                  }
                  onChange={(event) =>
                    handleChange(
                      'departmentName',
                      event.target.value
                    )
                  }
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  {t.departmentDescription}
                </label>

                <textarea
                  value={
                    form.description
                  }
                  placeholder={
                    t.descriptionPlaceholder
                  }
                  onChange={(event) =>
                    handleChange(
                      'description',
                      event.target.value
                    )
                  }
                  rows={5}
                />

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeModal}
                  disabled={saving}
                >

                  {t.cancel}

                </button>


                <button
                  type="submit"
                  className="save-button"
                  disabled={saving}
                >

                  {saving ? (

                    <span>
                      Saving...
                    </span>

                  ) : (

                    <>

                      <FaPlus />

                      {editingId !== null
                        ? t.update
                        : t.save}

                    </>

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
        selectedDepartment && (

        <div
          className="department-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setShowViewModal(false);

            }

          }}
        >

          <div className="department-view-modal">

            <div className="view-modal-header">

              <div className="view-department-icon">

                <FaBuilding />

              </div>

              <div>

                <h2>
                  {
                    selectedDepartment
                      .departmentName
                  }
                </h2>

                <span>
                  DEPT-
                  {String(
                    selectedDepartment.id
                  ).padStart(
                    3,
                    '0'
                  )}
                </span>

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


            <div className="view-modal-body">

              <div className="view-detail">

                <span>
                  {t.departmentName}
                </span>

                <strong>
                  {
                    selectedDepartment
                      .departmentName
                  }
                </strong>

              </div>


              <div className="view-detail">

                <span>
                  {t.description}
                </span>

                <strong>
                  {
                    selectedDepartment
                      .description || '-'
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

export default Departments;