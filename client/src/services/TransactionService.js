import http from "../http-common";

const getByPeriod = (period) => {
  return http.get(`/api/transaction?period=${period}`);
};

const add = () => {
  return http.post("/api/transaction");
};

const edit = (id) => {
  return http.put(`/api/transaction/${id}`);
};

const remove = (id) => {
  return http.delete(`/api/transaction/${id}`);
};
export default { getByPeriod, add, edit, remove };
