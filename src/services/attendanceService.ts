import api from './api';

export type AttendanceStatus =
  | 'PRESENT'
  | 'ABSENT'
  | 'HALF_DAY'
  | 'LATE';

export interface AttendanceResponse {
  id: number;

  employeeId: number;

  employeeName: string;

  attendanceDate: string;

  checkIn: string | null;

  checkOut: string | null;

  workingMinutes: number | null;

  status: AttendanceStatus;
}

export interface CheckInRequest {
  employeeId: number;
}

/* =====================================================
   GET ALL ATTENDANCE
===================================================== */

export const getAttendance = async (): Promise<
  AttendanceResponse[]
> => {
  const response =
    await api.get<AttendanceResponse[]>(
      '/attendance'
    );

  return response.data;
};


/* =====================================================
   CHECK IN
===================================================== */

export const checkIn = async (
  employeeId: number
): Promise<AttendanceResponse> => {

  const response =
    await api.post<AttendanceResponse>(
      '/attendance/check-in',
      {
        employeeId,
      }
    );

  return response.data;
};


/* =====================================================
   CHECK OUT
===================================================== */

export const checkOut = async (
  employeeId: number
): Promise<AttendanceResponse> => {

  const response =
    await api.post<AttendanceResponse>(
      `/attendance/check-out/${employeeId}`
    );

  return response.data;
};


/* =====================================================
   GET BY EMPLOYEE
===================================================== */

export const getAttendanceByEmployee = async (
  employeeId: number
): Promise<AttendanceResponse[]> => {

  const response =
    await api.get<AttendanceResponse[]>(
      `/attendance/employee/${employeeId}`
    );

  return response.data;
};


/* =====================================================
   GET BY ID
===================================================== */

export const getAttendanceById = async (
  id: number
): Promise<AttendanceResponse> => {

  const response =
    await api.get<AttendanceResponse>(
      `/attendance/${id}`
    );

  return response.data;
};