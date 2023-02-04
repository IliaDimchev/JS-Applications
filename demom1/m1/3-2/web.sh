#!/bin/bash

echo "* Add hosts ..."
echo "192.168.89.100 web.do1.lab web" >> /etc/hosts
echo "192.168.89.101 db.do1.lab db" >> /etc/hosts

echo "* Install Software ..."
dnf upgrade -y
dnf install -y httpd php php-mysqlnd git

echo "* Start HTTP ..."
systemctl enable httpd
systemctl start httpd

echo "* Firewall - open port 80 ..."
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --reload

echo "* Copy web site files to /var/www/html/ ..."
cp /vagrant/* /var/www/html

echo "* Allow HTTPD to make netork connections ..."
setsebool -P httpd_can_network_connect=1
