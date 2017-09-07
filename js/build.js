//点击提交按钮，无错误后把新用户信息插入用户表
$('#btn3').click(function(){
       var card=$('#card').val(),
           name=$('#name').val(),
           pass=$('#pass').val(),
           money=$('#money').val(),
           repass=$('#repass').val();
      if(card==''||name==''||pass==''||repass==''||money=='')
       {
                     $('#tip2').text('请完善信息后再提交');
       }

       else{
               var test_card =  /^(\d{1,10})$/.test(card);
               var test_money = /^(\d+)$/.test(money);
               var test_name = /(^[\u4e00-\u9fa5]{2,5}$)|(^[a-zA-Z]+[\s.]?([a-zA-Z]+[\s.]?){0,4}[a-zA-Z]$)/.test(name);
               if(test_card&&test_money&&test_name)
          {
              $('#tip2').text('  ');
            if(pass===repass)
            {
                $.get('add.php?card='+card+'&name='+name+'&pass='+pass+'&money='+money,
                function(data){
                        if(data){       
                        $('#form').css('display','none');
                        $('#tologin').css('display','block');
                    }
                    else{
                        $('#tip2').text('开户失败，卡号已存在！');
                    }
                }
                );
            }
            else{
                $('#tip1').text('两次密码输入不一致');
            }
            }
        else
        {
               $('#tip2').text('请按照正确格式输入');
        }
}
})

$("a").attr('href','http://'+location.hostname+'/bankmanager/index.html')