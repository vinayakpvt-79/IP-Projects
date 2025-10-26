const API = "http://localhost:5000/api";

const headers = (auth = false) => {
  const base = { "Content-Type": "application/json" };
  if (auth) base.Authorization = "Bearer " + localStorage.getItem("token");
  return base;
};

export const signup = (data) =>
  fetch(`${API}/signup`, { method: "POST", headers: headers(), body: JSON.stringify(data) })
    .then((res) => res.json());

export const login = (data) =>
  fetch(`${API}/login`, { method: "POST", headers: headers(), body: JSON.stringify(data) })
    .then((res) => res.json());

export const saveForm = (data) =>
  fetch(`${API}/form`, { method: "POST", headers: headers(true), body: JSON.stringify(data) })
    .then((res) => res.json());

export const getForms = () =>
  fetch(`${API}/form`, { method: "GET", headers: headers(true) })
    .then((res) => res.json());
