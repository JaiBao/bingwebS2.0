<template>
  <!-- 地址運費dialog -->
  <q-dialog v-model="addressDialog">
    <div class="addressSection">
      <q-btn
        flat
        dense
        round
        icon="close"
        color="white"
        class="close-dialog-button"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }"
        @click="closeAddressClick" />
      <!-- <img src="/group/address.jpg" alt="運費說明" /> -->
      <div class="allAdress">
        <q-tabs v-model="tab" class="grey-7 tabs" active-class="cool" indicator-color="transparent">
          <q-tab :ripple="false" name="Taipei" label="台北市" class="tab" />
          <q-tab :ripple="false" name="NewTaipei" label="新北市" class="tab" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="section2TabPanels">
          <q-tab-panel class="tabPanel" name="Taipei">
            <img src="/group/Taipei.png" alt="運費說明" />
          </q-tab-panel>

          <q-tab-panel name="NewTaipei" class="tabPanel">
            <img src="/group/NewTaipei.png" alt="運費說明" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-dialog>
</template>
<script setup>
import { useAddressDialogStore } from '/stores/useAddressDialogStore'

const { addressDialog, closeAddressClick, onAddressClick } = useAddressDialogStore()

const tab = ref('Taipei')
</script>
<style lang="scss" scoped>
// 地址
.addressSection {
  min-width: 250px;
  max-width: 700px;
  // background: #fffaf3;
  position: relative;
  display: flex;
  flex-direction: column;
  .allAdress {
    display: flex;
    padding: 6% 5%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: #ffefad;
    .tabs {
      background: #f1efe4;
      color: #2d2d2d;
      font-size: 21px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      .tab {
        border-radius: 10px 10px 0 0;
        position: relative;
        padding-top: 10px;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          background: transparent;
          border-radius: 10px 10px 0 0;
        }
      }
    }

    .tabPanel {
      background: #ffefad;
      padding: 0;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
.cool {
  background: #fff;
  color: #f50077;
}
.close-dialog-button {
  position: absolute;
  top: 5px;
  right: 10px; /* 调整此值以控制按钮距离右侧的间距 */
  z-index: 2;
  // float: right; /* 浮动至右侧 */
}
</style>
