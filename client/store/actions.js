export async function nuxtServerInit({ commit, dispatch }, { req, res }) {
  if (this.$cookies.get("token")) {
    this.$axios.setHeader("Authorization", this.$cookies.get("token"));
    await this.$axios
      .$get("http://localhost:8080/user/profile")
      .then(response => {
        commit("setUser", response.user);
        commit("setAuthenticated", true);
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
  this.$router.push("/", () => {
    alert("Erro de autenticação");
  });
}

export async function login({ commit }, { email, password }) {
  return new Promise((resolve, reject) => {
    this.$axios
      .$post("http://localhost:8080/user/login", {
        email: email,
        password: password
      })
      .then(response => {
        if (response.success) {
          this.$axios.setHeader("Authorization", response.token);
          this.$axios
            .$get("http://localhost:8080/user/profile")
            .then(res => {
              this.$cookies.set("token", response.token, {
                path: "/",
                maxAge: 604800
              });
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
