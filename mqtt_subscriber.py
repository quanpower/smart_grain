import os
import datetime
import struct
from bitstring import BitArray, BitStream
import logging
from utils import crc_func, sign

from app.models import GrainTemp

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class MQTT_Sub(object):

    def __init__(self, database_url, logfile_path):
        database_url = database_url
        logfile_path = logfile_path

        # 初始化数据库连接:
        engine = create_engine(database_url)
        # 创建DBSession类型:
        Session = sessionmaker(bind=engine)
        self.db_session = Session()

        # 第一步，创建一个logger
        self.logger = logging.getLogger()
        self.logger.setLevel(logging.INFO)  # Log等级总开关

        # 第二步，创建一个handler，用于写入日志文件
        parent_dir = os.path.dirname(__file__)
        # logfile = os.path.join(parent_dir, 'log/mqtt_p2p_sub_logger.txt')
        logfile = os.path.join(parent_dir, logfile_path)

        fh = logging.FileHandler(logfile, mode='w')
        fh.setLevel(logging.DEBUG)  # 输出到file的log等级的开关

        # 第三步，再创建一个handler，用于输出到控制台
        ch = logging.StreamHandler()
        ch.setLevel(logging.WARNING)  # 输出到console的log等级的开关

        # 第四步，定义handler的输出格式
        formatter = logging.Formatter("%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s")
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)

        # 第五步，将logger添加到handler里面
        self.logger.addHandler(fh)
        self.logger.addHandler(ch)

        # 日志

        self.logger.info('---this is a logger info message---')

    # ======================================================
    # def on_connect(mqttc, obj, rc):
    def on_connect(self, client, userdata, flags, rc):
        self.logger.info("OnConnetc, rc: " + str(rc))


    def on_publish(self, mqttc, obj, mid):
        self.logger.info("OnPublish, mid: " + str(mid))


    def on_subscribe(self, mqttc, obj, mid, granted_qos):
        self.logger.info("Subscribed: " + str(mid) + " " + str(granted_qos))


    def on_log(self, mqttc, obj, level, string):
        self.logger.info("Log:" + string)


    def on_message(self, mqttc, obj, msg):
        curtime = datetime.datetime.now()
        strcurtime = curtime.strftime("%Y-%m-%d %H:%M:%S")
        self.logger.info(strcurtime + ": " + msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

        payload_length = len(msg.payload)
        un_int = struct.unpack(str(payload_length) + 'B', msg.payload)

        self.logger.info('-------units-----')
        self.logger.info(payload_length)
        print('-------payload_length------')
        print(payload_length)
        self.logger.info(un_int)
        print(un_int)
        uints = list(un_int)
        print(uints)

        if uints[payload_length - 1] == crc_func(uints[:payload_length - 1]):
            self.logger.info('CRC checked!')

            if payload_length == 5:
                self.lora_unpacking_ack(uints)
            elif payload_length == 8:
                print('----msg.payload------')
                print(msg.payload)
                print(type(msg.payload))

                # packet_data = BitStream('0x4001004751E47533')
                # '{:0>2x}'.format(1) #dic to hex,append 0
                packet_data = BitStream(msg.payload)
                self.logger.info('--------packet_data--------')
                self.logger.info(packet_data)
                self.logger.info(len(packet_data))
                print('-----packet-data------')
                print(packet_data)
                self.logger.info('--------packet_data.bin--------')
                self.logger.info(packet_data.bin)
                print(packet_data.bin)
                self.logger.info(len(packet_data.bin))

                realtime_data = self.lora_unpacking_realtime_data(packet_data)

                self.save_realtime_data(realtime_data)
            else:
                self.logger.debug('bytes unknown!')

        else:
            self.logger.error('CRC check fail!')


    def on_exec(self,strcmd):
        self.logger.debug("Exec:", strcmd)
        strExec = strcmd



    def lora_unpacking_realtime_data(self, packet_data):
        self.logger.info('--------real data process beginning-----------')

        gateway_addr = str(packet_data.read(3).uint)
        node_addr = str(packet_data.read(13).int)
        tran_direct = packet_data.read(1).bool
        func_code = packet_data.read(3)
        switch = packet_data.read(1).bool

        temp1_sign = packet_data.read(1).bool
        temp2_sign = packet_data.read(1).bool
        temp3_sign = packet_data.read(1).bool

        temp1 = packet_data.read(10).uint
        temp2 = packet_data.read(10).uint
        temp3 = packet_data.read(10).uint
        battery_vol = packet_data.read(2).uint

        temprature1 = (sign(temp1_sign) * temp1) / 10.0
        temprature2 = (sign(temp2_sign) * temp2) / 10.0
        temprature3 = (sign(temp3_sign) * temp3) / 10.0

        self.logger.info('gateway_addr: %s', gateway_addr)
        self.logger.info('-------------------')
        self.logger.info('node_addr: %s', node_addr)
        print('--------node_addr----------')
        print(node_addr)
        print('----------------------------')

        self.logger.info('-------------------')

        self.logger.info('temp1: %s', temp1)

        self.logger.info('temp2: %s', temp2)

        self.logger.info('temp3: %s', temp3)
        self.logger.info('-------------------')

        self.logger.info('battery_vol: %s', battery_vol)

        self.logger.info('values : %s, %s, %s, %s', temprature1, temprature2, temprature3, battery_vol)

        return (gateway_addr, node_addr, switch, temprature1, temprature2, temprature3, battery_vol)


    def save_realtime_data(self, data):
        c = GrainTemp()
        c.grain_storehouse_id = 1
        c.lora_gateway_id = data[0]
        c.grain_barn_id = 1
        c.lora_node_id = data[1]
        c.switch = data[2]
        c.temp1 = data[3]
        c.temp2 = data[4]
        c.temp3 = data[5]
        c.battery_vol = data[6]
        c.datetime = datetime.datetime.now()

        self.db_session.add(c)
        try:
            self.db_session.commit()
            self.logger.debug('inserted!')
        except Exception as e:
            self.logger.error("Inserting Grian_temp: %s", e)
            self.db_session.rollback()
        # DBSession.close()


    def lora_unpacking_ack(self, packet_data):
        # todo
        self.logger.info('-------- ack data process beginning -----------')


# =====================================================
    def mqtt_p2p_sub(self):
        # MQTT Initialize.--------------------------------------
        try:
            import paho.mqtt.client as mqtt
        except ImportError:
            print("MQTT client not find. Please install as follow:")
            print("git clone http://git.eclipse.org/gitroot/paho/org.eclipse.paho.mqtt.python.git")
            print("cd org.eclipse.paho.mqtt.python")
            print("sudo python setup.py install")

        mqttc = mqtt.Client("mynodeserver_001")
        mqttc.username_pw_set("iiot", "smartlinkcloud")
        mqttc.on_message = self.on_message
        mqttc.on_connect = self.on_connect
        mqttc.on_publish = self.on_publish
        mqttc.on_subscribe = self.on_subscribe
        mqttc.on_log = self.on_log

        # strBroker = "localhost"
        strBroker = "101.200.158.2"

        mqttc.connect(strBroker, 1883, 60)
        mqttc.subscribe("001.upstream", 0)
        mqttc.loop_forever()


if __name__ == '__main__':

    mqtt_p2p_sub = MQTT_Sub('sqlite:///data.sqlite', 'log/mqtt_p2p_sub_logger.txt')
    mqtt_p2p_sub.mqtt_p2p_sub()