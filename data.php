<?php
$conn = mysqli_connect("localhost", "root", "", "temp");
$result = mysqli_query($conn, "SELECT * FROM Champion_Info");
$data = array();
while ($row = mysqli_fetch_object($result))
{
    array_push($data, $row);
}
?php>