$(document).ready(function(){
    var height = window.innerHeight;
    var width = window.outerWidth;
$('.login').height(height);
// $('.login').width(width);

//点击开户按钮，跳转到build页面
$('.btn2').click(function(){
     event.preventDefault();
    window.location.replace('http://'+location.hostname+'/bankmanager/build.html');
})

//点击登录按钮，验证通过后跳转到guest页面
$('.btn1').click(function(){
    event.preventDefault();
    var cardnum=$('#user').val();
    var pwd=$('#pwd').val();
  if(cardnum==null||pwd=='')
{
   $('#tips').text('请输入卡号和密码');
}
else{
  //通过ajax异步get方法验证卡号和密码
  $.get('bank.php?user='+cardnum+'&pass='+pwd,function(data){
      if(data==1)
      {
      window.location.assign('http://'+location.hostname+'/bankmanager/guest.html')
      event.preventDefault();
     }
       else{
        $('#tips').text(data);
       }
   })
    
}})
})

