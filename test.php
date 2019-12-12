<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    /*Creating variables*/
    $ID = $_POST["Champion_ID"];
    $Name = $_POST["Champion_Name"];
    $dbhost = "localhost"; /*most of the time it's localhost*/
    $username = "funpaxcg";
    $password = "Roony10cory!";
    $dbname = "funpaxcg_User";

    $mysql = mysqli_connect($dbhost, $username, $password, $dbname); //It connects
    $query = "Select Champion_ID, Champion_Name From `funpaxcg_League`.`Champion_Info`";
    mysqli_query($mysql, $query);
}
?>