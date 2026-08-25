import api from './api';

export interface DashboardResponse {

  totalEmployees: number;

  activeEmployees: number;

  totalDepartments: number;

  todayPresent: number;

  todayAbsent: number;

  pendingLeaves: number;

  approvedLeaves: number;

  totalPayrolls: number;
}

export const getDashboard =
  async (): Promise<DashboardResponse> => {

    const response =
      await api.get<DashboardResponse>(
        '/dashboard'
      );

    return response.data;
  };