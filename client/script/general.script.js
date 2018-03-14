
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
        cartsQty: ""
    },
    created: function () {
        axios.get('http://localhost:3000/product/')
        .then(response=>{
            this.products = response.data
            if(localStorage.getItem('token')){
                $('#login_navbar').css('display','none')
                $('#signout_navbar').css('display','block')
            }
            let obj = {
                token : localStorage.getItem('token')
            }
            axios.post('http://localhost:3000/cart/getCart',obj)
            .then(response=>{
                this.cartsQty = response.data
            })
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
        addCart: function(idProduct){
            
            // const token = localStorage.getItem('token')
            // let obj = {
            //     product : idProduct,
            //     token: token
            // }
            // axios.post('http://localhost:3000/cart/addcart',obj)
            // .then(response=>{
            //     window.location.href = 'index.html'
            // })
            // .catch(err=>{

            // })
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
        }
    }
})
