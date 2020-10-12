<template>
  <div class="dashboard-box">
    <div class="loan-box">
      <div class="score-box">
        <fusioncharts :type="type" :width="width" :height="height" :dataFormat="dataFormat" :dataSource="chart" />
      </div>
      <div class="message-loan">
        <div class="credit-aproved" v-if="credit.hasCredit">
          <h2>O limite disponível é :</h2>
          <h1>R$ {{ credit.value }},00</h1>
          <span
            >(consultado em: <strong>{{ new Date().toLocaleString() }}</strong
            >)</span
          >
          <a href="http://" target="_blank" rel="noopener noreferrer">Entenda como funciona ></a>
        </div>
        <div class="credit-reproved" v-if="!credit.hasCredit">
          <h2>No momento você não possui crédito pré-aprovado 😢</h2>
          <p>Este resultado pode mudar diariamente devido à nossa análise de crédito</p>
          <a href="http://" target="_blank" rel="noopener noreferrer">Entenda os motivos de não possuir crédito ></a>
        </div>
      </div>
      <div class="btn-loan">
        <ButtonDefault
          :name="credit.hasCredit ? 'Novo empréstimo' : 'Solicitar reavaliação'"
          @clicked="credit.hasCredit ? $router.push('/loan/simulator') : $router.push('/loan/reavability')"
        />
      </div>
    </div>
    <div class="loan-history">
      <p>
        Você não possui nenhum empréstimo ativo
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from '@vue/composition-api';
import { loanInfo } from '../../services';
import { Loan } from '../../store';
import ButtonDefault from './../../components/buttons/ButtonDefault.vue';

export default defineComponent({
  components: { ButtonDefault },
  setup() {
    const width = ref('90%');
    const height = ref('20%');
    const type = ref('angulargauge');
    const dataFormat = ref('json');
    const chart = reactive({
      chart: {
        caption: 'Seu Score (Pontuação)',
        bgColor: '#fafafa',
        lowerLimit: '0',
        upperLimit: '1000',
        showValue: '1',
        theme: 'fusion'
      },
      colorRange: {
        color: [
          {
            minValue: '0',
            maxValue: '250',
            code: '#F2726F'
          },
          {
            minValue: '500',
            maxValue: '750',
            code: '#FFC533'
          },
          {
            minValue: '750',
            maxValue: '1000',
            code: '#62B58F'
          }
        ]
      },
      dials: {
        dial: [
          {
            value: '810'
          }
        ]
      }
    });
    const credit = Loan.getters.getCredit.value;
    onMounted(async () => {
      await Loan.actions.loanInfo();
      const credit = Loan.getters.getCredit.value;
    });
    return { credit, chart, dataFormat, type, height, width };
  }
});
</script>

<style lang='scss'>
.loan-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  border-bottom: 1px solid var(--color-button-border);
  .score-box {
    margin: 20px;
  }
  .message-loan {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: justify;
    margin-bottom: 20px;
    h2 {
      font-weight: 300;
      margin: 20px;
    }
    p {
      margin: 20px 20px 2px 20px;
    }
    a {
      text-decoration: none;
      color: var(--color-primary);
      margin-left: 20px;
    }
    .credit-aproved {
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        display: flex;
        width: 100%;
      }
      h1 {
        color: var(--color-primary);
        text-align: center;
      }
      span {
        text-align: center;
        font-size: 1.2rem;
      }
    }
  }
  .btn-loan {
    margin-bottom: 20px;
  }
}
.loan-history {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  p {
    margin: 20px;
    font-size: 1.5rem;
    color: var(--color-text-light);
  }
}
</style>