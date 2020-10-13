<template>
  <div class="hiring-box">
    <div class="value-box">
      <h2>Valor contratado</h2>
      <h1>R$ {{ credit.value }},00</h1>
    </div>
    <div class="favored-box">
      <InputDefault title="Favorecido" type="text" icon="bank-transfer-out" />
    </div>
    <div class="description-box">
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="7"
        placeholder="Descreva o produto ou serviço contratado"
      ></textarea>
    </div>
    <div class="buttons-hiring">
      <ButtonDefault name="Voltar" @clicked="$router.push('/loan/simulator')" />
      <ButtonDefault name="Confirmar" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import InputDefault from './../../components/inputs/InputDefault.vue';
import ButtonDefault from './../../components/buttons/ButtonDefault.vue';

import { Loan } from '../../store';

export default defineComponent({
  components: { InputDefault, ButtonDefault },
  setup() {
    const credit = Loan.getters.getCredit.value;
    return { credit };
  }
});
</script>

<style lang="scss">
.hiring-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  .value-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
    h1 {
      color: var(--color-primary);
      margin-top: 5px;
    }
  }
  .favored-box {
    display: flex;
    flex-direction: column;
    width: 378px;
  }
  .description-box {
    display: flex;
    flex-direction: column;
    max-width: 378px;
    padding: 5px;
    margin: 30px 0 80px 0;
    strong {
      font-size: 1.9rem;
    }
    textarea {
      font-size: 1.9rem;
      align-self: center;
      resize: none;
      outline-color: var(--color-primary);
      width: 100%;
      margin-top: 5px;
      height: 100px;
    }
  }
  .buttons-hiring {
    display: flex;
    flex-direction: row;
    width: 378px;
    justify-content: space-evenly;
    button {
      min-width: 150px;
    }
  }
}
</style>