mosquitto_sub -h 101.200.158.2 -t "001.downstream" -u "iiot" -P "smartlinkcloud"
mosquitto_pub -h 101.200.158.2 -t "001.downstream" -m "hello world" -u "iiot" -P "smartlinkcloud"

update users set owned_barns = '1,2' where id=1;


export FLASK_APP=run.py
flask run --host=0.0.0.0