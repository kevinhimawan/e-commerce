// Shortening
function shortWord(value){
    newStr = ""
    for(let i = 0; i < value.length; i++){
        if(i < 47){
            newStr+=value[i]
        }else if(i < 50){
            newStr+= '...'
        }
    }
    return newStr
}

// Modal
$(document).ready(function(){
    $('.modal').modal();
    $('.search_inmodal_sell').click(()=>{
        $('.search_inmodal_sell').css('box-shadow','0 0 0 0')
    })
})

// axioss
let search = localStorage.getItem('search')
axios.post('http://localhost:3000/product/findProduct',{input:search})
.then(response=>{
    response.data.forEach(each=>{
        let template = `<div class="card showcase_product">    
                            <div class="card-content card_content_custom">
                                <h2 class="card_content_title">${shortWord(each.name)}</h2>
                                <h2 class="card_content_subtitle">LOWEST ASK</h4>
                                <h2 class="card_content_price">1,000K</h2>
                                <div class="card_content_footer">
                                    <h4 class="card_content_monetary">In Rupiah</h4>
                                    <h4 class="card_content_quantity">1000 bid</h4>
                                </div>
                            </div>
                            <div class="card-action card_action_custom">
                                <a class="card_action_font">Bid</a>
                                <a href="#sell_product" onlick="viewProduct('${each._id}')" class="modal-trigger modal-action card_action_font">Sell</a>
                                <a class="card_action_font">Share</a>
                            </div>
                        </div>`
        $('#search_showcase').append(template)
    })
})
.catch(err=>{

})

function searchProduct(value){
    console.log(value)
}

function viewProduct(value){
    $('#sell_product').modal()
}