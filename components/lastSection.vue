<template>
  <div class="lastSection">
    <q-toolbar class="footerToolbar">
      <q-toolbar-title>
        <div class="column footer">
          <div class="footerTop">
            <div class="footerImg">
              <img loading="lazy" src="/index/0-pic-1.png" />
            </div>
            <div class="isUs">
              <div class="isUs1">
                <div class="isUsImg">
                  <img loading="lazy" src="/index/open.svg" alt="open" />
                </div>
                <h6>
                  營業時間&nbsp;&nbsp;&nbsp;09 : 00-18 : 00
                  <br />
                  餐點供應&nbsp;&nbsp;&nbsp;11 : 00-16 : 00
                </h6>
              </div>
              <div class="isUs1">
                <div class="isUsImg">
                  <img loading="lazy" src="/index/phone.svg" alt="phone" />
                </div>
                <h6>
                  預訂專線：
                  <a @click="dialNumber">(02)2301-5331</a>
                  <br />
                  外送傳真： (02)2301-3990
                </h6>
              </div>
              <div class="isUs1">
                <div class="isUsImg">
                  <img loading="lazy" src="/index/marker.svg" alt="marker" />
                </div>

                <h6>&nbsp;106台北市大安區和平東路二段311巷43弄26號</h6>
              </div>
            </div>
            <div class="watchUs">
              <div class="footerText">
                <div class="footerTextContent">
                  <div class="messageIcon">
                    <img loading="lazy" src="/index/instagram.svg" alt="ig" @click="onMessengerIg" class="pointer" />

                    <img loading="lazy" src="/index/fb.svg" alt="fb" @click="onMessengerFB" class="pointer" />

                    <img loading="lazy" src="/index/line.svg" alt="line" @click="onMessengerClick" class="pointer" />
                  </div>
                  <h6>&nbsp;&nbsp;&nbsp;&nbsp;※ 潤餅均當日手工現作，供應量有限，外送訂餐請先預約。</h6>

                  <!-- <h6>
                    ※ 潤餅洽詢，歡迎透過
                    <span @click="onMailClick">表單</span>
                    或
                    <a href="https://line.me/R/ti/p/@chinabing" target="_blank"><span>官方Line</span></a>
                    等方式聯繫。
                  </h6> -->
                </div>
              </div>
              <div class="footerBtn row">
                <button @click="onDownloadClick">下載傳真訂單</button>
                <!-- <button @click="onMessengerClick">中華一餅官方帳號</button> -->
              </div>
            </div>
          </div>
          <div class="footerBottom">
            <h6>
              Copyright © 2023香臨食品股份有限公司著作權所有 &nbsp; | &nbsp;
              <router-link to="/privacy">隱私權政策</router-link>
            </h6>
          </div>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </div>
</template>
<script setup>
import { useUniversal } from '/stores/universal'
const { onMessengerClick, onForm1Click, onForm2Click, onMessengerIg, dialNumber, onDownloadClick, onMessengerFreight, onMessengerFB } = useUniversal()
</script>
<style lang="scss" scoped>
@import 'assets/components/lastSection.scss';
</style>
