<template>
  <v-card>
    <v-card-title>
      닌텐도 스위치 크롤러
    </v-card-title>
    <v-card-text>
      <v-list
          :three-line="true"
          :avatar="true"
        >
          <v-subheader>소프라노 닌텐도 스위치 리스트</v-subheader>
          <v-card-actions>
            <v-btn @click="test(1)">
              받아오기
            </v-btn>
          </v-card-actions>
          <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="7">
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="goToLink(i)"
              >
                <v-list-item-avatar tile=true size="60">
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.price"></v-list-item-subtitle>
                  <v-list-item-subtitle v-if="item.is_sold_out" class="red--text">
                    품절
                  </v-list-item-subtitle>
                </v-list-item-content>            
              </v-list-item>        
            </v-list-item-group>  
            <div class="text-xs-center mt-3" v-show="busy">
              <v-progress-circular
                indeterminate
                color="primary">
              </v-progress-circular>
            </div>
          </div>
        </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  data() {
    return {
      items: '',
      busy: false,
      count: 1
    }
  },
  methods: {
    async test(page) {
      const r = await this.$axios.get('/hello?page='+page)
      this.items = r.data
    },
    goToLink(idx){
      window.open(this.items[idx].link);
    },
    loadMore: function() {
      this.busy = true

      setTimeout(() => {
        this.test(this.count++)
        this.busy = false
      }, 1000);
    }
  }
}
</script>
