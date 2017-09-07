<?php
$card=$_GET['card'];
$name=$_GET['name'];
$pass=$_GET['pass'];
$money=$_GET['money'];
$mysqli = new mysqli('127.0.0.1', 'root', '123456','bankmanager');
mysqli_set_charset($mysqli,"utf8");
$sql = "INSERT INTO account(cardnum,name,password,money) values('$card','$name','$pass','$money') ";
$result = mysqli_query($mysqli, $sql);
if($result)
{   
    $left1 = 'SELECT money from account WHERE cardnum='.$card;
    $result7= mysqli_query($mysqli,$left1);
    $cash = mysqli_fetch_assoc($result7);
    $balance = $cash['money'];
    $change = "INSERT INTO list values('$card',NOW(),'开户','$money','$balance')";
    mysqli_query($mysqli,$change);
    echo true;
}
else{
    echo false;
}
?>