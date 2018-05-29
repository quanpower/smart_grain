from bitstring import BitStream
from mqtt_publisher import return_air_con_mqtt_str_bytes_to_send


gateway_addr = '0b001' # 1
node_addr = '0b0000000000010' # 1
trans_direct = '0b1'  # 1
func_code = '0b0010001' # 17
wind_direct = '0b00' #
wind_speed = '0b11' #1
model = '0b1000111001' # sanling 569
# model = '0b0000101101' # media 45

on_off = '0b01' # on
work_mode = '0b001' #cold
temp = '0b10000' #16

def replace_0b(input):
    return input.replace('0b','')

# str_bin = return_str_bin(gateway_addr, node_addr, trans_direct, func_code, wind_direct, wind_speed, model, on_off, work_mode, temp)
# str_bin = bitstring.pack(gateway_addr, node_addr, trans_direct, func_code, wind_direct, wind_speed, model, on_off, work_mode, temp)

str_replaced = replace_0b(gateway_addr) + replace_0b(node_addr) + replace_0b(trans_direct) + replace_0b(func_code) + replace_0b(wind_direct) + replace_0b(wind_speed) + replace_0b(model) + replace_0b(on_off) + replace_0b(work_mode) + replace_0b(temp)

print('str',str_replaced)
print(len(str_replaced))
str_bin = BitStream('0b' + str_replaced)
str_bytes = return_air_con_mqtt_str_bytes_to_send(str_bin)