jQuery(document).ready(function ($) {
    
    // Perform AJAX login/register on form submit
    $('form#login, form#register').on('submit', function (e) {
        $('.alert-login', this).hide();
        $('.overlay-register-login').show();
        action = 'ajaxlogin';
        username =  $('form#login #username').val();
        password = $('form#login #password').val();
        email = '';
        security = $('form#login #security').val();
        if ($(this).attr('id') == 'register') {
            unixRandom = Math.floor((Math.random() * 100) + 1);
            email = $('#email').val();
            action = 'ajaxregister';
            username = email.substring(0, email.lastIndexOf("@"))+unixRandom;
            password = $('#signonpassword').val();
            security = $('#signonsecurity').val();  
        }
         
        ctrl = $(this);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_auth_object.ajaxurl,
            data: {
                'action': action,
                'username': username,
                'password': password,
                'email': email,
                'security': security
            },
            success: function (data) {
                //alert(data.message);
                $('.overlay-register-login').hide();
                if (data.loggedin == true) {
                    document.location.href = ajax_auth_object.redirecturl;
                }else{
                    $('.alert-login', ctrl).show();
                    $('p.status', ctrl).show().text(data.message);    
                }
            }
        });
        e.preventDefault();
    });

    $('form#ticket, form#ticket-register').on('submit', function (e) {
        $('.alert-login', this).hide();
        $('.overlay-register-login').show();
        action = 'ajaxlogin';
        username =  $('form#ticket #username1').val();
        password = $('form#ticket #password1').val();
        email = '';
        security = $('form#ticket #security1').val();
        if ($(this).attr('id') == 'ticket-register') {
            unixRandom = Math.floor((Math.random() * 100) + 1);
            email = $('#email1').val();
            action = 'ajaxregister';
            username = email.substring(0, email.lastIndexOf("@"))+unixRandom;
            password = $('#signonpassword1').val();
            security = $('#signonsecurity1').val(); 
        }
         
        ctrl = $(this);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_auth_object.ajaxurl,
            data: {
                'action': action,
                'username': username,
                'password': password,
                'email': email,
                'security': security
            },
            success: function (data) {
                //alert(data.message);
                $('.overlay-register-login').hide();
                if (data.loggedin == true) {
                    document.location.href = ajax_auth_object.redirecttoticketpageurl;
                }else{
                    $('.alert-login', ctrl).show();
                    $('p.status', ctrl).show().text(data.message);    
                }
            }
        });
        e.preventDefault();
    });
    
    // Client side form validation
   if (jQuery("#register").length) 
        jQuery("#register").validate(
        { 
            rules:{
            password2:{ equalTo:'#signonpassword' 
            }   
        }}
        );
    else if (jQuery("#login").length) 
        jQuery("#login").validate();

    // Client side form validation
   if (jQuery("#ticket-register").length) 
        jQuery("#ticket-register").validate(
        { 
            rules:{
            password2:{ equalTo:'#signonpassword1' 
            }   
        }}
        );
    else if (jQuery("#ticket").length) 
        jQuery("#ticket").validate();
});