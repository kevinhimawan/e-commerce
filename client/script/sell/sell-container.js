Vue.component('sell-container',{
    template: `
        <div class="row" style="margin:40px auto !important; max-width: 1180px">
            <!-- Product Looping Start Here --> 
            <div v-for="shoe in allshoes" class="col-lg-3 col-sm-2 col-sx-1 card" style="border:none; padding:1em 2em;">
                <img class="card-img-top" :src="shoe.images[0].path" alt="Card image cap" style="padding: 10px !important">
                <div class="card-body" style="padding:0 !important">
                    <div class="sell-card-body-title">
                        <h4 class="sell-card-body-title-font">{{shoe.name}}</h4>
                    </div>
                    <div class="sell-card-body-info" style="width: 100%;display: flex;">
                        <div class="sell-card-body-info-ask col-lg-6" style="padding: 0">
                            <div v-if="shoe.shoeSellProduct[0]" class="sell-card-body-info-detail" style="border-radius: 2px 0 0 2px; border-right:1px solid white">
                                <div class="sell-card-body-info-ask">
                                    <h5 class="sell-card-body-info-ask-font">IDR {{shoe.lowestAsk}}</h5>
                                </div>
                                <div class="sell-card-body-info-bottom">
                                    <span class="sell-card-body-info-bottom-font">Lowest Ask</span>
                                </div>
                            </div>
                            <div v-else class="sell-card-body-info-detail" style="border-radius: 2px 0 0 2px; border-right:1px solid white">
                                <div class="sell-card-body-info-ask">
                                    <h5 class="sell-card-body-info-ask-font">IDR -</h5>
                                </div>
                                <div class="sell-card-body-info-bottom">
                                    <span class="sell-card-body-info-bottom-font">No One Ask</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="sell-card-body-info-bid col-lg-6" style="padding: 0">
                            <div v-if="shoe.shoeSellProduct[0]" class="sell-card-body-info-detail" style="border-radius: 0 2px 2px 0; border-left:1px solid white">
                                <div class="sell-card-body-info-ask">
                                    <h5 class="sell-card-body-info-ask-font">IDR -</h5>
                                </div>
                                <div class="sell-card-body-info-bottom">
                                    <span class="sell-card-body-info-bottom-font">Highest Bid</span>
                                </div>
                            </div>
                            <div v-else class="sell-card-body-info-detail" style="border-radius: 0 2px 2px 0; border-left:1px solid white">
                                <div class="sell-card-body-info-ask">
                                    <h5 class="sell-card-body-info-ask-font">IDR -</h5>
                                </div>
                                <div class="sell-card-body-info-bottom">
                                    <span class="sell-card-body-info-bottom-font">No One Bid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer" style="background-color:white!important; padding: 0 !important">
                    <button v-on:click="getSpecificProduct(shoe._id)" type="button" data-toggle="modal" data-target="#modal-sell" class="btn btn-outline-success sell-card-footer-sell-button">Sell</button>
                </div>
            </div>
        </div>
    `,
    props: ['allshoes'],
    methods:{
        getSpecificProduct:function(value){
            this.$emit('shoeid',{id:value})
        }
    }
})