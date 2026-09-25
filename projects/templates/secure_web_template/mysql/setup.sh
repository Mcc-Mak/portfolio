sudo mysql -uroot -pchange_me -e "SET GLOBAL time_zone = '+8:00';"

echo ">>> calling [init.schema.sql]..."
sudo mysql -uchange_me -pchange_me booking_appointment_system < ./resources/init/init.schema.sql

echo ""
echo ">>> calling [init.data.sql]..."
sudo mysql -uchange_me -pchange_me booking_appointment_system < ./resources/init/init.data.sql

echo ""
echo ">>> calling [init.fct.sql]..."
sudo mysql -uroot -pchange_me booking_appointment_system < ./resources/init/init.fct.sql

echo ""
echo ">>> calling [init.sp.sql]..."
sudo mysql -uchange_me -pchange_me booking_appointment_system < ./resources/init/init.sp.sql

echo ""
echo ">>> calling [init.calling.sql]..."
sudo mysql -uchange_me -pchange_me booking_appointment_system < ./resources/init/init.calling.sql

cd ./resources/prd
sudo bash setup_prd.sh
