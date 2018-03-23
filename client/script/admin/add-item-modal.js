Vue.component('add-item-modal',{
    template: `
        <div id="add-item-modal" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="newproductname">New Product Name</label>
                                <input autocomplete="off" v-model="newProductName" type="text" class="form-control" id="newproductname">
                            </div>
                            <div class="form-group">
                                <label for="brand">Brand</label>
                                <input autocomplete="off" v-model="brandName" type="text" class="form-control" id="brandname">
                            </div>
                            <div class="form-group">
                                <label>Drop or Select Image</label>
                                <div @dragover="dragover" @drop="onDrop" class="box-input drop">
                                    <label class="drag-file-label">Drag Here</label>
                                    <label class="fileContainer">
                                        Click here to upload
                                        <input @change="getImagefile" type="file" multiple/>
                                    </label>
                                </div>
                                <label>Image Collection</label>
                                <div class="will-upload-images">
                                    <div v-for="(image,index) in images" class="will-upload-image">
                                        <div class="will-upload-image-name">{{image.name}}</div>
                                        <div class="will-upload-image-button">
                                            <button type="button" v-on:click="removeImage(index)" class="btn btn-default">
                                                <i class="fas fa-minus-circle" style="color:red"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button v-on:click="submitForm" type="button" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    data:function(){
        return{
            images: [],
            formAddNewProduct: new FormData(),
            newProductName: '',
            brandName: '',
            allShoes: []
        }
    },
    props: ['allshoesdata'],
    methods:{
        submitForm:function(){
            if(this.images.length > 0 && this.brandName !== '' && this.newProductName !== ''){
                for(let i = 0; i < this.images.length; i++){
                    let file = this.images[i];
                    this.formAddNewProduct.append('image',file, file.name)
                }

                let formAddNewProduct = this.formAddNewProduct
                formAddNewProduct.append('name',this.newProductName)
                formAddNewProduct.append('brand',this.brandName)
                axios.post('http://server-commerce.kevinhimawan.xyz/admin/addproduct',formAddNewProduct)
                .then(response=>{
                    this.newProductName = ''
                    this.brandName = ''
                    this.formAddNewProduct = new FormData()
                    swal({
                        title: `New product added successfully`,
                        text: `Product ${response.data.name} has been successfully added to new collection`,
                        icon: 'success',
                        button: 'Done'
                    }).then(()=>{
                      window.location.href = 'admin.html'
                    })
                })
                .catch(err=>{
                    this.newProductName = ''
                    this.brandName = ''
                    this.formAddNewProduct = new FormData()
                })
            }else{
                swal({
                    title: `Error adding new product`,
                    text: `All datas are required`,
                    icon: "warning",
                    button: "Revise",
                })
            }
        },

        getImagefile:function(e){
            let img = event.target.files
            
            Object.keys(img).forEach((value) => {
                this.images.push(img[value])
            })
        },

        onDrop:function(e){
            e.stopPropagation()
            e.preventDefault()
            $(this).css('border','2px dotted #bdc3c7')
            
            let files = e.dataTransfer.files;
            let img = files
            Object.keys(img).forEach((value,index) => {
                this.images.push(img[value])
            })  
        },

        dragover:function(e){
            e.stopPropagation()
            e.preventDefault()
            $('.drop').css('border','2px dotted #16a085')
        },

        removeImage:function(index){
            this.images.splice(index,1)
        }
    }
})

