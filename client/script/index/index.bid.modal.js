Vue.component('index-bid-modal',{
  template: `
  <div id="indexmodalbid" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="max-width:880px">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Bid Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body modal-sell-product">
                <div class="modal-sell-product-left col-md-2">
                    <img class="card-img-top" v-for="(img,index) in specificshoe.images" :src="img.path"  alt="">
                </div>
                <div class="modal-sell-product-middle col-md-6">
                    <div class="modal-sell-product-middle-productname">
                        <h4 class="modal-sell-product-middle-productname-font">{{specificshoe.name}}</h4>
                    </div>
                    <div class="modal-sell-product-middle-brand">
                        <h6 class="modal-sell-product-middle-brand-font">{{specificshoe.brand}}</h6>
                    </div>
                    <div class="modal-sell-product-middle-marketinfo" style="margin-top:10px">
                    
                        <span v-if="specificshoe.lowestAsk" class="modal-sell-product-middle-marketinfo-font">Lowest Ask: IDR {{specificshoe.lowestAsk}}K</span>
                        <span v-else class="modal-sell-product-middle-marketinfo-font">Lowest Ask: - </span>
                        <span>|</span>
                        
                        <span v-if="specificshoe.highestBid" class="modal-sell-product-middle-marketinfo-font">Highest Bid: IDR {{specificshoe.highestBid}}</span>
                        <span v-else class="modal-sell-product-middle-marketinfo-font">Highest Bid: -</span>
                    </div>
                    <div v-if="infotrigger > 0 && modal.inputvalue != ''" class="modal-sell-product-middle-youraskinfo">
                        <div class="modal-sell-product-middle-youraskinfo-lowerthanbid" style="color: #199619" v-if="modal.inputvalue >= specificshoe.lowestAsk">
                            <span>You're about to purchase this product at the lowest Ask price</span>
                        </div>
                        <div v-else-if="modal.inputvalue < specificshoe.highestBid" style="color:#de3333" class="modal-sell-product-middle-youraskinfo-lowerthanask">
                            <span>You're not the highest bidder</span>
                        </div>
                        <div v-else-if="modal.inputvalue == specificshoe.highestBid" style="color: #de3333" class="modal-sell-product-middle-youraskinfo-equaltoask">
                            <span>You're about to match the highest Bid. Their Bid will be accepted first</span>
                        </div>
                        <div v-else-if="modal.inputvalue > specificshoe.highestBid" style="color:#de3333" class="modal-sell-product-middle-youraskinfo-higherthanask">
                            <span>You're about to be the highest bidder</span>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top:20px;">
                        <label style="margin-bottom:5px;" for="comment">Notes:</label>
                        <textarea class="form-control" v-model="modal.notes" rows="3" id="comment" placeholder="leave notes"></textarea>
                    </div>  
                </div>
                <div class="modal-sell-product-right col-md-4">
                    <div class="modal-sell-product-right-top">
                        <div class="dropdown show selectSizeDropDown col-md-6">
                            <a class="btn btn-secondary dropdown-toggle" style="text-align: right;width:100%;" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span style="float:left">{{modal.size}}</span>
                            </a>
                            <div style="width:260px" class="dropdown-menu selectSizeDropDown-menu" aria-labelledby="dropdownMenuLink">

                                <div v-on:click="selectsize(size,index)" v-for="(size,index) in specificshoe.size" class="selectSizeDropDown-menu-list">
                                    <div class="selectSizeDropDown-menu-size col-md-4">
                                        <h4 class="selectSizeDropDown-menu-size-font">{{size.eu}} EU</h4>
                                    </div>
                                    <div class="selectSizeDropDown-menu-market-info col-md-8">
                                        <div v-if="size.lowestAsk" class="selectSizeDropDown-menu-market-info-lowestask">
                                            <h6 class="selectSizeDropDown-menu-market-info-font">Lowest ask: IDR {{size.lowestAsk}}K</h6>
                                        </div>
                                        <div v-else class="selectSizeDropDown-menu-market-info-lowestask">
                                            <h6 class="selectSizeDropDown-menu-market-info-font">Lowest ask: -</h6>
                                        </div>
                                        <div v-if="size.highestBid" class="selectSizeDropDown-menu-market-info-highesbid">
                                            <h6 class="selectSizeDropDown-menu-market-info-font">Highest bid: IDR {{size.highestBid}}K</h6>
                                        </div>
                                        <div v-else class="selectSizeDropDown-menu-market-info-highesbid">
                                            <h6 class="selectSizeDropDown-menu-market-info-font">Highest bid: -</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown show selectExpiredDuration col-md-6">
                            <a style="width:100%;text-align: right; text-align:right !important" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span style="float:left">{{modal.duration}}</span>
                            </a>
                            <div class="dropdown-menu selectExpiredDuration-dropwdown" aria-labelledby="dropdownMenuLink">
                                <a v-on:click="selectexpired(1)" class="dropdown-item" href="#">1 Day</a>
                                <a v-on:click="selectexpired(3)" class="dropdown-item" href="#">3 Days</a>
                                <a v-on:click="selectexpired(7)" class="dropdown-item" href="#">7 Days</a>
                                <a v-on:click="selectexpired(14)" class="dropdown-item" href="#">14 Days</a>
                                <a v-on:click="selectexpired(21)" class="dropdown-item" href="#">21 Days</a>
                                <a v-on:click="selectexpired(30)" class="dropdown-item" href="#">30 Days</a>
                                <a v-on:click="selectexpired(60)" class="dropdown-item" href="#">60 Days</a>
                            </div>
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 1rem;padding: 0 8px; margin-top:15px;">
                        <label style="margin-bottom:0" for="askinputsellmodal">Input</label>
                        <input v-on:keyup="checkValue" v-model="modal.inputvalue" type="number" class="form-control" id="askinputsellmodal" placeholder="IDR">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button v-on:click="submitsell" type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
  </div>
  `,
  data: function () {
    return {
      infotrigger: 0
    }
  },
  props: ['specificshoe', 'modal'],
  methods: {
    selectsize:function(size,i){
      this.$emit('changemodal',{size: size.eu,sizeid:size._id,index:i})
    },

    checkValue:function(){
        this.infotrigger++
    },

    selectexpired:function(duration){
        this.$emit('changeduration',{duration:duration})
    },

    submitsell:function(){
        const userid = localStorage.getItem('userid')

        let submitForm = {
            userid: userid,
            shoeProduct: this.specificshoe._id,
            size: this.modal.sizeid,
            price: this.modal.inputvalue,
            duration: this.modal.duration,
            notes: this.modal.notes
        }
        
        let countBlank;
        Object.keys(submitForm).forEach((key,index)=>{
            if(submitForm[key] === '' || submitForm[key] === null){countBlank = key}
            if(key === 'duration' && submitForm[key] === 'Duration'){
                countBlank = key
            }
            if(key === 'size' && submitForm[key] === 'Size'){
                countBlank = key
            }
        })
        console.log(submitForm)
        if(countBlank){
            swal({
                title: `Something is missing`,
                icon: 'warning',
                text : `${countBlank} data is required`,
                button: `Revise`
            })
        }else{
            axios.post('http://server-commerce.kevinhimawan.xyz/home/bidproduct',submitForm)
            .then(response=>{
                window.location.href = 'index.html' 
            })
            .catch(err =>{
              console.log(err)
            })
        }
    }
  }
})