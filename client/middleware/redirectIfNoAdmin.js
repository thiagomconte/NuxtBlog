export default function ({ store, redirect }) {
    if (!store.state.isAdmin) {
      return redirect("/")
    }
  }