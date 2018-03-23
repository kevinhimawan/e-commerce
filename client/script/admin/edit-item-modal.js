Vue.component('edit-item',{
    template : `
    <div id="edit-item-modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" style="max-width:1080px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{shoedata.name}} Edit</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body row" style="margin-right:0 !important;margin-left:0 !important;">
                    <div class="col-lg-6 edit-item-modal-left">
                        <h4 style="margin-bottom:20px;">Images Available</h4>
                        <div  class="edit-item-modal-image-available row">
                            <div v-for="(image,index) in shoedata.images" class="card col-md-6" style="border:none; position:relative !important; padding: 1em !important">
                                <img v-if="shoedata.images.length > 0" class="card-img-top" :src="image.path">
                                <button type="button" class="btn btn-default" v-on:click="removeAvailableImage(index,image._id)" style="position: absolute;background-color: transparent;">
                                    <i class="fas fa-minus-circle" style="color:red"></i>
                                </button>
                            </div>
                        </div>

                        <h4 style="margin-bottom:20px;">New Images</h4>
                        <div class="edit-item-modal-newimage-available row">
                            <div v-for="(img,index) in newImages" class="card col-md-6" style="border:none;position:relative !important; padding: 1em !important">
                                <img class="card-img-bottom" :src="img">
                                <button type="button" class="btn btn-default" v-on:click="removeNewImage(index)" style="position: absolute;background-color: transparent;">
                                    <i class="fas fa-minus-circle" style="color:red"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form>
                            <div class="form-group">
                                <label for="nameproduct">Name</label>
                                <input v-model="shoedata.name" type="text" class="form-control" id="nameproduct">
                            </div>
                            <div class="form-group">
                                <label for="brandproduct">Brand</label>
                                <input v-model="shoedata.brand" type="text" class="form-control" id="brandproduct">
                            </div>
                            <div v-for="(size,index) in shoedata.size" class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="eusize">EU</label>
                                    <input v-model="shoedata.size[index].eu" type="text" class="form-control" id="eusize">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="ussize">US</label>
                                    <input v-model="shoedata.size[index].us" type="text" class="form-control" id="ussize">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="uksize">UK</label>
                                    <input v-model="shoedata.size[index].uk" type="text" class="form-control" id="uksize">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="footlength">Foot Length</label>
                                    <input v-model="shoedata.size[index].footlength" type="text" class="form-control" id="footlength">
                                </div>
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
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button v-on:click="submitchange" type="button" class="btn btn-primary">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['shoedata'],
    data:function(){
        return{
            newImages: [],
            newImagesFile: [],
            removedAvailableImage: [],
            formEditProduct: new FormData()
        }
    },
    methods:{
        submitchange:function(){
            swal({
                title: 'Are you sure about all these changes?',
                icon: 'warning',
                buttons:{
                    yes: "Yes",
                    cancel: "Cancel",
                }
            })
            .then((value)=>{
                const self = this
                if(value === 'yes'){
                    if(this.newImagesFile.length > 0){
                        for(let i = 0; i < this.newImagesFile.length; i++){
                            let file = this.newImagesFile[i];
                            this.formEditProduct.append('image',file, file.name)
                        }
                    }

                    let formEditProduct = this.formEditProduct

                    for(let i = 0; i < this.shoedata.size.length; i++){
                        let detail = JSON.stringify(this.shoedata.size[i])
                        formEditProduct.append('size',detail)    
                    }
                    formEditProduct.append('id',this.shoedata._id)
                    formEditProduct.append('name',this.shoedata.name)
                    formEditProduct.append('brand',this.shoedata.brand)
                    formEditProduct.append('removedphoto', this.removedAvailableImage)
                    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                    axios.post('http://server-commerce.kevinhimawan.xyz/admin/updateproduct',formEditProduct,config)
                    .then(response=>{
                        window.location.href = 'admin.html'
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
            })
        },

        getImagefile:function(e){
            let imgs = event.target.files
            let array = []
            Object.keys(imgs).forEach((value,index)=>{
                this.createFile(imgs[index])
            })
        },

        onDrop:function(e){
            e.stopPropagation()
            e.preventDefault()
            $(this).css('border','2px dotted #bdc3c7')
            let files = e.dataTransfer.files;
            let imgs = files
            Object.keys(imgs).forEach((value,index)=>{
                this.createFile(imgs[index])
            })
        },

        dragover:function(e){
            e.stopPropagation()
            e.preventDefault()
            $('.drop').css('border','2px dotted #16a085')
        },

        createFile(file) {
            if (!file.type.match('image.*')) {
              alert('Select an image');
              return;
            }
            
            var img = new Image();
            var reader = new FileReader();
            var vm = this;
            
            reader.onload = function(e) {
                vm.newImages.push(e.target.result)   
                vm.newImagesFile.push(file)
            }
            reader.readAsDataURL(file);
        },

        removeNewImage:function(index){
            this.newImagesFile.splice(index,1)
            this.newImages.splice(index,1)
        },

        removeAvailableImage:function(index,id){
            swal({
                title: 'Remove confirmation',
                text: 'Are you sure want to remove this?',
                icon: 'warning',    
                buttons:{
                    ok: "Ok",
                    cancel: "Cancel"
                }
            }).then((value)=>{
                if(value === 'ok'){
                    this.removedAvailableImage.push(id)
                    this.$emit('shoeimageremove',{index:index})
                }
            })   
        },

    }
})