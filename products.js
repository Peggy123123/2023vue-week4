import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

//元件
import pagination from './pagination.js'
import productsModal from "./productModel.js";
import deleteProductsModel from './deleteproductsModel.js'

// let productModal= null;
let delProductModal = null;

const App = createApp({
  components: {
    productsModal,
    deleteProductsModel,
    pagination
  },
  data() {
    return {
      url: `https://vue3-course-api.hexschool.io/v2/`,
      api_path: `peggy123`,
      data: [],
      tempItem: {},
      isNew: false,
      currentPage: 1, //當前頁碼
      perPage: 5, //每頁最多幾筆
    };
  },
  computed: {
    //計算總共要有幾頁
    totalPage() {
      return Math.ceil(this.data.length / this.perPage);
    },
    //每頁的資料內容
    tempData() {
      return this.data.filter((item, index) => {
        return Math.floor(index / this.perPage) === this.currentPage - 1;
      });
    },
  },
  methods: {
    checkUser() {
      axios
        .post(`${this.url}api/user/check`)
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = `login.html`;
        });
    },
    getData() {
      axios
        .get(`${this.url}api/${this.api_path}/admin/products/all`)
        .then((res) => {
          let arr = Object.values(res.data.products);
          this.data = arr;
        })
        .catch((err) => {
          alert(err.data);
        });
    },
    openModel(status, item) {
      if (status === "new") {
        this.isNew = true;
        this.tempItem = { imagesUrl: [] };
        this.$refs.pModel.openModel()

      } else if (status === "edit") {
        this.isNew = false;
        this.tempItem = { ...item };
        if (!this.tempItem.imagesUrl) {
          this.tempItem.imagesUrl = [];
        }
        this.$refs.pModel.openModel()

      } else if (status === "delete") {
        this.isNew = false;
        this.tempItem = { ...item };
        this.$refs.dModel.openModel()
      }
    },
    updateProduct() {
      let api = `${this.url}api/${this.api_path}/admin/product/${this.tempItem.id}`;
      let http = `put`;
      if (this.isNew) {
        api = `${this.url}api/${this.api_path}/admin/product`;
        http = `post`;
      }
      axios[http](api, { data: this.tempItem })
        .then((res) => {
          alert(res.data.message);
          this.getData();
          this.$refs.pModel.closeModel();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    deleteProduct() {
      axios
        .delete(
          `${this.url}api/${this.api_path}/admin/product/${this.tempItem.id}`,
        )
        .then((res) => {
          alert(res.data.message);
          this.getData();
          this.$refs.dModel.closeModel()
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    swichPage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    //取得 Token（Token 僅需要設定一次）
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    //token自動夾帶進去headers
    axios.defaults.headers.common["Authorization"] = token;

    this.checkUser();

  },
});

App.mount("#app");
