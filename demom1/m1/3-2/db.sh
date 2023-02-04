#!/bin/bash

echo "* Add hosts ..."
echo "192.168.89.100 web.do1.lab web" >> /etc/hosts
echo "192.168.89.101 db.do1.lab db" >> /etc/hosts

echo "* Install Software ..."
dnf upgrade -y
dnf install -y mariadb mariadb-server

echo "* Start HTTP ..."
systemctl enable mariadb
systemctl start mariadb

echo "* Firewall - open port 3306 ..."
firewall-cmd --add-port=3306/tcp --permanent
firewall-cmd --reload

echo "* Create and load the database ..."
mysql -u root < /vagrant/db_setup.sql
