import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
	data(){
		return{
            user:{
                username:"",
                password:""
            }
		}
	},
	methods:{
		login(){
            const url = `https://vue3-course-api.hexschool.io/v2/admin/signin`;
            axios.post(url , this.user)
            .then(res=>{
                alert(res.data.message);
                const { token , expired } = res.data;
                document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
                window.location = `products.html`
            })
            .catch(err=>{
                alert(err.data.message);
            })
        }
	},
}).mount('#app')