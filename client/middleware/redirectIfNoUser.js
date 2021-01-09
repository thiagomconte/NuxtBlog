export default function ({ store, redirect, _route, _req }) {
    if (!store.state.user || !store.state.isAuthenticated) {
      return redirect("/");
    }
  }