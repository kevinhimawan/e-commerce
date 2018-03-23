Vue.component('add-size-item-modal',{
    template:`
        <div id="add-item-size-modal" class="modal" tabindex="-1" role="dialog">
            <div style="max-width:700px" class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Product Size</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <div class="dropdown show">
                                    <a style="width:100%;text-align:right;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span style="float:left;">{{dropdownselect}}</span>
                                    </a>
                                    <div style="width:100%;" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a v-for="shoedata in shoesdata" v-on:click="selectshoes(shoedata._id,shoedata.name)" class="dropdown-item" href="#">{{shoedata.name}}</a>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="inputCity">EU Size</label>
                                    <input v-model="submitform.eu" type="text" class="form-control" id="eusize">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputCity">UK Size</label>
                                    <input v-model="submitform.uk" type="text" class="form-control" id="uksize">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputCity">US Size</label>
                                    <input v-model="submitform.us" type="text" class="form-control" id="ussize">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputCity">Foot Length (cm)</label>
                                    <input v-model="submitform.footlength" type="text" class="form-control" id="footlength">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputCity">Additional Description</label>
                                <textarea v-model="submitform.description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <button v-on:click="submitFormAddSize" type="button" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    data:function(){
        return{
            dropdownselect: 'Select shoes',
            submitform:{
                product: '',
                eu: '',
                uk: '',
                us: '',
                footlength: '',
                description: ''
            },
            shoeData: ''
        }
    },
    props: ['shoesdata'],
    methods:{
        selectshoes:function(idshoes,name){
            this.dropdownselect = name
            this.submitform.product = idshoes
            for(let i = 0; i < this.shoesdata.length; i++){
                if(String(this.shoesdata[i]._id) === String(idshoes)){
                    this.shoeData = this.shoesdata[i]
                }
            }
            console.log(this.shoeData)
        },

        submitFormAddSize:function(){
            let checkNull = 0
            Object.keys(this.submitform).forEach((key,index)=>{
                if(this.submitform[key] === '' && key !== 'description'){
                    checkNull++
                }
            })

            let checkSame = 0
            for(let i = 0; i < this.shoeData.size.length; i++){
                if(this.shoeData.size[i].uk === this.submitform.uk){
                    checkSame++
                }

                if(this.shoeData.size[i].eu === this.submitform.eu){
                    checkSame++
                }

                if(this.shoeData.size[i].us === this.submitform.us){
                    checkSame++
                }
            }
            
            if(checkNull > 0 || checkSame > 0){
                swal({
                    title: 'Error adding new size',
                    text: 'All datas are required or Data size has been added',
                    icon: 'warning',
                    button: 'Revise',
                })
            }else{
                axios.post('http://server-commerce.kevinhimawan.xyz/admin/addsize',this.submitform)
                .then(response=>{
                    window.location.href = 'admin.html'
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }
})