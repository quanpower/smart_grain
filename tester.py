# -*- coding:utf-8 -*-

from utils import calc


address = chr(0x01)
function_code = chr(0x01)
start_at_reg = chr(0x00) + chr(0x13)
num_of_reg = chr(0x00) + chr(0x13)


read_device = address + function_code + start_at_reg + num_of_reg
print(type(read_device))
print(read_device)
crc = calc(read_device)
crc_hi = crc/256
crc_lo = crc & 0xFF
print("meter add: " + str(ord(address)))
print("crc_lo: " + str(hex(crc_lo)))
print("crc_hi: " + str(hex(crc_hi)))


read_switch_str = '010100130013'


bytearray_switch = bytearray.fromhex(read_switch_str)
hexstr_switch = str(bytearray_switch)

print(hex(calc(hexstr_switch)))


2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:128] - INFO: 64
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:131] - INFO: --------packet_data.bin--------
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:132] - INFO: 0010000000010011010000001010111111101011110011101101001001010011
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:134] - INFO: 64
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:162] - INFO: --------real data process beginning-----------
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:183] - INFO: gateway_addr: 1
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:184] - INFO: -------------------
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:185] - INFO: node_addr: 19
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:189] - INFO: -------------------
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:209] - INFO: temp1: 703
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:211] - INFO: temp2: 700
2018-03-20 12:58:28,976 - mqtt_p2p_subscriber.py[line:213] - INFO: temp3: 948



