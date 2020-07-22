CREATE DATABASE IF NOT EXISTS ticket;
USE ticket;
create table team
(
    team_name   varchar(50) not null,
    team_leader varchar(50) null,
    constraint team_name
        unique (team_name)
);

alter table team
    add primary key (team_name);

create table task
(
    task_id       int auto_increment
        primary key,
    task_name     varchar(50)                                       not null,
    start_date    datetime                                          not null,
    end_date      datetime                                          not null,
    creation_date timestamp               default CURRENT_TIMESTAMP null,
    team_name     varchar(50)                                       not null,
    status        enum ('open', 'closed') default 'open'            not null,
    description   varchar(250)                                      null,
    constraint task_team_team_name_fk
        foreign key (team_name) references team (team_name)
            on update cascade on delete cascade
);

create table user_location
(
    username  varchar(50)                               null,
    longitude decimal(20, 15) default 0.000000000000000 null,
    latitude  decimal(20, 15) default 0.000000000000000 null
);

create table users
(
    username           varchar(50)  not null,
    first_name         varchar(45)  not null,
    last_name          varchar(45)  not null,
    encrypted_password varchar(255) not null,
    constraint username_UNIQUE
        unique (username)
);

alter table users
    add primary key (username);

create table task_reports
(
    task_id int                                 null,
    report  varchar(250)                        not null,
    author  varchar(50)                         not null,
    date    timestamp default CURRENT_TIMESTAMP null,
    constraint task_reports_task_task_id_fk
        foreign key (task_id) references task (task_id),
    constraint task_reports_users_username_fk
        foreign key (author) references users (username)
);

create table user_task
(
    username varchar(50) not null,
    task_id  int         not null,
    constraint user_task_task_task_id_fk
        foreign key (task_id) references task (task_id)
            on update cascade on delete cascade,
    constraint user_task_users_username_fk
        foreign key (username) references users (username)
            on update cascade
);

create table user_team
(
    username    varchar(50)                  not null,
    teamname    varchar(50)                  not null,
    user_status enum ('pending', 'accepted') null,
    primary key (username, teamname),
    constraint user_team_ibfk_1
        foreign key (teamname) references team (team_name)
            on update cascade on delete cascade,
    constraint user_team_users_username_fk
        foreign key (username) references users (username)
            on update cascade on delete cascade
);


