create table `lianjialist` (
  `id` int(8) not null auto_increment,
  `price` int(8) not null,
  `alink` varchar(500) not null,
  `likes` varchar(100),
  primary key(`id`)
) charset=utf8;
