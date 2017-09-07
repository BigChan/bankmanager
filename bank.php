<?php
$user=$_GET['user'];
$pass=$_GET['pass'];
$mysqli = new mysqli('127.0.0.1', 'root', '123456','bankmanager');
mysqli_set_charset($mysqli,"utf8");
$sql = "SELECT password,sign FROM account where cardnum=".$user;
$result = mysqli_query($mysqli, $sql);
$row = mysqli_fetch_assoc($result);


if(!$row)
{
   echo '卡号不存在';
}
else 
{
if($pass==$row['password']){
    if($row['sign']==1){
    $delete = "delete from kahao";
    $res = mysqli_query($mysqli,$delete);
   $create = " insert into kahao values('$user')";
   $res = mysqli_query($mysqli, $create);
   echo 1;
    }
    else{
    echo '该卡号已注销';
}
}
else{
        echo '密码不符';
}
}
?>