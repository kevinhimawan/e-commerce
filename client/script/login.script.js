$('#signup_button').click(function(){
    $('#login_form').css('display','none')
    $('#signup_form').css('display','block')
})

$('#haveacount_button').click(function(){
    $('#login_form').css('display','block')
    $('#signup_form').css('display','none')  
})

// Axios...
// Check Email Valid
let countEmail = 0
$('#email_signup').keyup(function(){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let emailVal = $('#email_signup').val()
    
    if(!(emailVal.match(regex)) && countEmail === 0){
        $('#email_signup').css('border-bottom', '1px solid red')
        $('#email_signup').css('box-shadow', '0 1px 0 0 red')
        $('#email_signup').css('margin-bottom', '5px')
        $('#email_div').append('<span id="email_signup_error" class="form_signup_error">Wrong Email Format</span>')
        countEmail++
    }else if(emailVal.match(regex)){
        axios.get('http://localhost:3000/user/get')
        .then(userData =>{
            console.log(userData)
            const userList = userData.data
            const checkUserEmail = userList.filter(user=>{
                if(emailVal === user.email){
                    return user.email
                }
            })

            if(checkUserEmail.length > 0){
            $('#email_signup').css('border-bottom', '1px solid red')
            $('#email_signup').css('box-shadow', '0 1px 0 0 red')
            $('#email_signup').css('margin-bottom', '5px')
            if($('#email_signup_error').length > 0){
                $('#email_signup_error').remove()
                $('#email_div').append(`<span id="email_signup_error" class="form_signup_error">Email ${emailVal} has already taken</span>`)    
            }
    
            }else{
                $('#email_signup_error').remove()
                $('#email_signup').css('border-bottom', '1px solid #4CAF50')
                $('#email_signup').css('box-shadow', '0 1px 0 0 #4CAF50')
                $('#email_signup').css('margin-bottom', '20px')
                countEmail = 0
            }
        })
        .catch(err=>{
    
        })
    }
})

// Check Confirmation Password
let countRepassword = 0
$('#repassword_signup').keyup(function(){
    if($('#password_signup').val() !== $('#repassword_signup').val()){
        $('#repassword_signup').css('border-bottom', '1px solid red')
        $('#repassword_signup').css('box-shadow', '0 1px 0 0 red')
        $('#repassword_signup').css('margin-bottom', '5px')
        if(countRepassword === 0){
            $('#respassword_div').append('<span id="email_signup_confirmation" class="form_signup_error">Wrong Confirmation</span>')
        }
        countRepassword++
    }else{
        $('#email_signup_confirmation').remove()
        $('#repassword_signup').css('border-bottom', '1px solid #4CAF50')
        $('#repassword_signup').css('box-shadow', '0 1px 0 0 #4CAF50')
        $('#repassword_signup').css('margin-bottom', '20px')
        countRepassword = 0
    }
})

$('#password_signup').keyup(function(){
    if($('#password_signup').val() === $('#repassword_signup').val()){
        $('.respassword_error').remove()
        $('#repassword_signup').css('border-bottom', '1px solid #4CAF50')
        $('#repassword_signup').css('box-shadow', '0 1px 0 0 #4CAF50')
        $('#repassword_signup').css('margin-bottom', '20px')
        countRepassword = 0
    }
    let length = ($('#password_signup').val()).length
    if(length < 4){
        $('.password_barometer').html('Too short')
    }else if(length < 8){$('.password_barometer').html('Medium')}
    else if(length < 12){$('.password_barometer').html('strong')}
})

let countShowPassword = 0
$('#password_showup').click(function(){
    if(countShowPassword === 0){
        document.getElementById("password_signup").setAttribute("type", "text"); 
        countShowPassword++
    }else{
        document.getElementById("password_signup").setAttribute("type", "password"); 
        countShowPassword = 0
    }
})

let countShowRePassword = 0
$('#repassword_showup').click(function(){
    if(countShowRePassword === 0){
        document.getElementById("repassword_signup").setAttribute("type", "text"); 
        countShowRePassword++
    }else{
        document.getElementById("repassword_signup").setAttribute("type", "password"); 
        countShowRePassword = 0
    }
})

// Signup
// Get Email List


$('#signup_button_submit').click(function(){
    let userData = {
        username: $('#username_signup').val(),
        email: $('#email_signup').val(),
        password: $('#password_signup').val()
    }
    let check = true
    
    Object.keys(userData).forEach((key,index)=>{
        if(userData[key] === '') {check = false}
        if(key === 'email'){
            if(countEmail > 0){
                check = false 
                document.getElementById('email_signup').value = ''
            }
        }
    })
    
    if(check){
        axios.post('http://localhost:3000/user/create',userData)
            .then((response)=>{
                localStorage.setItem('token',response.data.token)
                window.location.href = 'index.html'
            })
            .catch((err)=>{
                
            })    
    }else{
        swal({
            title: "Warning",
            text: "All datas are required",
            icon: "warning",
            button: "Revise",
        }) 
    }
})

// signin
let countShowSigninPassword = 0
$('#password_showup_login').click(function(){
    if(countShowSigninPassword === 0){
        document.getElementById("password_singin").setAttribute("type", "text"); 
        countShowSigninPassword++
    }else{
        document.getElementById("password_singin").setAttribute("type", "password"); 
        countShowSigninPassword = 0
    }
})

$('#signin_button').click(function(){
    let userLogin = {
        username_email: $('#username_email_signin').val(),
        password: $('#password_singin').val()
    }
    axios.post('http://localhost:3000/user',userLogin)
    .then((response)=>{
        localStorage.setItem('token',response.data.token)
        window.location.href = 'index.html'
    })
    .catch((err)=>{
        $('.login_user_notfound').css('display','block')
        $('#username_email_signin').css('margin-bottom','5px')
        document.getElementById('username_email_signin').value = ''
        document.getElementById('password_singin').value = ''
    })
})
