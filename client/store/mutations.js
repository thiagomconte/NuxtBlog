export const setUser = (state, payload) => (state.user = payload);
export const setAuthenticated = (state, payload) =>
  (state.isAuthenticated = payload);
export const setAdmin = (state, payload) => (state.isAdmin = payload);
export const setToken = (state, payload) => (state.token = payload);
export const setUpdateUser = (state, payload) => (state.user.name = payload);
