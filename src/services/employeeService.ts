import axios from 'axios';

const API_URL =
  'http://localhost:8080/api/employees';


export interface EmployeeRequest {

  employeeCode: string;

  firstName: string;

  lastName: string;

  phone: string;

  gender: string;

  dateOfBirth: string;

  joiningDate: string;

  designation: string;

  salary: number;

  address?: string;

    // User account details
  email: string;

  password: string;

  // Existing department
  departmentId: number;
}


export interface EmployeeResponse {

  id: number;

  employeeCode: string;

  firstName: string;

  lastName: string;

  phone: string;

  gender: string;

  dateOfBirth: string;

  joiningDate: string;

  designation: string;

  salary: number;

  address: string;

  status: string;
}


/* =====================================================
   AXIOS CONFIG
===================================================== */

const getHeaders = () => {

  const token =
    localStorage.getItem('token');

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};


/* =====================================================
   GET ALL EMPLOYEES
===================================================== */

export const getEmployees = async () => {

  const response =
    await axios.get<EmployeeResponse[]>(
      API_URL,
      {
        headers: getHeaders(),
      }
    );

  return response.data;
};


/* =====================================================
   GET EMPLOYEE BY ID
===================================================== */

export const getEmployeeById = async (
  id: number
) => {

  const response =
    await axios.get<EmployeeResponse>(
      `${API_URL}/${id}`,
      {
        headers: getHeaders(),
      }
    );

  return response.data;
};


/* =====================================================
   ADD EMPLOYEE
===================================================== */

export const addEmployee = async (
  employee: EmployeeRequest
) => {

  const response =
    await axios.post<EmployeeResponse>(
      API_URL,
      employee,
      {
        headers: getHeaders(),
      }
    );

  return response.data;
};


/* =====================================================
   UPDATE EMPLOYEE
===================================================== */

export const updateEmployee = async (
  id: number,
  employee: EmployeeRequest
) => {

  const response =
    await axios.put<EmployeeResponse>(
      `${API_URL}/${id}`,
      employee,
      {
        headers: getHeaders(),
      }
    );

  return response.data;
};


/* =====================================================
   DELETE EMPLOYEE
===================================================== */

export const deleteEmployee = async (
  id: number
) => {

  const response =
    await axios.delete<string>(
      `${API_URL}/${id}`,
      {
        headers: getHeaders(),
      }
    );

  return response.data;
};