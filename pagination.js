export default {
    template: `<nav class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item" :class="{disabled : currentPage -1 <1}"><a class="page-link" href="#" @click="swichPage(currentPage -1 )"><<</a></li>
      <li class="page-item" v-for="num in totalPage" :key="num" :class="{active : num === currentPage}"><a class="page-link" href="#" @click="swichPage(num)">{{num}}</a></li>
      <li class="page-item" :class="{disabled : currentPage+1 > totalPage}"><a class="page-link" href="#" @click="swichPage(currentPage+1)">>></a></li>
    </ul>
  </nav>`,
  props: ["totalPage", "currentPage"],
  methods: {
    swichPage(page) {
      this.$emit("swichPage", page);
    },
  },
}