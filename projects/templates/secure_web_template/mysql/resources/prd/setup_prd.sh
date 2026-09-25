# sudo mysql -uchange_me -pchange_me booking_appointment_system < ./prd.test_fct.sql

echo ">>> calling [./fct/count/prd.booking.sql]..."
sudo mysql -uroot -pchange_me booking_appointment_system < ./fct/count/prd.booking.sql

echo ""
echo ">>> calling [./fct/count/prd.booking_2.sql]..."
sudo mysql -uroot -pchange_me booking_appointment_system < ./fct/count/prd.booking_2.sql

echo ""
echo ">>> calling [./fct/update/prd.booking.sql]..."
sudo mysql -uroot -pchange_me booking_appointment_system < ./fct/update/prd.booking.sql

echo ""
echo ">>> calling [./fct/update/prd.booking_2.sql]..."
sudo mysql -uroot -pchange_me booking_appointment_system < ./fct/update/prd.booking_2.sql

echo ""
echo ">>> calling [./fct/insert/prd.users.sql]..."
sudo mysql -uroot -pchange_me booking_appointment_system < ./fct/insert/prd.users.sql

echo ""
echo ">>> adding booking, and then cancelling booking"
sudo mysql -uchange_me -pchange_me booking_appointment_system < ./.prd.test_fct.sql
