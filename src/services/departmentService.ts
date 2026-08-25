import api from './api';

export interface DepartmentRequest {
  departmentName: string;
  description: string;
}

export interface DepartmentResponse {
  id: number;
  departmentName: string;
  description: string;
}

/* GET ALL */

export const getDepartments = async (): Promise<
  DepartmentResponse[]
> => {
  const response = await api.get<DepartmentResponse[]>(
    '/departments'
  );

  return response.data;
};

/* GET BY ID */

export const getDepartmentById = async (
  id: number
): Promise<DepartmentResponse> => {
  const response = await api.get<DepartmentResponse>(
    `/departments/${id}`
  );

  return response.data;
};

/* ADD */

export const addDepartment = async (
  data: DepartmentRequest
): Promise<DepartmentResponse> => {
  const response = await api.post<DepartmentResponse>(
    '/departments',
    data
  );

  return response.data;
};

/* UPDATE */

export const updateDepartment = async (
  id: number,
  data: DepartmentRequest
): Promise<DepartmentResponse> => {
  const response = await api.put<DepartmentResponse>(
    `/departments/${id}`,
    data
  );

  return response.data;
};

/* DELETE */

export const deleteDepartment = async (
  id: number
): Promise<void> => {
  await api.delete(`/departments/${id}`);
};