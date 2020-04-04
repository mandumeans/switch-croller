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
            <v-btn @click="test">
              받아오기
            </v-btn>
          </v-card-actions>
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
      items: ''
    }
  },
  methods: {
    async test() {
      const r = await this.$axios.get('/hello')
      this.items = r.data
    },
    goToLink(idx){
      window.open(this.items[idx].link);
    }
  }
}
</script>
