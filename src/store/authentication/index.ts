
import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';
Vue.use(VueCompositionAPI);

import { auth } from './../../services';
const token = JSON.parse(String(localStorage.getItem('token')));

const state = reactive<{
  initialState: { status: { loggedIn: boolean }; token: string | null };
  header: { Authorization?: string };
}>({
  initialState:
    token != null ? { status: { loggedIn: true }, token: token } : { status: { loggedIn: false }, token: null },
  header: token != null ? { Authorization: `${token}` } : {}
});

const actions = {
  login: async (credentials:{email: string, password:string}) => {
    const response = await auth(credentials);
    console.log(response)
    if (response.id) {
      state.initialState.status.loggedIn = true;
      state.initialState.token = response.id;
      state.header.Authorization = `${response.id}`;
      return 'Success'
    }else return null
  }
};
const getters = {
  getStatusLoggedIn: computed(() => state.initialState.status.loggedIn),
  getHeader: computed(() => state.header)
};
export { getters, state, actions };
