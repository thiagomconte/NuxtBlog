import * as getters from '../store/state';

export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if(store.getters.getToken){
      config.headers.Authorization = store.getters.getToken
    }
  });

  $axios.onError(error => {
    if (error.response.status === 403) {
      store.dispatch("authError");
    }
  });
}
