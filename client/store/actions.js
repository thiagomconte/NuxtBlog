export async function nuxtServerInit({ commit, dispatch }, { req, res }) {
  if (this.$cookies.get("token")) {
    this.$axios.setToken(this.$cookies.get("token"));
    await this.$axios
      .$get("/user/profile"z)
      .then(response => {
        commit("setUser", response.user);
        commit("setAuthenticated", true);
        commit("setToken", this.$cookies.get("token"));
        if (response.user.isAdmin) {
          commit("setAdmin", true);
        } else {
          commit("setAdmin", false);
        }
      })
      .catch(error => {
        dispatch("logout");
      });
  }
}

export function logout({ commit }) {
  commit("setAdmin", false);
  commit("setToken", "");
  commit("setUser", { name: "", email: "", isAdmin: false });
  commit("setAuthenticated", false);
  delete this.$axios.defaults.headers.common["Authorization"];
  this.$cookies.remove("token");
  this.$router.push("/");
}

export function authError({ commit }) {
  commit("setAdmin", false);
  commit("setToken", "");
  commit("setUser", { name: "", email: "", isAdmin: false });
  commit("setAuthenticated", false);
  delete this.$axios.defaults.headers.common["Authorization"];
  this.$cookies.remove("token");
  this.$router.push("/", () => {
    alert("Erro de autenticação");
  });
}

export function login({ commit }, { email, password }) {
  return new Promise((resolve, reject) => {
    this.$axios
      .$post("/user/login", {
        email: email,
        password: password
      })
      .then(response => {
        if (response.success) {
          this.$axios.setToken(response.token);
          this.$axios
            .$get("/user/profile")
            .then(res => {
              this.$cookies.set("token", response.token, {
                path: "/",
                maxAge: 604800
              });
              commit("setToken", response.token);
              commit("setUser", res.user);
              commit("setAdmin", true);
              commit("setAuthenticated", true);
              this.$router.push("/");
            })
            .catch(err => {
              reject(err.response.data.message);
            });
        }
      })
      .catch(err => {
        reject(err.response.data.message);
      });
  });
}

export function updateUser({ commit }, name) {
  commit("setUpdateUser", name);
}
