// orderAddress.js
import { defineStore } from 'pinia'

export const useOrderAddress = defineStore('main', {
  state: () => ({
    addressoptions: [
      //   { id: 1, name: '基隆市' },
      { id: 2, name: '臺北市' },
      { id: 3, name: '新北市' }
      // ,
      // { id: 4, name: '桃園市' } ,
      //   { id: 5, name: '新竹市' },
      //   { id: 6, name: '新竹縣' },
      //   { id: 7, name: '苗栗縣' },
      //   { id: 8, name: '臺中市' },
      //   { id: 9, name: '彰化縣' },
      //   { id: 10, name: '南投縣' },
      //   { id: 11, name: '雲林縣' },
      //   { id: 12, name: '嘉義市' },
      //   { id: 13, name: '嘉義縣' },
      //   { id: 14, name: '臺南市' },
      //   { id: 15, name: '高雄市' },
      //   { id: 16, name: '屏東縣' },
      //   { id: 17, name: '臺東縣' },
      //   { id: 18, name: '花蓮縣' },
      //   { id: 19, name: '宜蘭縣' },
      //   { id: 20, name: '澎湖縣' },
      //   { id: 21, name: '金門縣' },
      //   { id: 22, name: '連江縣' }
    ],
    cityOptions: [],
    citiesByAddress: {
      1: [
        {
          city_id: 23,
          name: '仁愛區'
        },
        {
          city_id: 24,
          name: '信義區'
        },
        {
          city_id: 25,
          name: '中正區'
        },
        {
          city_id: 26,
          name: '中山區'
        },
        {
          city_id: 27,
          name: '安樂區'
        },
        {
          city_id: 28,
          name: '暖暖區'
        },
        {
          city_id: 29,
          name: '七堵區'
        }
      ],
      2: [
        {
          city_id: 30,
          name: '中正區',
          limit: 1500,
          price: 75
        },
        {
          city_id: 31,
          name: '大同區',
          limit: 2000,
          price: 100
        },
        {
          city_id: 32,
          name: '中山區',
          limit: 1500,
          price: 75
        },
        {
          city_id: 33,
          name: '松山區',
          limit: 1500,
          price: 75
        },
        {
          city_id: 34,
          name: '大安區',
          limit: 1000,
          price: 50
        },
        {
          city_id: 35,
          name: '萬華區',
          limit: 2000,
          price: 100
        },
        {
          city_id: 36,
          name: '信義區',
          limit: 1500,
          price: 75
        },
        // {
        //   city_id: 37,
        //   name: '士林區'
        // },
        {
          city_id: 38,
          name: '北投區',
          limit: 6000,
          price: 300
        },
        {
          city_id: 39,
          name: '內湖區',
          limit: 5000,
          price: 250
        },
        {
          city_id: 40,
          name: '南港區',
          limit: 5000,
          price: 250
        },
        {
          city_id: 41,
          name: '文山區',
          limit: 3000,
          price: 150
        }
      ],
      3: [
        // {
        //   city_id: 42,
        //   name: '萬里區'
        // },
        // {
        //   city_id: 43,
        //   name: '金山區'
        // },
        {
          city_id: 44,
          name: '板橋區',
          limit: 4000,
          price: 200
        },
        {
          city_id: 45,
          name: '汐止區',
          limit: 6000,
          price: 300
        },
        // {
        //   city_id: 46,
        //   name: '深坑區'
        // },
        // {
        //   city_id: 47,
        //   name: '石碇區'
        // },
        // {
        //   city_id: 48,
        //   name: '瑞芳區'
        // },
        // {
        //   city_id: 49,
        //   name: '平溪區'
        // },
        // {
        //   city_id: 50,
        //   name: '雙溪區'
        // },
        // {
        //   city_id: 51,
        //   name: '貢寮區'
        // },
        {
          city_id: 52,
          name: '新店區',
          limit: 4000,
          price: 200
        },
        {
          city_id: 53,
          name: '坪林區',
          limit: 12000,
          price: 600
        },
        // {
        //   city_id: 54,
        //   name: '烏來區'
        // },
        {
          city_id: 55,
          name: '永和區',
          limit: 2000,
          price: 100
        },
        {
          city_id: 56,
          name: '中和區',
          limit: 3000,
          price: 150
        },
        {
          city_id: 57,
          name: '土城區',
          limit: 5000,
          price: 250
        },
        {
          city_id: 58,
          name: '三峽區',
          limit: 12000,
          price: 600
        },
        {
          city_id: 59,
          name: '樹林區',
          limit: 8000,
          price: 400
        },
        {
          city_id: 60,
          name: '鶯歌區',
          limit: 12000,
          price: 600
        },
        {
          city_id: 61,
          name: '三重區',
          limit: 4000,
          price: 200
        },
        {
          city_id: 62,
          name: '新莊區',
          limit: 4000,
          price: 200
        },
        {
          city_id: 63,
          name: '泰山區',
          limit: 8000,
          price: 400
        },
        {
          city_id: 64,
          name: '林口區',
          limit: 12000,
          price: 600
        },
        {
          city_id: 65,
          name: '蘆洲區',
          limit: 5000,
          price: 250
        },
        {
          city_id: 66,
          name: '五股區',
          limit: 5000,
          price: 250
        },
        // {
        //   city_id: 67,
        //   name: '八里區'
        // },
        {
          city_id: 68,
          name: '淡水區',
          limit: 12000,
          price: 600
        }
        // {
        //   city_id: 69,
        //   name: '三芝區'
        // },
        // {
        //   city_id: 70,
        //   name: '石門區'
        // }
      ],
      4: [
        {
          city_id: 71,
          name: '中壢區'
        },
        {
          city_id: 72,
          name: '平鎮區'
        },
        {
          city_id: 73,
          name: '龍潭區'
        },
        {
          city_id: 74,
          name: '楊梅區'
        },
        {
          city_id: 75,
          name: '新屋區'
        },
        {
          city_id: 76,
          name: '觀音區'
        },
        {
          city_id: 77,
          name: '桃園區'
        },
        {
          city_id: 78,
          name: '龜山區'
        },
        {
          city_id: 79,
          name: '八德區'
        },
        {
          city_id: 80,
          name: '大溪區'
        },
        {
          city_id: 81,
          name: '復興區'
        },
        {
          city_id: 82,
          name: '大園區'
        },
        {
          city_id: 83,
          name: '蘆竹區'
        }
      ],
      5: [
        {
          city_id: 84,
          name: '東區'
        },
        {
          city_id: 85,
          name: '北區'
        },
        {
          city_id: 86,
          name: '香山區'
        }
      ],
      6: [
        {
          city_id: 87,
          name: '竹北市'
        },
        {
          city_id: 88,
          name: '湖口鄉'
        },
        {
          city_id: 89,
          name: '新豐鄉'
        },
        {
          city_id: 90,
          name: '新埔鎮'
        },
        {
          city_id: 91,
          name: '關西鎮'
        },
        {
          city_id: 92,
          name: '芎林鄉'
        },
        {
          city_id: 93,
          name: '寶山鄉'
        },
        {
          city_id: 94,
          name: '竹東鎮'
        },
        {
          city_id: 95,
          name: '五峰鄉'
        },
        {
          city_id: 96,
          name: '橫山鄉'
        },
        {
          city_id: 97,
          name: '尖石鄉'
        },
        {
          city_id: 98,
          name: '北埔鄉'
        },
        {
          city_id: 99,
          name: '峨眉鄉'
        }
      ],
      7: [
        {
          city_id: 100,
          name: '竹南鎮'
        },
        {
          city_id: 101,
          name: '頭份市'
        },
        {
          city_id: 102,
          name: '三灣鄉'
        },
        {
          city_id: 103,
          name: '南庄鄉'
        },
        {
          city_id: 104,
          name: '獅潭鄉'
        },
        {
          city_id: 105,
          name: '後龍鎮'
        },
        {
          city_id: 106,
          name: '通霄鎮'
        },
        {
          city_id: 107,
          name: '苑裡鎮'
        },
        {
          city_id: 108,
          name: '苗栗市'
        },
        {
          city_id: 109,
          name: '造橋鄉'
        },
        {
          city_id: 110,
          name: '頭屋鄉'
        },
        {
          city_id: 111,
          name: '公館鄉'
        },
        {
          city_id: 112,
          name: '大湖鄉'
        },
        {
          city_id: 113,
          name: '泰安鄉'
        },
        {
          city_id: 114,
          name: '銅鑼鄉'
        },
        {
          city_id: 115,
          name: '三義鄉'
        },
        {
          city_id: 116,
          name: '西湖鄉'
        },
        {
          city_id: 117,
          name: '卓蘭鎮'
        }
      ],
      8: [
        {
          city_id: 118,
          name: '中區'
        },
        {
          city_id: 119,
          name: '東區'
        },
        {
          city_id: 120,
          name: '南區'
        },
        {
          city_id: 121,
          name: '西區'
        },
        {
          city_id: 122,
          name: '北區'
        },
        {
          city_id: 123,
          name: '北屯區'
        },
        {
          city_id: 124,
          name: '西屯區'
        },
        {
          city_id: 125,
          name: '南屯區'
        },
        {
          city_id: 126,
          name: '太平區'
        },
        {
          city_id: 127,
          name: '大里區'
        },
        {
          city_id: 128,
          name: '霧峰區'
        },
        {
          city_id: 129,
          name: '烏日區'
        },
        {
          city_id: 130,
          name: '豐原區'
        },
        {
          city_id: 131,
          name: '后里區'
        },
        {
          city_id: 132,
          name: '石岡區'
        },
        {
          city_id: 133,
          name: '東勢區'
        },
        {
          city_id: 134,
          name: '和平區'
        },
        {
          city_id: 135,
          name: '新社區'
        },
        {
          city_id: 136,
          name: '潭子區'
        },
        {
          city_id: 137,
          name: '大雅區'
        },
        {
          city_id: 138,
          name: '神岡區'
        },
        {
          city_id: 139,
          name: '大肚區'
        },
        {
          city_id: 140,
          name: '沙鹿區'
        },
        {
          city_id: 141,
          name: '龍井區'
        },
        {
          city_id: 142,
          name: '梧棲區'
        },
        {
          city_id: 143,
          name: '清水區'
        },
        {
          city_id: 144,
          name: '大甲區'
        },
        {
          city_id: 145,
          name: '外埔區'
        },
        {
          city_id: 146,
          name: '大安區'
        }
      ],
      9: [
        {
          city_id: 147,
          name: '彰化市'
        },
        {
          city_id: 148,
          name: '芬園鄉'
        },
        {
          city_id: 149,
          name: '花壇鄉'
        },
        {
          city_id: 150,
          name: '秀水鄉'
        },
        {
          city_id: 151,
          name: '鹿港鎮'
        },
        {
          city_id: 152,
          name: '福興鄉'
        },
        {
          city_id: 153,
          name: '線西鄉'
        },
        {
          city_id: 154,
          name: '和美鎮'
        },
        {
          city_id: 155,
          name: '伸港鄉'
        },
        {
          city_id: 156,
          name: '員林市'
        },
        {
          city_id: 157,
          name: '社頭鄉'
        },
        {
          city_id: 158,
          name: '永靖鄉'
        },
        {
          city_id: 159,
          name: '埔心鄉'
        },
        {
          city_id: 160,
          name: '溪湖鎮'
        },
        {
          city_id: 161,
          name: '大村鄉'
        },
        {
          city_id: 162,
          name: '埔鹽鄉'
        },
        {
          city_id: 163,
          name: '田中鎮'
        },
        {
          city_id: 164,
          name: '北斗鎮'
        },
        {
          city_id: 165,
          name: '田尾鄉'
        },
        {
          city_id: 166,
          name: '埤頭鄉'
        },
        {
          city_id: 167,
          name: '溪州鄉'
        },
        {
          city_id: 168,
          name: '竹塘鄉'
        },
        {
          city_id: 169,
          name: '二林鎮'
        },
        {
          city_id: 170,
          name: '大城鄉'
        },
        {
          city_id: 171,
          name: '芳苑鄉'
        },
        {
          city_id: 172,
          name: '二水鄉'
        }
      ],
      10: [
        {
          city_id: 173,
          name: '南投市'
        },
        {
          city_id: 174,
          name: '中寮鄉'
        },
        {
          city_id: 175,
          name: '草屯鎮'
        },
        {
          city_id: 176,
          name: '國姓鄉'
        },
        {
          city_id: 177,
          name: '埔里鎮'
        },
        {
          city_id: 178,
          name: '仁愛鄉'
        },
        {
          city_id: 179,
          name: '名間鄉'
        },
        {
          city_id: 180,
          name: '集集鎮'
        },
        {
          city_id: 181,
          name: '水里鄉'
        },
        {
          city_id: 182,
          name: '魚池鄉'
        },
        {
          city_id: 183,
          name: '信義鄉'
        },
        {
          city_id: 184,
          name: '竹山鎮'
        },
        {
          city_id: 185,
          name: '鹿谷鄉'
        }
      ],
      11: [
        {
          city_id: 186,
          name: '斗南鎮'
        },
        {
          city_id: 187,
          name: '大埤鄉'
        },
        {
          city_id: 188,
          name: '虎尾鎮'
        },
        {
          city_id: 189,
          name: '土庫鎮'
        },
        {
          city_id: 190,
          name: '褒忠鄉'
        },
        {
          city_id: 191,
          name: '東勢鄉'
        },
        {
          city_id: 192,
          name: '臺西鄉'
        },
        {
          city_id: 193,
          name: '崙背鄉'
        },
        {
          city_id: 194,
          name: '麥寮鄉'
        },
        {
          city_id: 195,
          name: '斗六市'
        },
        {
          city_id: 196,
          name: '林內鄉'
        },
        {
          city_id: 197,
          name: '古坑鄉'
        },
        {
          city_id: 198,
          name: '莿桐鄉'
        },
        {
          city_id: 199,
          name: '西螺鎮'
        },
        {
          city_id: 200,
          name: '二崙鄉'
        },
        {
          city_id: 201,
          name: '北港鎮'
        },
        {
          city_id: 202,
          name: '水林鄉'
        },
        {
          city_id: 203,
          name: '口湖鄉'
        },
        {
          city_id: 204,
          name: '四湖鄉'
        },
        {
          city_id: 205,
          name: '元長鄉'
        }
      ],
      12: [
        {
          city_id: 206,
          name: '東區'
        },
        {
          city_id: 207,
          name: '西區'
        }
      ],
      13: [
        {
          city_id: 208,
          name: '番路鄉'
        },
        {
          city_id: 209,
          name: '梅山鄉'
        },
        {
          city_id: 210,
          name: '竹崎鄉'
        },
        {
          city_id: 211,
          name: '阿里山鄉'
        },
        {
          city_id: 212,
          name: '中埔鄉'
        },
        {
          city_id: 213,
          name: '大埔鄉'
        },
        {
          city_id: 214,
          name: '水上鄉'
        },
        {
          city_id: 215,
          name: '鹿草鄉'
        },
        {
          city_id: 216,
          name: '太保市'
        },
        {
          city_id: 217,
          name: '朴子市'
        },
        {
          city_id: 218,
          name: '東石鄉'
        },
        {
          city_id: 219,
          name: '六腳鄉'
        },
        {
          city_id: 220,
          name: '新港鄉'
        },
        {
          city_id: 221,
          name: '民雄鄉'
        },
        {
          city_id: 222,
          name: '大林鎮'
        },
        {
          city_id: 223,
          name: '溪口鄉'
        },
        {
          city_id: 224,
          name: '義竹鄉'
        },
        {
          city_id: 225,
          name: '布袋鎮'
        }
      ],
      14: [
        {
          city_id: 226,
          name: '中西區'
        },
        {
          city_id: 227,
          name: '東區'
        },
        {
          city_id: 228,
          name: '南區'
        },
        {
          city_id: 229,
          name: '北區'
        },
        {
          city_id: 230,
          name: '安平區'
        },
        {
          city_id: 231,
          name: '安南區'
        },
        {
          city_id: 232,
          name: '永康區'
        },
        {
          city_id: 233,
          name: '歸仁區'
        },
        {
          city_id: 234,
          name: '新化區'
        },
        {
          city_id: 235,
          name: '左鎮區'
        },
        {
          city_id: 236,
          name: '玉井區'
        },
        {
          city_id: 237,
          name: '楠西區'
        },
        {
          city_id: 238,
          name: '南化區'
        },
        {
          city_id: 239,
          name: '仁德區'
        },
        {
          city_id: 240,
          name: '關廟區'
        },
        {
          city_id: 241,
          name: '龍崎區'
        },
        {
          city_id: 242,
          name: '官田區'
        },
        {
          city_id: 243,
          name: '麻豆區'
        },
        {
          city_id: 244,
          name: '佳里區'
        },
        {
          city_id: 245,
          name: '西港區'
        },
        {
          city_id: 246,
          name: '七股區'
        },
        {
          city_id: 247,
          name: '將軍區'
        },
        {
          city_id: 248,
          name: '學甲區'
        },
        {
          city_id: 249,
          name: '北門區'
        },
        {
          city_id: 250,
          name: '新營區'
        },
        {
          city_id: 251,
          name: '後壁區'
        },
        {
          city_id: 252,
          name: '白河區'
        },
        {
          city_id: 253,
          name: '東山區'
        },
        {
          city_id: 254,
          name: '六甲區'
        },
        {
          city_id: 255,
          name: '下營區'
        },
        {
          city_id: 256,
          name: '柳營區'
        },
        {
          city_id: 257,
          name: '鹽水區'
        },
        {
          city_id: 258,
          name: '善化區'
        },
        {
          city_id: 259,
          name: '大內區'
        },
        {
          city_id: 260,
          name: '山上區'
        },
        {
          city_id: 261,
          name: '新市區'
        },
        {
          city_id: 262,
          name: '安定區'
        }
      ],
      15: [
        {
          city_id: 263,
          name: '新興區'
        },
        {
          city_id: 264,
          name: '前金區'
        },
        {
          city_id: 265,
          name: '苓雅區'
        },
        {
          city_id: 266,
          name: '鹽埕區'
        },
        {
          city_id: 267,
          name: '鼓山區'
        },
        {
          city_id: 268,
          name: '旗津區'
        },
        {
          city_id: 269,
          name: '前鎮區'
        },
        {
          city_id: 270,
          name: '三民區'
        },
        {
          city_id: 271,
          name: '楠梓區'
        },
        {
          city_id: 272,
          name: '小港區'
        },
        {
          city_id: 273,
          name: '左營區'
        },
        {
          city_id: 274,
          name: '仁武區'
        },
        {
          city_id: 275,
          name: '大社區'
        },
        {
          city_id: 276,
          name: '東沙群島'
        },
        {
          city_id: 277,
          name: '南沙群島'
        },
        {
          city_id: 278,
          name: '岡山區'
        },
        {
          city_id: 279,
          name: '路竹區'
        },
        {
          city_id: 280,
          name: '阿蓮區'
        },
        {
          city_id: 281,
          name: '田寮區'
        },
        {
          city_id: 282,
          name: '燕巢區'
        },
        {
          city_id: 283,
          name: '橋頭區'
        },
        {
          city_id: 284,
          name: '梓官區'
        },
        {
          city_id: 285,
          name: '彌陀區'
        },
        {
          city_id: 286,
          name: '永安區'
        },
        {
          city_id: 287,
          name: '湖內區'
        },
        {
          city_id: 288,
          name: '鳳山區'
        },
        {
          city_id: 289,
          name: '大寮區'
        },
        {
          city_id: 290,
          name: '林園區'
        },
        {
          city_id: 291,
          name: '鳥松區'
        },
        {
          city_id: 292,
          name: '大樹區'
        },
        {
          city_id: 293,
          name: '旗山區'
        },
        {
          city_id: 294,
          name: '美濃區'
        },
        {
          city_id: 295,
          name: '六龜區'
        },
        {
          city_id: 296,
          name: '內門區'
        },
        {
          city_id: 297,
          name: '杉林區'
        },
        {
          city_id: 298,
          name: '甲仙區'
        },
        {
          city_id: 299,
          name: '桃源區'
        },
        {
          city_id: 300,
          name: '那瑪夏區'
        },
        {
          city_id: 301,
          name: '茂林區'
        },
        {
          city_id: 302,
          name: '茄萣區'
        }
      ],
      16: [
        {
          city_id: 303,
          name: '屏東市'
        },
        {
          city_id: 304,
          name: '三地門鄉'
        },
        {
          city_id: 305,
          name: '霧臺鄉'
        },
        {
          city_id: 306,
          name: '瑪家鄉'
        },
        {
          city_id: 307,
          name: '九如鄉'
        },
        {
          city_id: 308,
          name: '里港鄉'
        },
        {
          city_id: 309,
          name: '高樹鄉'
        },
        {
          city_id: 310,
          name: '鹽埔鄉'
        },
        {
          city_id: 311,
          name: '長治鄉'
        },
        {
          city_id: 312,
          name: '麟洛鄉'
        },
        {
          city_id: 313,
          name: '竹田鄉'
        },
        {
          city_id: 314,
          name: '內埔鄉'
        },
        {
          city_id: 315,
          name: '萬丹鄉'
        },
        {
          city_id: 316,
          name: '潮州鎮'
        },
        {
          city_id: 317,
          name: '泰武鄉'
        },
        {
          city_id: 318,
          name: '來義鄉'
        },
        {
          city_id: 319,
          name: '萬巒鄉'
        },
        {
          city_id: 320,
          name: '崁頂鄉'
        },
        {
          city_id: 321,
          name: '新埤鄉'
        },
        {
          city_id: 322,
          name: '南州鄉'
        },
        {
          city_id: 323,
          name: '林邊鄉'
        },
        {
          city_id: 324,
          name: '東港鎮'
        },
        {
          city_id: 325,
          name: '琉球鄉'
        },
        {
          city_id: 326,
          name: '佳冬鄉'
        },
        {
          city_id: 327,
          name: '新園鄉'
        },
        {
          city_id: 328,
          name: '枋寮鄉'
        },
        {
          city_id: 329,
          name: '枋山鄉'
        },
        {
          city_id: 330,
          name: '春日鄉'
        },
        {
          city_id: 331,
          name: '獅子鄉'
        },
        {
          city_id: 332,
          name: '車城鄉'
        },
        {
          city_id: 333,
          name: '牡丹鄉'
        },
        {
          city_id: 334,
          name: '恆春鎮'
        },
        {
          city_id: 335,
          name: '滿州鄉'
        }
      ],
      17: [
        {
          city_id: 336,
          name: '臺東市'
        },
        {
          city_id: 337,
          name: '綠島鄉'
        },
        {
          city_id: 338,
          name: '蘭嶼鄉'
        },
        {
          city_id: 339,
          name: '延平鄉'
        },
        {
          city_id: 340,
          name: '卑南鄉'
        },
        {
          city_id: 341,
          name: '鹿野鄉'
        },
        {
          city_id: 342,
          name: '關山鎮'
        },
        {
          city_id: 343,
          name: '海端鄉'
        },
        {
          city_id: 344,
          name: '池上鄉'
        },
        {
          city_id: 345,
          name: '東河鄉'
        },
        {
          city_id: 346,
          name: '成功鎮'
        },
        {
          city_id: 347,
          name: '長濱鄉'
        },
        {
          city_id: 348,
          name: '太麻里鄉'
        },
        {
          city_id: 349,
          name: '金峰鄉'
        },
        {
          city_id: 350,
          name: '大武鄉'
        },
        {
          city_id: 351,
          name: '達仁鄉'
        }
      ],
      18: [
        {
          city_id: 352,
          name: '花蓮市'
        },
        {
          city_id: 353,
          name: '新城鄉'
        },
        {
          city_id: 354,
          name: '秀林鄉'
        },
        {
          city_id: 355,
          name: '吉安鄉'
        },
        {
          city_id: 356,
          name: '壽豐鄉'
        },
        {
          city_id: 357,
          name: '鳳林鎮'
        },
        {
          city_id: 358,
          name: '光復鄉'
        },
        {
          city_id: 359,
          name: '豐濱鄉'
        },
        {
          city_id: 360,
          name: '瑞穗鄉'
        },
        {
          city_id: 361,
          name: '萬榮鄉'
        },
        {
          city_id: 362,
          name: '玉里鎮'
        },
        {
          city_id: 363,
          name: '卓溪鄉'
        },
        {
          city_id: 364,
          name: '富里鄉'
        }
      ],
      19: [
        {
          city_id: 365,
          name: '宜蘭市'
        },
        {
          city_id: 366,
          name: '頭城鎮'
        },
        {
          city_id: 367,
          name: '礁溪鄉'
        },
        {
          city_id: 368,
          name: '壯圍鄉'
        },
        {
          city_id: 369,
          name: '員山鄉'
        },
        {
          city_id: 370,
          name: '羅東鎮'
        },
        {
          city_id: 371,
          name: '三星鄉'
        },
        {
          city_id: 372,
          name: '大同鄉'
        },
        {
          city_id: 373,
          name: '五結鄉'
        },
        {
          city_id: 374,
          name: '冬山鄉'
        },
        {
          city_id: 375,
          name: '蘇澳鎮'
        },
        {
          city_id: 376,
          name: '南澳鄉'
        },
        {
          city_id: 377,
          name: '釣魚臺'
        }
      ],
      20: [
        {
          city_id: 378,
          name: '馬公市'
        },
        {
          city_id: 379,
          name: '西嶼鄉'
        },
        {
          city_id: 380,
          name: '望安鄉'
        },
        {
          city_id: 381,
          name: '七美鄉'
        },
        {
          city_id: 382,
          name: '白沙鄉'
        },
        {
          city_id: 383,
          name: '湖西鄉'
        }
      ],
      21: [
        {
          city_id: 384,
          name: '金沙鎮'
        },
        {
          city_id: 385,
          name: '金湖鎮'
        },
        {
          city_id: 386,
          name: '金寧鄉'
        },
        {
          city_id: 387,
          name: '金城鎮'
        },
        {
          city_id: 388,
          name: '烈嶼鄉'
        },
        {
          city_id: 389,
          name: '烏坵鄉'
        }
      ],
      22: [
        {
          city_id: 390,
          name: '南竿鄉'
        },
        {
          city_id: 391,
          name: '北竿鄉'
        },
        {
          city_id: 392,
          name: '莒光鄉'
        },
        {
          city_id: 393,
          name: '東引鄉'
        }
      ]
    }
  }),
  actions: {
    updateCityOptions(addressId) {
      this.cityOptions = this.citiesByAddress[addressId] || []
    }
  }
})
