import http from "../http-common";

const getByPeriod = (period) => {
  return http.get(`/api/transaction?period=${period}`);
};

export default { getByPeriod };
