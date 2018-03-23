new Vue({
    el: '#admin',
    data:{
        allShoes: [],
        searching: '',
        shoedata: ''
    },
    created:function(){
        const status = localStorage.getItem('status')
        if(status !== 'Admin'){
            window.location.href = 'index.html'
        }
        axios.get('http://server-commerce.kevinhimawan.xyz/admin/shoesdata')
        .then(response=>{
            this.allShoes = response.data
        })
    },
    methods:{
        searchFunction:function(){
            axios.get('http://server-commerce.kevinhimawan.xyz/admin/searchproduct',{
                headers:{
                    searchkey: this.searching
                }
            })
            .then(response=>{
                this.allShoes = response.data
            })
        },

        getshoedata:function(value){
            axios.get('http://server-commerce.kevinhimawan.xyz/admin/searchspecificproductbyid', {
                headers:value
            })
            .then(response=>{
                this.shoedata = response.data
            })
        },

        shoeimageremove:function(value){
            this.shoedata.images.splice(value.index,1)
        },

        signOut:function(){
            localStorage.clear()
            window.location.href = 'login.html'
        }
    }
})