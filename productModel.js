//拆解元件步驟：
// 1.  先把原件環境建立好
// 2. 把版型加入
// 3. 解除版型錯誤
// 4. $refs boot
export default {
  data() {
    return {
      productsModal: null,
    };
  },
  props: ["tempItem", "updateProduct"],
  template: `<div ref="productsModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
 <div class="modal-dialog modal-xl">
   <div class="modal-content border-0">
     <div class="modal-header bg-dark text-white">
       <h5 id="productModalLabel" class="modal-title">
         <span>新增產品</span>
       </h5>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
     <div class="modal-body">
       <div class="row">
         <div class="col-sm-4">
           <div class="mb-2">
             <div class="mb-3">
               <h6>主要圖片</h6>
               <label for="imageUrl" class="form-label">輸入圖片網址</label>
               <input type="text" class="form-control"
                      placeholder="請輸入圖片連結" v-model="tempItem.imageUrl">
             </div>
             <img :src="tempItem.imageUrl" :alt="tempItem.title" width="150" class="mb-2" v-if="tempItem.imageUrl">
           </div>
           <h6>多圖新增</h6>
             <div v-if="Array.isArray(tempItem.imagesUrl)">
               <div v-for="(item,i) in tempItem.imagesUrl" :key="i" class="mb-3">
                 <img :src="item" :alt="item" width="150" class="mb-2" v-if="item">
                 <input type="text" class="form-control mb-3" v-model="tempItem.imagesUrl[i]" placeholder="請輸入圖片連結">
               </div>
               <div>
                 <!-- 如果imagesUrl長度為0，或陣列最後一個索引有值，就會顯示這段 -->
                 <div v-if="!tempItem.imagesUrl.length || tempItem.imagesUrl[tempItem.imagesUrl.length-1]">
                   <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempItem.imagesUrl.push('')">
                   新增圖片
                   </button>
                 </div>
                 <!-- 如果imagesUrl長度不為0，且最後一個索引沒有值 -->
                 <div v-if="tempItem.imagesUrl.length && !tempItem.imagesUrl[tempItem.imagesUrl.length-1]">
                   <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempItem.imagesUrl.pop()">
                   刪除圖片
                   </button>
                 </div>
               </div>
             </div>
           </div>
         <div class="col-sm-8">
           <div class="mb-3">
             <label for="title" class="form-label">標題</label>
             <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempItem.title">
           </div>

           <div class="row">
             <div class="mb-3 col-md-6">
               <label for="category" class="form-label">分類</label>
               <input id="category" type="text" class="form-control"
                      placeholder="請輸入分類" v-model="tempItem.category">
             </div>
             <div class="mb-3 col-md-6">
               <label for="price" class="form-label">單位</label>
               <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempItem.unit">
             </div>
           </div>

           <div class="row">
             <div class="mb-3 col-md-6">
               <label for="origin_price" class="form-label">原價</label>
               <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempItem.origin_price">
             </div>
             <div class="mb-3 col-md-6">
               <label for="price" class="form-label">售價</label>
               <input id="price" type="number" min="0" class="form-control"
                      placeholder="請輸入售價" v-model.number="tempItem.price">
             </div>
           </div>
           <hr>

           <div class="mb-3">
             <label for="description" class="form-label">產品描述</label>
             <textarea id="description" type="text" class="form-control"
                       placeholder="請輸入產品描述" v-model="tempItem.description">
             </textarea>
           </div>
           <div class="mb-3">
             <label for="content" class="form-label">說明內容</label>
             <textarea id="description" type="text" class="form-control"
                       placeholder="請輸入說明內容" v-model="tempItem.content">
             </textarea>
           </div>
           <div class="mb-3">
             <div class="form-check">
               <input id="is_enabled" class="form-check-input" type="checkbox"
                     :true-value="1" :false-value="0" v-model="tempItem.is_enabled">
               <label class="form-check-label" for="is_enabled">是否啟用</label>
             </div>
           </div>
         </div>
       </div>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
         取消
       </button>
       <button type="button" class="btn btn-primary" @click="updateProduct">
         確認
       </button>
     </div>
   </div>
 </div>
</div>`,
methods: {
    openModel(){
        this.productsModal.show()
    },
    closeModel(){
        this.productsModal.hide()
    }
},
  mounted() {
    this.productsModal = new bootstrap.Modal(
      this.$refs.productsModal,
      {
        backdrop: "static",
        keyboard: false,
      },
    );
  },
};
