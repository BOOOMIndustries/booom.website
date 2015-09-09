<?php 

$data = $_POST['boardData'];
$userData = $data[0]["userdata"];
$boardData = $data[0]["boarddata"];
echo "data set is a ". $userData[0]["username"];
$databasenames = ["design","images","fonts","user_has_many_designs","design_has_many_images","design_has_many_fonts"];


function mySQLOpen(){
	$user = "booomAdmin";
	$pw = bb70bf2d6f4b4a7880e27;
	$host = "db-master2";
	$dbname = "test";
	$connection = new mysqli($host, $user, $pw, $dbname);
	if ($connection->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	}
}

function 

/*

create table user_has_many_designs(
	id int not null auto_increment primary key,
	userid int not null,
	designid int not null,
	datecreated timestamp,
	lastused timestamp
);

create table design(
	designid int not null auto_increment primary key,
	userid int not null,
	scale float not null,
	bgcolor varchar(7) not null,
	datecreated timestamp,
	lastused timestamp
);

create table design_has_many_images(
   id int not null auto_increment primary key, 
	designid int not null,
	imageid int not null,
	side int not null,
	datecreated timestamp,
	lastused timestamp
);

create table design_has_many_fonts(
	id int not null auto_increment primary key,
	designid int not null,
	fontsid int not null,
	side int not null,
	datecreated timestamp,
	lastused timestamp 
);

create table images(
  imageid int not null auto_increment primary key, 
	imgurl varchar(225) not null,
	xp1 float not null,
	xp2 float not null,
	xp3 float not null,
	xp4 float not null,
	axp1 float not null,
	axp2 float not null,
	axp3 float not null,
	axp4 float not null,
	yp1 float not null,
	yp2 float not null,
	yp3 float not null,
	yp4 float not null,
	ayp1 float not null,
	ayp2 float not null,
	ayp3 float not null,
	ayp4 float not null,
	angle float not null,
	width float not null,
	height float not null,
	datecreated timestamp,
	lastused timestamp
);

create table fonts(
	imageid int not null auto_increment primary key, 
	imgurl varchar(225) not null,
	fxp1 float not null,
	fxp2 float not null,
	fxp3 float not null,
	fxp4 float not null,
	faxp1 float not null,
	faxp2 float not null,	
	faxp3 float not null,
	faxp4 float not null,
	fyp1 float not null,
	fyp2 float not null,
	fyp3 float not null,
	fyp4 float not null,
	fayp1 float not null,
	fayp2 float not null,
	fayp3 float not null,
	fayp4 float not null,
	angle float not null,
	width float not null,
	height float not null,
	datecreated timestamp,
	lastused timestamp
);*/
?>