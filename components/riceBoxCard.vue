<template>
  <div class="carousel__item row">
    <q-card class="readCard col-12" v-for="(slide, index) in slides" :key="index" @click="openDialog(slide)">
      <div class="card-content row">
        <div class="card-info col col-sm-12">
          <div class="new-tag" v-if="slide.card.isNew">
            <p>新品</p>
          </div>
          <div class="hot-tag" v-if="slide.card.isHot">
            <img src="/delicious/hot.png" alt="Hot" />
          </div>
          <div class="cardText">
            <div class="top">
              <h5>{{ slide.card.title }}</h5>
              <div class="bottomXs xs">
                <p class="fw-700">
                  {{ slide.card.price }}
                </p>
              </div>
              <h6 class="gt-xs fw-700">
                {{ slide.card.text.main }}
                <span class="gt-xs">{{ slide.card.text.span }}</span>
              </h6>
              <h6 class="gt-xs fw-700">
                {{ slide.card.text.main2 }}
                <span class="gt-xs" style="color: #666">{{ slide.card.text.span2 }}</span>
              </h6>
              <p class="gt-xs">{{ slide.card.text.text }}</p>
              <p class="gt-xs">{{ slide.card.text.text2 }}</p>
              <p class="gt-xs">{{ slide.card.text.note }}</p>
              <p class="gt-xs smallNote">{{ slide.card.text.smallNote }}</p>
            </div>
            <div class="bottom">
              <p class="gt-xs fw-700 mt-5">
                {{ slide.card.price }}
                <span class="gt-xs">{{ slide.card.note }}</span>
              </p>
              <p class="xs">{{ slide.card.note }}</p>
            </div>
          </div>
        </div>
        <img loading="lazy" class="card-image col-6 col-sm-12" :src="slide.card.image" alt="盒餐" />
      </div>
    </q-card>

    <!-- Dialog部分 -->
    <q-dialog v-model="isDialogOpen">
      <q-card class="selectedDialog">
        <!-- 新增的關閉按鈕 -->
        <q-btn
          flat
          dense
          round
          icon="close"
          color="white"
          class="close-dialog-button"
          @click="isDialogOpen = false"
          :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }" />
        <div class="dialogContainer">
          <div class="dialogImg">
            <img loading="lazy" :src="selectedSlide.dialog.image" alt="Slide Image" />
          </div>
          <div class="dialogText">
            <h4>
              {{ selectedSlide.dialog.title }}
              <span>{{ selectedSlide.dialog.price }}</span>
            </h4>

            <p>
              {{ selectedSlide.dialog.text.main }}
              <span>{{ selectedSlide.dialog.text.span }}</span>
              {{ selectedSlide.dialog.text.main2 }}
              <span>{{ selectedSlide.dialog.text.span2 }}</span>
            </p>
            <p>{{ selectedSlide.dialog.text.text2 }}</p>
            <p class="dialogNote">{{ selectedSlide.dialog.text.note }}</p>
            <p class="dialogNote">* 配菜會根據季節不定期調整部分餐點，圖片僅供參考，請以實際餐盒為準</p>
            <p>{{ selectedSlide.dialog.text.smallNote }}</p>
          </div>
          <div v-if="selectedSlide.dialog.listItems" class="dialogContent row">
            <div v-for="(listGroup, listGroupIndex) in selectedSlide.dialog.listItems" :key="listGroupIndex" class="col-12">
              <h6>
                {{ listGroup.title }}
                <span>{{ listGroup.span }}</span>
              </h6>
              <ul class="ulType column">
                <li v-for="(item, itemIndex) in listGroup.items" :key="itemIndex" class="col-6">
                  {{ item.text }}
                  <span v-if="item.note" class="item-note">{{ item.note }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
const slides = ref([
  {
    card: {
      image: '/delicious/2-pic-17.png',
      title: '香滷控肉油飯盒',
      text: {
        main: '主餐 (香滷控肉)',
        text: '極品油飯+古早味筍絲+家鄉酸菜',

        text2: '滷蛋或鹹水煮蛋+杏鮑菇+香滷豆干 '
        // note: '湯飲品擇1'
      },
      price: 'NT$100',
      isNew: true,
      isHot: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-17.jpg',
      title: '香滷控肉油飯盒',
      text: {
        main: '主餐 (香滷控肉)',

        text2: '極品油飯+古早味筍絲+家鄉酸菜+滷蛋或鹹水煮蛋+杏鮑菇+香滷豆干 '
        // note: '湯飲品擇1'
      },
      price: 'NT$100',

      listItems: [
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-18.png',
      title: '香炸雞翅油飯盒',
      text: {
        main: '主餐 (香炸雞翅)',
        text: '極品油飯+古早味筍絲+家鄉酸菜',

        text2: '滷蛋或鹹水煮蛋+杏鮑菇+香滷豆干 '
      },
      price: 'NT$125',

      // note: '#爽口',
      isNew: true,
      isHot: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-18.jpg',
      title: '香炸雞翅飯盒',
      text: {
        main: '主餐 (香炸雞翅)',
        main2: '',

        text2: '極品油飯+古早味筍絲+家鄉酸菜+滷蛋或鹹水煮蛋+杏鮑菇+香滷豆干 '
      },
      price: 'NT$125',

      listItems: [
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },

  {
    card: {
      image: '/delicious/2-pic-21.png',
      title: '香辣滷牛油飯盒',
      text: {
        main: '主餐 (香辣滷牛)',
        text: '極品油飯+古早味筍絲+家鄉酸菜',

        text2: '滷蛋或鹹水煮蛋+杏鮑菇+香滷豆干 '
      },
      price: 'NT$150',

      note: '#滿足',
      isNew: true,
      isHot: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-21.jpg',
      title: '香辣滷牛油飯盒',
      text: {
        main: '主餐 (香辣滷牛)',
        main2: '',

        text2: '極品油飯+古早味筍絲+家鄉酸菜+滷蛋或鹹水煮蛋+杏鮑菇+香滷豆干 '
      },
      price: 'NT$150',

      listItems: [
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  },
  {
    card: {
      image: '/delicious/2-pic-22.png',
      title: '香滷雞腿油飯盒',
      text: {
        main: '主餐 (香滷雞腿)',
        text: '極品油飯+古早味筍絲+家鄉酸菜',

        text2: '滷蛋或鹹水煮蛋+杏鮑菇+香滷豆干 '
      },
      price: 'NT$150',

      // note: '#滿足',
      isNew: true,
      isHot: false
    },
    dialog: {
      image: '/delicious/dialog-2-pic-22.jpg',
      title: '香滷雞腿油飯盒',
      text: {
        main: '主餐 (香滷雞腿)',
        main2: '',

        text2: '極品油飯+古早味筍絲+家鄉酸菜+滷蛋或鹹水煮蛋+杏鮑菇+香滷豆干 '
      },
      price: 'NT$150',

      listItems: [
        {
          title: '加購湯飲品',
          span: '+$15',
          // 沒有備註的項目可以只有text字段
          items: [{ text: '微甜豆漿' }, { text: '無糖豆漿' }, { text: '古早味紅茶' }, { text: '古早味奶茶' }, { text: '季節甜品' }, { text: '季節濃湯', note: '' }]
        }
      ]
    }
  }
])

const isDialogOpen = ref(false)

const selectedSlide = ref(null) // 初始化為null

const openDialog = slide => {
  selectedSlide.value = slide
  isDialogOpen.value = true
}
</script>
<style lang="scss" scoped>
@import '/assets/components/deliciousRiceboxCard.scss';
</style>
