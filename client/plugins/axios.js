export default function ({ $axios, redirect }) {
    $axios.onError(error => {
      if(error.response.status === 403) {
        this.$auth.logout();
        redirect('/login')
      }
    })
  }