Vue.component('login-component',{
    template : `
        <form id="login_form" v-bind:style="{display: login}" class="col s12 login_form">
            <div class="title">
                <h4 class="logo_font">Sneaks It</h4>
                
            </div>
            <div class="form-group set_input">
                <label for="username_email_signin">Username or Email</label>
                <input v-model="username" value="" id="username_email_signin" type="text" class="form-control">
                <span style="display: none" class="login_user_notfound">Username not found or Password is wrong</span>
            </div>
            <div class="form-group set_input">
                <label for="password_singin">Password</label>
                <input v-model="password" value="" id="password_singin" type="password" class="form-control">
                <div v-on:click="openEye" id="password_showup_login">
                    <i class="fas fa-eye signup_icons_desriptive"></i>    
                </div>
            </div>
            <div class="buttons_login">
                <button v-on:click="loginSubmit" id="signin_button" type="button" class="btn btn-outline-primary">Submit</button>    
                <button v-on:click="switching" id="signup_button" type="button" class="btn btn-outline-info">Sign Up</button>
            </div>
        </form>
    `,
    data:function(){
        return{
            username: '',
            password: '',
        }
    },
    props: ['eyepassword','login'],
    methods:{
        openEye:function(){
            if(this.eyepassword === 0){
                document.getElementById("password_singin").setAttribute("type", "text"); 
                this.$emit('changeeyepassword',{eyePassword : 1})
            }else{
                document.getElementById("password_singin").setAttribute("type", "password"); 
                this.eyePassword = 0
                this.$emit('changeeyepassword',{eyePassword : 0})
            }
        },
        switching:function(){
            this.$emit('changeloginorsignup',{login:'none'})
            this.$emit('changeeyepassword',{eyePassword : 0})
        },
        loginSubmit:function(){
            let userData = {
                username: this.username,
                password: this.password
            }
            let checkNull = 0
            Object.keys(userData).forEach((key,index)=>{
                if(userData[key]==''){checkNull++}
            })
            if(checkNull > 0){
                swal({
                    title: "Warning",
                    text: "All data are required",
                    icon: "warning",
                    button: "Revise",
                })
            }else{
                axios.post('http://server-commerce.kevinhimawan.xyz/login/login',userData)
                .then(response=>{
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('userid',response.data.userid)
                    localStorage.setItem('status',response.data.status)
                    if(response.data.status === 'Admin'){
                        window.location.href = 'admin.html'
                    }else{
                        window.location.href = 'index.html'
                    }
                })
                .catch(error=>{
                    
                })
            }
        }
    }
})