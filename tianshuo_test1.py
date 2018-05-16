import socket
import time
import select
from utils import calc, str2hexstr

timeout_in_seconds = 5

rs485_socket = socket.socket()
rs485_socket.connect(("192.168.0.7", 26))
rs485_socket.setblocking(0)

address = chr(0x01)
function_code = chr(0x06)
start_at_reg = chr(0x00) + chr(0x00)
num_of_reg = chr(0x00) + chr(0x01)

read_device = address + function_code + start_at_reg + num_of_reg
print(type(read_device))
print(read_device)
crc = calc(read_device)
crc_hi = crc/256
crc_lo = crc & 0xFF
print "meter add: " + str(ord(address))
print "crc_lo: " + str(hex(crc_lo))
print "crc_hi: " + str(hex(crc_hi))


read_switch_str = '010600000001'


bytearray_switch = bytearray.fromhex(read_switch_str)
hexstr_switch = str(bytearray_switch)

print(hex(calc(hexstr_switch)))


while True:
	# s_open = '010f00100004010fbf51'
	# s_close = '010f001000040100ff55'

	# s_open = '0101001300138c02'
	
	air_1_close = '010600000001480a'
	air_1_open = '01060000000949cc'

	air_2_close = '0206000000014839'
	air_2_open = '02060000000949ff'

	air_1_close_hex = str2hexstr(air_1_close)
	air_1_open_hex = str2hexstr(air_1_open)

	air_2_close_hex = str2hexstr(air_2_close)
	air_2_open_hex = str2hexstr(air_2_open)


	air_1_close_hex = str2hexstr(air_1_close)
	air_1_open_hex = str2hexstr(air_1_open)

	air_2_close_hex = str2hexstr(air_2_close)
	air_2_open_hex = str2hexstr(air_2_open)


	rs485_socket.sendall(air_1_close_hex)
	ready = select.select([rs485_socket], [], [], timeout_in_seconds)

	if ready[0]:
		print('have 1 close data!')
		data = rs485_socket.recv(1024)
		ret_str = str(data)
		print(ret_str)

	time.sleep(150)






	rs485_socket.sendall(air_2_close_hex)
	ready = select.select([rs485_socket], [], [], timeout_in_seconds)

	if ready[0]:
		print('have 2 close data!')
		data = rs485_socket.recv(1024)
		ret_str = str(data)
		print(ret_str)


	time.sleep(150)






	rs485_socket.sendall(air_1_open_hex)
	ready1 = select.select([rs485_socket], [], [], timeout_in_seconds)
	if ready1[0]:
		data1 = rs485_socket.recv(1024)
		print('have 1 open data!')
		ret_str = str(data1)
		print(ret_str)

	time.sleep(150)



	rs485_socket.sendall(air_2_open_hex)
	ready1 = select.select([rs485_socket], [], [], timeout_in_seconds)

	if ready1[0]:
		data1 = rs485_socket.recv(1024)
		print('have 2 open data!')
		ret_str = str(data1)
		print(ret_str)

	time.sleep(150)



