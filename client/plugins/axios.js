export default function({ $axios, store }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 403) {
      store.dispatch('authError')
    }
  });
}
