<?php

require './MySqlDB.php';

$mySql = new MySqlDB();
$id = $_GET['ID'];
$mySql->torol("telefonkonyvem","ID=".$id);
