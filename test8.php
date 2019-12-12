<?php
mysql_connect("localhost", "funpaxcg_User", "Roony10cory") or die(mysql_error());
echo "Connected to MySQL<br />";
mysql_select_db("funpaxcg_League") or die(mysql_error());
echo "Connected to Database";
?>