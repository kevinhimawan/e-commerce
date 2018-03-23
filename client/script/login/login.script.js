new Vue({
    el: '#login_page',
    data:{
        eyePassword: 0,
        eyeRepassword: 0,
        signup: 'none',
        login: 'block',
        userData: []
    },
    created:function(){
        localStorage.clear()
    },
    methods:{
        changeEyePassword:function(value){
            Object.keys(value).forEach((key,index)=>{
                if(key === 'eyePassword'){
                    this.eyePassword = value.eyePassword
                }else{
                    this.eyeRepassword = value[key]
                }
            })
            
        },
        changeloginorsignup:function(value){
            Object.keys(value).forEach((key,index)=>{
                if(key == 'signup'){this.signup = value[key],this.login = 'block'}
                else if(key == 'login'){this.login = value[key], this.signup = 'block'}
            })
        }
    }
})

// let countEmail = 0
// $('#email_signup').keyup(function(){
//     let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//     let emailVal = $('#email_signup').val()
    
//     if(!(emailVal.match(regex)) && countEmail === 0){
//         $('#email_signup').css('border-bottom', '1px solid red')
//         $('#email_signup').css('box-shadow', '0 1px 0 0 red')
//         $('#email_signup').css('margin-bottom', '5px')
//         $('#email_div').append('<span id="email_signup_error" class="form_signup_error">Wrong Email Format</span>')
//         countEmail++
//     }else if(emailVal.match(regex)){
//         axios.get('http://server-commerce.kevinhimawan.xyz/user/get')
//         .then(userData =>{
//             const userList = userData.data
//             const checkUserEmail = userList.filter(user=>{
//                 if(emailVal === user.email){
//                     return user.email
//                 }
//             })

//             if(checkUserEmail.length > 0){
//             $('#email_signup').css('border-bottom', '1px solid red')
//             $('#email_signup').css('box-shadow', '0 1px 0 0 red')
//             $('#email_signup').css('margin-bottom', '5px')
//             if($('#email_signup_error').length > 0){
//                 $('#email_signup_error').remove()
//                 $('#email_div').append(`<span id="email_signup_error" class="form_signup_error">Email ${emailVal} has already taken</span>`)    
//             }
    
//             }else{
//                 $('#email_signup_error').remove()
//                 $('#email_signup').css('border-bottom', '1px solid #4CAF50')
//                 $('#email_signup').css('box-shadow', '0 1px 0 0 #4CAF50')
//                 $('#email_signup').css('margin-bottom', '20px')
//                 countEmail = 0
//             }
//         })
//         .catch(err=>{
    
//         })
//     }
// })

// // Check Confirmation Password
// let countRepassword = 0
// $('#repassword_signup').keyup(function(){
//     if($('#password_signup').val() !== $('#repassword_signup').val()){
//         $('#repassword_signup').css('border-bottom', '1px solid red')
//         $('#repassword_signup').css('box-shadow', '0 1px 0 0 red')
//         $('#repassword_signup').css('margin-bottom', '5px')
//         if(countRepassword === 0){
//             $('#respassword_div').append('<span id="email_signup_confirmation" class="form_signup_error">Wrong Confirmation</span>')
//         }
//         countRepassword++
//     }else{
//         $('#email_signup_confirmation').remove()
//         $('#repassword_signup').css('border-bottom', '1px solid #4CAF50')
//         $('#repassword_signup').css('box-shadow', '0 1px 0 0 #4CAF50')
//         $('#repassword_signup').css('margin-bottom', '20px')
//         countRepassword = 0
//     }
// })

// $('#password_signup').keyup(function(){
//     if($('#password_signup').val() === $('#repassword_signup').val()){
//         $('.respassword_error').remove()
//         $('#repassword_signup').css('border-bottom', '1px solid #4CAF50')
//         $('#repassword_signup').css('box-shadow', '0 1px 0 0 #4CAF50')
//         $('#repassword_signup').css('margin-bottom', '20px')
//         countRepassword = 0
//     }
//     let length = ($('#password_signup').val()).length
//     if(length < 4){
//         $('.password_barometer').html('Too short')
//     }else if(length < 8){$('.password_barometer').html('Medium')}
//     else if(length < 12){$('.password_barometer').html('strong')}
// })



// // Signup
// // Get Email List


// $('#signup_button_submit').click(function(){
//     let userData = {
//         username: $('#username_signup').val(),
//         email: $('#email_signup').val(),
//         password: $('#password_signup').val()
//     }
//     let check = true
    
//     Object.keys(userData).forEach((key,index)=>{
//         if(userData[key] === '') {check = false}
//         if(key === 'email'){
//             if(countEmail > 0){
//                 check = false 
//                 document.getElementById('email_signup').value = ''
//             }
//         }
//     })
    
//     if(check){
//         axios.post('http://server-commerce.kevinhimawan.xyz/user/create',userData)
//             .then((response)=>{
//                 localStorage.setItem('token',response.data.token)
//                 window.location.href = 'index.html'
//             })
//             .catch((err)=>{
                
//             })    
//     }else{
//         swal({
//             title: "Warning",
//             text: "All datas are required",
//             icon: "warning",
//             button: "Revise",
//         }) 
//     }
// })

// // signin
// let countShowSigninPassword = 0
// $('#password_showup_login').click(function(){
//     if(countShowSigninPassword === 0){
//         document.getElementById("password_singin").setAttribute("type", "text"); 
//         countShowSigninPassword++
//     }else{
//         document.getElementById("password_singin").setAttribute("type", "password"); 
//         countShowSigninPassword = 0
//     }
// })

// $('#signin_button').click(function(){
//     let userLogin = {
//         username_email: $('#username_email_signin').val(),
//         password: $('#password_singin').val()
//     }
//     axios.post('http://server-commerce.kevinhimawan.xyz/user',userLogin)
//     .then((response)=>{
//         localStorage.setItem('token',response.data.token)
//         window.location.href = 'index.html'
//     })
//     .catch((err)=>{
//         $('.login_user_notfound').css('display','block')
//         $('#username_email_signin').css('margin-bottom','5px')
//         document.getElementById('username_email_signin').value = ''
//         document.getElementById('password_singin').value = ''
//     })
// })
