Vue.component('index-container', {
  template:`
    <div class="row" style="margin:40px auto !important; max-width: 1180px">
      <div v-for="(shoe,index) in shoealldata" class="card col-lg-3 col-sm-2 col-xs-1" style="border:none; padding:1em 2em;">
        <img class="card-img-top" :src="shoe.images[0].path" alt="Card image cap">
        <div class="card-body" style="padding:0 !important; margin-bottom:10px;" >
          <div class="sell-card-body-title">
            <h4 class="sell-card-body-title-font" style="text-align:left;">{{shoe.name}}</h4>
          </div>
          <div class="home-card-body-price" style="margin-bottom:5px;">
            <h4 v-if="shoe.lowestAsk" class="home-card-body-price">IDR {{shoe.lowestAsk}}</h4>
            <h4 v-else class="home-card-body-price">IDR --</h4>
          </div>
          <div class="home-card-body-info" style="display:flex; width:100%">
            <div class="col-lg-6" style="float:left; padding: 0;">
              <h4 class="home-card-body-info-font">In thousand</h4>
            </div>
            <div class="col-lg-6" style="text-align:right; padding: 0;">
              <h4 class="home-card-body-info-font">0 sold</h4>
            </div>            
          </div>
        </div>
        <div class="card-footer" style="padding: 0; background-color:white;border:none; display:flex"> 
          <button data-toggle="modal" data-target="#indexmodalsell" v-on:click="getspecificproduct(shoe._id)" class="col-lg-6 sell-card-body-info-detail btn-outline-success btn" style="padding: 5px 0;line-height:1; text-align:center; border-radius: 2px; margin-right:2px">
            Sell
          </button>
          <button data-toggle="modal" data-target="#indexmodalbid" v-on:click="getspecificproduct(shoe._id)" class="col-lg-6 sell-card-body-info-detail btn-outline-success btn" style="padding: 5px 0;line-height:1; text-align:center; border-radius: 2px; margin-left:2px;">
            Bid
          </button>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {

    }
  },
  props: ['shoealldata'],
  methods: {
    getspecificproduct: function (value) {
      this.$emit('shoeid', {id:value})
    }
  }
})