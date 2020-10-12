import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';
Vue.use(VueCompositionAPI);

import { loanInfo } from './../../services';

const state = reactive({
    credit:{
        hasCredit: false,
        value: 0
    }
    
});

const actions = {
    loanInfo: async ()=>{
        const response = await loanInfo()
        if (response[0].limit >0){
            state.credit.hasCredit = true;
            state.credit.value = response[0].limit
        }
    }
}
  const getters = {
    getCredit: computed(() => state.credit)
  };
  export { getters, state, actions };
  