import api from './api';

export type PayrollStatus =
  | 'GENERATED'
  | 'PAID'
  | 'CANCELLED';

export interface PayrollResponse {
  id: number;
  employeeId: number;
  employeeName: string;
  month: number;
  year: number;
  basicSalary: number;
  bonus: number;
  deduction: number;
  netSalary: number;
  status: PayrollStatus;
}

export interface PayrollRequest {
  employeeId: number;
  month: number;
  year: number;
  bonus: number;
  deduction: number;
}

/* Get all payrolls */

export const getPayrolls = async (): Promise<
  PayrollResponse[]
> => {
  const response =
    await api.get<PayrollResponse[]>('/payroll');

  return response.data;
};

/* Generate payroll */

export const generatePayroll = async (
  request: PayrollRequest
): Promise<PayrollResponse> => {
  const response =
    await api.post<PayrollResponse>(
      '/payroll/generate',
      request
    );

  return response.data;
};

/* Get payroll by employee */

export const getPayrollByEmployee = async (
  employeeId: number
): Promise<PayrollResponse[]> => {
  const response =
    await api.get<PayrollResponse[]>(
      `/payroll/employee/${employeeId}`
    );

  return response.data;
};