Vue.component('signup-component', {
    template :`
        <form id="signup_form" v-bind:style="{display: signup}" class="col s12 login_form">
            <div class="center-align title">
                <h4 class="center-align logo_font">Sneaks It</h4>
            </div>
            <div class="form-group set_input">
                <label for="username_signup">Username</label>
                <input v-model="username" id="username_signup" type="text" class="form-control">
            </div>
            <div id="email_div" class="form-group set_input">
                <label for="email_signup">Email</label>
                <input v-on:keyup="checkEmail" v-model="email" id="email_signup" type="text" class="form-control">
                <small v-bind:style="{display: emailCheck}" id="email_signup_small" class="form-text text-muted">Email invalid</small>
                <small v-bind:style="{display: emaildouble}" id="email_signup_small" class="form-text text-muted">This {{email}} email address has already taken</small>
            </div>
            <div id="password_div" class="form-group set_input">
                <label for="password_signup">Password</label>
                <input v-model="password" id="password_signup" type="password" class="form-control">
                <div v-on:click="openEye(1)" id="password_showup">
                    <i class="fas fa-eye signup_icons_desriptive"></i> 
                </div>
            </div>
            <div id="respassword_div" class="form-group set_input">
                <label for="repassword_signup">Confirm Password</label>
                <input v-on:keyup="checkPassword" v-model="repassword" id="repassword_signup" type="password" class="form-control">
                <div v-on:click="openEye(2)" id="repassword_showup">
                    <i class="fas fa-eye signup_icons_desriptive"></i>
                </div>
                <small v-bind:class="{block: isActive, none: isNone}" id="repassword_signup_small" class="form-text text-muted">Password not match.</small>
            </div>
            <div class="buttons_login">
                <button v-on:click="signitup" id="signup_button_submit" type="button" class="btn btn-outline-primary">Submit</button>    
                <button v-on:click="switching" id="haveacount_button" type="button" class="btn btn-outline-info">Have Acount</button>
            </div>
        </form>
    `,
    data:function(){
        return{
            username: '',
            email: '',
            password: '',
            repassword: '',      
            isActive:false,
            isNone: true,
            emailCheck: 'none',
            emaildouble: 'none',
            emailErrorCheckCount: 0,
        }
    },
    created:function(){
        localStorage.clear()
    },
    props:['eyepassword','eyerepassword','signup','userdata'],
    methods:{
        checkPassword:function(e){
            if(this.password !== this.repassword){
                this.isActive = true
                this.isNone = false
            }else{
                this.isActive = false
                this.isNone = true
            }
        },
        checkEmail:function(){
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            let emailVal = this.email
            if(emailVal.match(regex)===null){this.emailCheck = 'block',this.emailErrorCheckCount = 1}else{this.emailCheck = 'none', this.emailErrorCheckCount = 0}
        },
        switching:function(){
            this.$emit('changeloginorsignup',{signup:'none'})
            this.$emit('changeeyepassword',{eyePassword : 0})
        },
        openEye:function(value){
            if(value == 1){
                if(this.eyepassword === 0){
                    document.getElementById("password_signup").setAttribute("type", "text"); 
                    this.$emit('changeeyepassword',{eyePassword : 1})
                }else{
                    document.getElementById("password_signup").setAttribute("type", "password"); 
                    this.eyePassword = 0
                    this.$emit('changeeyepassword',{eyePassword : 0})
                }
            }
        
            if(value == 2){
                if(this.eyerepassword === 0){
                    document.getElementById("repassword_signup").setAttribute("type", "text"); 
                    this.$emit('changeeyepassword',{eyeRepassword:1})
                }else{
                    document.getElementById("repassword_signup").setAttribute("type", "password"); 
                    this.$emit('changeeyepassword',{eyeRepassword:0})
                }
            }
        },
        signitup:function(){
            if(this.password != this.repassword){
                swal({
                        title: "Warning",
                        text: "Password and Confirmation password should match",
                        icon: "warning",
                        button: "Revise",
                    }) 
            }else{
                let dataNewUser = {
                    username : this.username,
                    email: this.email,
                    password: this.password
                }
                let checknull = 0
                let checkEmailError = 0
                Object.keys(dataNewUser).forEach((key,index)=>{
                    if(dataNewUser[key] === ''){checknull++}
                    if(key === 'email' && this.emailErrorCheckCount > 0){checkEmailError++}
                })
                if(checkEmailError > 0){
                    swal({
                        title: "Warning",
                        text: "Email format is invalid",
                        icon: "warning",
                        button: "Revise",
                    })
                }
                if(checknull > 0){
                    swal({
                        title: "Warning",
                        text: "All datas are required",
                        icon: "warning",
                        button: "Revise",
                    }) 
                }else{
                    axios.post('http://server-commerce.kevinhimawan.xyz/login/create',dataNewUser)
                    .then(response=>{
                        localStorage.setItem('token',response.data.token)
                        localStorage.setItem('userid',response.data.userid)
                        localStorage.setItem('status',response.data.status)
                        window.location.href = 'index.html'
                    })
                    .catch(err=>{
                        this.emaildouble = 'block'
                    })
                }
            }
            
        }
    }
  })