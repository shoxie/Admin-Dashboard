import axios from "axios";

const authProvider = {
  // authentication
  login: ({ username, password }) => {
    return axios
      .post("/api/auth", { username, password })
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem("auth", JSON.stringify(data));
      })
      .catch((e) => {
        if (e.status === 403) throw new Error("wrong username or password");
        throw e;
      });
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject({ redirectTo: "/login", logoutUser: false });
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  logout: () => {
    return axios.post("/api/auth/logout").then(() => {
      localStorage.removeItem("auth");
    });
  },
  getIdentity: () => {
    try {
      const {
        id,
        fullname: fullName,
        avatar,
      } = JSON.parse(localStorage.getItem("auth"));
      return Promise.resolve({ id, fullName, avatar });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // authorization
  getPermissions: () => {
    const role = localStorage.getItem("auth");
    return role ? Promise.resolve(role.permission) : Promise.reject();
  },
};

export default authProvider;
