
// // const token = localStorage.getItem('token')

// if(token){
//     $('#login_navbar').remove()
//     $('#signout_navbar').css('display','block')
// }else{
//     window.location.href = 'login.html'
// }

// General Script
$(document).ready(function(){
    $('.modal').modal();
    $('.search_inmodal_sell').click(()=>{
        $('.search_inmodal_sell').css('box-shadow','0 0 0 0')
    })
});

// axios..
let search_input_product_count_home = 0
new Vue({
    el: '#app',
    data:{
        products: [],
        lowestPrice:[],
        carts: [],
        cartsQty: "",
        sellProducts: [],
        productDetail: [],
        currentProduct: {},
        size: []
    },
    created: function () {
        axios.get('http://localhost:3000/product/')
        .then(response=>{
            this.sellProducts = response.data.sellProducts
            this.products = response.data.products
            this.size = response.data.size
            if(localStorage.getItem('token')){
                $('#login_navbar').css('display','none')
                $('#signout_navbar').css('display','block')
            }
            

            // if(localStorage.getItem('token')){
            //     let obj = {
            //         token : localStorage.getItem('token')
            //     }
            //     axios.post('http://localhost:3000/cart/getCart',obj)
            //     .then(response=>{
            //         this.cartsQty = response.data
            //     })
            // }else{
            //     window.location.href = 'login.html'
            // }
            
        })
        .catch(err=>{

        })
    },
    methods:{
        searchFunction:function(){
            const input = $('#search_input_home').val()
            if(input === ''){
                if(search_input_product_count_home===0){
                    $('#search_form_home').append(`<span class="unfilled_form_error_msg">Unfilled input form!</span>`)
                    search_input_product_count_home++
                }
            }else{
                search_input_product_count_home = 0
                axios.post('http://localhost:3000/product/findProduct',{input:input})
                .then(response=>{
                    console.log(response.data[0].total)
                    this.products = response.data
                })
                .catch(err=>{

                })
            }
        },
        direct_login:function(){
            window.location.href = 'login.html'
        },
        checkout:function(){
            localStorage.clear()
            window.location.href = 'index.html'
        },
        showSize: function(idProduct){
            
            let product;
            for(let k = 0 ; k < this.products.length;k++){
                if(this.products[k]._id === idProduct){
                    product = this.products[k]
                }
            }

            this.currentProduct = product
            
            let sizes = []
            for(let i = 0; i < product.sellProduct.length;i++){
                let currentSize = product.sellProduct[i].size
                
                if(sizes.indexOf(currentSize) === -1){
                    sizes.push(product.sellProduct[i].size)
                }
            }
            let sortProduct = []
            for(let i = 0; i < sizes.length;i++){
                let sizesPerIndex = []
                for(let j = 0;j < product.sellProduct.length;j++){
                    if(sizes[i] === product.sellProduct[j].size){
                        sizesPerIndex.push(product.sellProduct[j])
                    }
                }
                let cheapest = sizesPerIndex[0].price
                let cheapestObj;
                for(let k = 0; k < sizesPerIndex.length;k++){
                    if(sizesPerIndex[k].price < cheapest){
                        cheapestObj = sizesPerIndex[k]
                        for(let l = 0; l < this.size.length;l++){
                            if(cheapestObj.size === this.size[l]._id){
                                cheapestObj['sizeName'] = this.size[l].name
                            }
                        }
                        cheapest = sizesPerIndex[k].price
                    }
                }
                sortProduct.push(cheapestObj)
            }
            this.productDetail = sortProduct
            
        },
        getCart:function(){
            let obj = {
                token: localStorage.getItem('token')
            }
            axios.post('http://localhost:3000/cart/showCart',obj)
            .then(response=>{
                this.carts = response.data
                console.log(this.carts)
            })
            .catch(err=>{

            })
        },
        pickSize:function(productid){
            
        }
    }
})
