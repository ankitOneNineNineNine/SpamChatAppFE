import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/appv1",
});

export const GET = (url, secured = false) => {
  return http({
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: secured ? localStorage.getItem("i_hash") : null,
    },
  }).then((data) => data.data);
};

export const POST = (
  url,
  body = {},
  secured = false,
  contentType = "application/json"
) => {
  let Authorization =  secured ? localStorage.getItem("i_hash") : null
  
  return http({
    method: "POST",
    url,
    data: body,
    headers: {
      "Content-Type": contentType,
      Authorization: secured ? localStorage.getItem("i_hash") : null,
    },
  }).then((data) => data.data);
};

export const PUT = (
  url,
  body = {},
  secured = false,
  contentType = "application/json"
) => {
  return http({
    method: "PUT",
    url,
    data: body,
    headers: {
      "Content-Type": contentType,
      Authorization: secured ? localStorage.getItem("i_hash") : null,
    },
  }).then((data) => data.data);
};

export const REMOVE = (
  url,
  body = {},
  secured = false,
  contentType = "application/json"
) => {
  return http({
    method: "DELETE",
    url,
    data: body,
    headers: {
      "Content-Type": contentType,
      Authorization: secured ? localStorage.getItem("i_hash") : null,
    },
  }).then((data) => data.data);
};
