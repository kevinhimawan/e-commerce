Vue.component('admin-container',{
    template: `
        <div class="container" style="margin:50px auto;">
            <div class="row">
                <!-- Product List Start -->
                <div v-for="(shoe,index) in shoesdata" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 card" style="border:none; padding:1em 2em;">
                    <img v-if="shoe.images[0]" class="card-img-top" :src="shoe.images[0].path" alt="Card image cap">
                    <div class="card-body" style="padding: 10px 0;">
                        <h5 class="card-title admin-card-product-title">{{shoe.name}}</h5>
                        <h6 class="admin-card-product-brand">{{shoe.brand}}</h6>
                    </div>
                    <div style="padding: 0 0 10px 0; background-color:white; border-top:none;" class="card-footer">
                        <div class="dropdown" style="margin-bottom:5px">
                            <a style="width:100%;text-align:right;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span style="float:left;">View size collection</span>
                            </a>
                            <div v-if="shoe.size.length > 0" style="width:100%;" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div style="padding: 0" v-for="shoesize in shoe.size" class="dropdown-item admin-size-dropdown">
                                    <div class="admin-size-dropwdown-list" style="width: 33.33%">
                                        <h6 class="admin-size-dropdown-list-font">{{shoesize.eu}} EU</h6>
                                    </div>
                                    <div class="admin-size-dropwdown-list" style="width: 33.33%">
                                        <h6 class="admin-size-dropdown-list-font">{{shoesize.us}} US</h6>
                                    </div>
                                    <div class="admin-size-dropwdown-list" style="width: 33.33%">
                                        <h6 class="admin-size-dropdown-list-font">{{shoesize.uk}} UK</h6>
                                    </div>
                                </div>
                            </div>
                            <div v-else style="width:100%;" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">No Size assign yet</a>
                            </div>
                        </div>
                        <a data-toggle="modal" data-target="#edit-item-modal" class="product-edit-font" v-on:click="getproductdetail(shoe._id)">Edit</a>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['shoesdata'],
    methods:{
        getproductdetail:function (index){
            this.$emit('shoedata',{index:index})
        },
    }
})