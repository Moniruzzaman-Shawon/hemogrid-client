import api from "../lib/api";

export const useApi = () => {
  const get = async (url) => await api.get(url);
  const post = async (url, data) => await api.post(url, data);
  const put = async (url, data) => await api.put(url, data);
  const patch = async (url, data) => await api.patch(url, data);
  const remove = async (url) => await api.delete(url);

  return { get, post, put, patch, remove };
};
