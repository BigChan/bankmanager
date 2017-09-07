$(document).ready(function(){ 
    // 获取账号信息
  $.get("guest.php?ack=1",function (data) {
          $('.user').text(data.name);
          $('.user').attr('title', '卡号：'+data.card);
      },'json'
  );
 
 //切换相应功能的界面
$('.nav li').click(
    function(){
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var index=$(this).index();
        $('#menu').children().eq(index).css('display','block');
        $('#menu').children().eq(index).siblings().css('display','none');
        $('.tip').text('');
        $('.del form').css('display','block');
        $('.tishi3').css('display','none');
        $("input[class^='input']").val('');
    }
)

//存款
$('.btn1').click(function(){
    event.preventDefault();
    var money = $('.input1').val();
    var test_money = /(^\d+$)|((^\d+)(\.)(\d{1,2}$))/.test(money);
    if(!test_money){
        $('.tip1').text('请输入存款金额').addClass('text-danger');
         $('.cunkuan span').eq(1).text('');
      $('.cunkuan span').eq(2).text('');
    }
    else{
        $.get('guest.php?ack=3&money='+money,function(){
             $('.tip1').text('成功存入').addClass('text-success').removeClass('text-danger');
             $('.cunkuan span').eq(1).text(money);
             $('.cunkuan span').eq(2).text(' 元').addClass('text-success');
        })
    }
})

//取款
$('.btn2').click(function(){
    event.preventDefault();
    var money = $('.input2').val();
    var test_money = /(^\d+$)|((^\d+)(\.)(\d{1,2}$))/.test(money);
    if(!test_money){
        $('.tip2').text('请输入取款金额').addClass('text-danger');
         $('.qukuan span').eq(1).text('');
      $('.qukuan span').eq(2).text('');
    }
    else{
        $.get('guest.php?ack=4&money='+money,function(data){
             if(data){
             $('.tip2').text('成功取出').addClass('text-success').removeClass('text-danger');
             $('.qukuan span').eq(1).text(money);
             $('.qukuan span').eq(2).text(' 元').addClass('text-success');
            }
            else{
               $('.tip2').text('账号余额不足').addClass('text-danger');
                $('.qukuan span').eq(1).text('');
                $('.qukuan span').eq(2).text('');
            }
        })
    }
})

function search(node,className1,className2,className3)
{         
          $(node).children().eq(0).addClass(className1);
          $(node).children().eq(1).addClass(className2);
          $(node).children().eq(0).children('p').addClass(className3);
          $('.'+className2).css('display','none');
           $('.'+className1).css('display','none').toggle();
       var i=0;
       var time1 = setInterval(function(){
            i++;
            var text=$('.'+className3).text();
            $('.'+className3).text(text+'.');
            if(i==4) 
            {
                $('.'+className1).fadeOut();
                clearInterval(time1);
              $('.'+className3).text('请稍后，系统正在为您查询');
            }
    },300);
}


//查询余额
$('.nav li').eq(2).click(function(){    
          search('.search-left','tishi1','tishi2','tip3');
          $.get('guest.php?ack=2',function(data){
                  $('.tishi2 span').text(data);      
                 var time2 =  setTimeout(function(){
                    $('.tishi2').css('display','block');
                  },1800);

          }) 
})

//查询清单
$('.nav li').eq(3).click(function(){    
            search('.search-list','tishi4','tishi5','tip5');  
                 var time2 =  setTimeout(function(){
                    $('.tishi5').css('display','block');
                  },1800);
                  $.get('guest.php?ack=5',function(data)
                  {    
                       $('.list').html(data);  
                       $('caption').addClass('text-center');   
                  }     
                  
                  )
})


//账号注销
$('.btn3').click(function(){
      event.preventDefault();
    var val = $('.input3').val();
    $.get('guest.php?ack=6&del=0&pass='+val,function(data){
        if(data==0)
        {
            $('.tip4').text('密码错误').addClass('text-danger');
            $('.tishi3').css('display','none');
        }
        else{
          $('.tip4').text('');
          $('.input3').val('');
          $('.del form').css('display','none');
         $('.tishi3').css('display','block');
         $('.tishi3 p').eq(0).text('卡号：'+data.cardnum);
         $('.tishi3 p').eq(1).text('姓名：'+data.name);
         $('.tishi3 p').eq(2).text('余额：'+data.money);
        }
    },'json')
})

//取消注销
$('.btn4').click(
    function()   
    {
        $('.del form').css('display','block');
        $('.tishi3').css('display','none');
    }
)

$('.btn5').click(
    function()   
    {
       var conf = confirm('确定取出所有余额并注销账号吗？');
       if(conf)
       {
           $.get('guest.php?ack=6&del=1',function(data){
                      if(data) 
                        {
                             alert('操作成功');
                              window.location.assign('http://'+location.hostname+'/bankmanager/index.html');
                        }   
        })
       }
    }
)


// 退出登录
$('.remove').click(function(){
    $.get("guest.php?ack=7",function () {
         window.location.assign('http://'+location.hostname+'/bankmanager/index.html');
      }
  )
})

})

$(".back").attr("href",'http://'+location.hostname+'/bankmanager/index.html')