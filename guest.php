<?php
$ack = $_GET['ack'];
$mysqli = new mysqli('127.0.0.1', 'root', '123456','bankmanager');
mysqli_set_charset($mysqli,"utf8");
$sql1 = "SELECT card  FROM  kahao ";
$result1 = mysqli_query($mysqli, $sql1);
$row = mysqli_fetch_assoc($result1);
$card = $row['card'];

switch($ack){
    
// 获取用户信息
case 1:
$sql2 = "SELECT name,cardnum FROM account WHERE cardnum=".$card;
$result2 = mysqli_query($mysqli, $sql2);
$name = mysqli_fetch_assoc($result2);
// 创建关联数组
$data = array('name'=>$name['name'],'card'=>$name['cardnum']);
// 以json格式发送数据
echo json_encode($data);
break;

// 查询余额
case 2:
$left = 'SELECT money from account WHERE cardnum='.$card;
$result3 = mysqli_query($mysqli,$left);
$cash = mysqli_fetch_assoc($result3);
echo $cash['money'];
break;

// 存款
case 3:
$money = $_GET['money'];
$save = 'UPDATE account set money =money+'.$money.' WHERE cardnum='.$card;
mysqli_query($mysqli,$save);
$left1 = 'SELECT money from account WHERE cardnum='.$card;
$result7= mysqli_query($mysqli,$left1);
$cash = mysqli_fetch_assoc($result7);
$balance = $cash['money'];
$change = "INSERT INTO list values('$card',NOW(),'存入','$money','$balance')";
mysqli_query($mysqli,$change);
break;

// 取款
case 4:
$money = $_GET['money'];
$left = 'SELECT money from account WHERE cardnum='.$card;
$result5 = mysqli_query($mysqli,$left);
$cash = mysqli_fetch_assoc($result5);
if($cash['money']<$money)
{
    //余额不足
    echo false;
}
else{
$get = 'UPDATE account set money =money-'.$money.' WHERE cardnum='.$card;
mysqli_query($mysqli,$get);
$left1 = 'SELECT money from account WHERE cardnum='.$card;
$result7= mysqli_query($mysqli,$left1);
$cash = mysqli_fetch_assoc($result7);
$balance = $cash['money'];
$change = "INSERT INTO list values('$card',NOW(),'取出','$money','$balance')";
mysqli_query($mysqli,$change);
echo true;
}
break;

// 查询清单
case 5:
$sql = 'SELECT change_time,behavior,money_change,balance FROM list where cardnum='.$card.' order by change_time DESC';
$result = mysqli_query($mysqli,$sql);
  echo "<table class='table table-striped'>";
while($row = mysqli_fetch_assoc($result))
{
    echo "<tr>";
    echo "<td class='time text-center'>" . $row['change_time'] . "</td>";
    echo "<td class='behavior text-center'>" . $row['behavior'] . "</td>";
    echo "<td class='text-center'>" . $row['money_change'] . "</td>";
    echo "<td class='text-center'>" . $row['balance'] . "</td>";
    echo "</tr>";
}
echo "</table>";
break;

// 账号注销
case 6:
$pass = $_GET['pass'];
$del = $_GET['del'];
if($del)
{   
    //余额全取出，sign设置为0
    $sql = 'UPDATE account set money=0 ,sign=0 where cardnum='.$card;
     mysqli_query($mysqli, $sql);
    $delList = 'DELETE FROM list where cardnum='.$card;
    mysqli_query($mysqli, $delList);
    echo true;
}
else
{
    //注销验证密码
$sql = "SELECT password FROM account where cardnum=".$card;
$result = mysqli_query($mysqli, $sql);
$row = mysqli_fetch_assoc($result);
    if($pass==$row['password'])
    {
        $sql4 = "SELECT cardnum,name,money FROM account where cardnum=".$card;
        $result4 = mysqli_query($mysqli, $sql4);
        $row4 = mysqli_fetch_assoc($result4);
        $user = array('cardnum'=>$row4['cardnum'],'name'=>$row4['name'],'money'=>$row4['money']);
        echo json_encode($user);
    }
    else
    {
        echo 0;
    }
}
break;

// 退出登录
case 7:
$remove = 'DELETE FROM kahao';
mysqli_query($mysqli,$remove);
break;
}
?>