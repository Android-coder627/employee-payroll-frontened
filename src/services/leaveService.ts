import api from './api';


export type LeaveType =
  | 'CASUAL'
  | 'SICK'
  | 'EARNED'
  | 'MATERNITY'
  | 'PATERNITY'
  | 'LOSS_OF_PAY';


export type LeaveStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED';


/* =====================================================
   RESPONSE
===================================================== */

export interface LeaveResponse {
  id: number;

  employeeId: number;

  employeeName: string;

  leaveType: LeaveType;

  startDate: string;

  endDate: string;

  reason: string | null;

  status: LeaveStatus;
}


/* =====================================================
   REQUEST
===================================================== */

export interface LeaveRequest {
  employeeId: number;

  leaveType: LeaveType;

  startDate: string;

  endDate: string;

  reason: string;
}


/* =====================================================
   GET ALL LEAVES
===================================================== */

export const getLeaves = async (): Promise<
  LeaveResponse[]
> => {

  const response =
    await api.get<LeaveResponse[]>(
      '/leaves'
    );

  return response.data;
};


/* =====================================================
   APPLY LEAVE
===================================================== */

export const applyLeave = async (
  request: LeaveRequest
): Promise<LeaveResponse> => {

  const response =
    await api.post<LeaveResponse>(
      '/leaves',
      request
    );

  return response.data;
};


/* =====================================================
   GET LEAVES BY EMPLOYEE
===================================================== */

export const getLeavesByEmployee = async (
  employeeId: number
): Promise<LeaveResponse[]> => {

  const response =
    await api.get<LeaveResponse[]>(
      `/leaves/employee/${employeeId}`
    );

  return response.data;
};


/* =====================================================
   APPROVE LEAVE
===================================================== */

export const approveLeave = async (
  leaveId: number
): Promise<LeaveResponse> => {

  const response =
    await api.put<LeaveResponse>(
      `/leaves/${leaveId}/approve`
    );

  return response.data;
};


/* =====================================================
   REJECT LEAVE
===================================================== */

export const rejectLeave = async (
  leaveId: number
): Promise<LeaveResponse> => {

  const response =
    await api.put<LeaveResponse>(
      `/leaves/${leaveId}/reject`
    );

  return response.data;
};