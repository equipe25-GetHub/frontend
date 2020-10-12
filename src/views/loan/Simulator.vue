<template>
  <div class="simulator">
    <template v-if="page == 'simulate'">
      <div class="simulator-box">
        <h1>Simulador</h1>
        <div class="value-loan">
          <h3>Valor solicitado</h3>
          <InputDefault title="Valor a resgatar" v-model="value" icon="cash-multiple" :type="'Number'" />
        </div>
        <div class="value-portion">
          <StepInput v-model="portion" />
          <div class="text-portion">
            <p>
              Parcelas de R$
              {{ finalPortionValue }}
            </p>
          </div>
        </div>
        <div class="select-date">
          <h3>
            Primeiro desconto em:
          </h3>
          <strong>(Data de acordo com o contratado)</strong>
          <InputDefault title="Data de primeira parcela" :disabled="true" v-model="date" icon="calendar" />
        </div>
        <div class="resume-loan">
          <h3>
            Total a pagar
          </h3>
          R$ {{ finalValue.toFixed(2) }} ({{ interest * 100 }}% a.m)
          <router-link to="/conditions">Ver condições</router-link>
        </div>
        <div class="button-loan">
          <ButtonDefault name="Voltar" @clicked="$router.push('/loan/dashboard')" />
          <ButtonDefault name="Continuar" @clicked="page = 'resume'" />
        </div>
      </div>
    </template>
    <template v-if="page == 'resume'">
      <div class="resume-box">
        <div class="text-header">
          <h3>O valor de:</h3>
          <h3 class="value">R$ {{ value }}.00</h3>
          <h3>Ira pagar:</h3>
          <div class="final-value-text">
            <h1>
              R$ {{ finalValue.toFixed(2) }}
              <span>
                <strong>({{ interest * 100 }}%a.m)</strong></span
              >
            </h1>
            <router-link to="/conditions">Ver condições</router-link>
          </div>
        </div>
        <div class="portions-table">
          <div class="portions" v-for="(value, index) in new Array(portion)" :key="index">
            <strong>
              {{ index + 1 }}º desconto -
              {{ new Date(new Date().setMonth(new Date().getMonth() + index + 1)).toLocaleDateString() }}
            </strong>
            <span>R$ {{ finalPortionValue }}</span>
          </div>
        </div>
        <div class="button-conditions">
          <ButtonDefault name="Voltar" @clicked="page = 'simulate'" />
          <ButtonDefault name="Contratar" @clicked="$router.push('/loan/hiring')" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@vue/composition-api';
import InputDefault from './../../components/inputs/InputDefault.vue';
import StepInput from './../../components/inputs/StepInput.vue';
import ButtonDefault from './../../components/buttons/ButtonDefault.vue';
import { Loan } from '../../store';

export default defineComponent({
  components: { InputDefault, StepInput, ButtonDefault },
  setup(props, context) {
    const fullDate = new Date();
    const value = ref(Loan.getters.getCredit.value.value);
    const portion = ref(12);
    const interest = 0.0105;
    const date = ref(new Date().toLocaleDateString());
    const page = ref('simulate');
    const finalValue = computed(() => value.value * (1 + interest * portion.value));
    const finalPortionValue = computed(() => (finalValue.value / portion.value).toFixed(2));
    return { value, portion, finalPortionValue, finalValue, interest, page, date };
  }
});
</script>

<style lang="scss">
.simulator-box,
.resume-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: var(--color-primary);
    margin: 20px;
  }
  a {
    color: var(--color-primary);
  }
  .final-value-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    h1 {
      margin: 0px;
    }
  }

  button {
    min-width: 120px;
    margin: 0 10px 0 10px;
  }
}

.simulator-box {
  .value-loan {
    display: flex;
    flex-direction: column;
  }
  .value-portion {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    justify-content: space-between;
    margin: 20px;
    .text-portion {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .select-date {
    margin: 20px;
    strong {
      width: 100%;
      font-size: 1.2rem;
      text-align: center;
    }
  }
  .resume-loan {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    margin: 20px;
    h3 {
      margin: 5px;
    }
  }
  .button-loan {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    min-width: 300px;
    justify-content: space-between;
    margin-top: 50px;
  }
}
.resume-box {
  min-width: 300px;
  height: 100%;
  .text-header {
    h1 {
      text-align: center;
      span {
        font-size: 1.6rem;
      }
    }
    h3 {
      text-align: center;
      margin: 20px;
    }
    .value {
      color: var(--color-primary);
      font-weight: 600;
    }
  }
  .portions-table {
    border-top: 1px solid #cccccc77;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    strong {
      margin: 10px;
    }
    .portions {
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: baseline;
      justify-content: space-between;
      &:not(:last-child) {
        border-bottom: 1px solid #cccccc77;
      }
    }
  }
  .button-conditions {
    display: flex;
    min-width: 300px;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>