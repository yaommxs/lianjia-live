create table `lianjialist` (
  `id` int(8) not null auto_increment,
  `price` int(8) not null,
  `unitprice` int(8) not null,
  `title` varchar(50) not null,
  `alink` varchar(200) not null,
  `square` float(10) not null,
  `roomcount` varchar(10) not null,
  `direction` varchar(5) not null,
  `follow` int(8) not null,
  `see` int(8) not null,
  `time` varchar(10) not null,
  primary key(`id`)
) charset=utf8;
