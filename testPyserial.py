import serial
import time

import binascii
import struct

def order_list(hex_str):
    # a = '0110000000010201016600'
    a_list = []
    for i in hex_str.split():
        a_list.append(binascii.a2b_hex(i))
    return a_list

# a = order_list()
# print(a)

def trans(s):
    return "b'%s'" % ''.join('\\x%.2x' % x for x in s)

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
print ser.isOpen()
xihe="\x01\x10\x00\x00\x00\x01\x02\x01\x01\x66\x00"
# xihe="0110000000010201016600"
shifang="\x01\x10\x00\x00\x00\x01\x02\x00\x01\x67\x90"
dianliu="\x01\x03\x00\x04\x00\x04\x05\xC8"
ma="\x40\xe0\x6e\x8b"


while (1):
        print "send 256x to remotes"
        startTime = time.time()
        times = 256
        while (times):
                times -= 1
                print('*****-------current test beginning-----****')
                s = ser.write(dianliu)
                time.sleep(1)
                line = ser.readline()
                print(type(line))
                print(len(line))
                print(str(line))
                # print(trans(line))
                # print(''.join(map(lambda x:('/x' if len(hex(x))>=4 else '/x0')+hex(x)[2:],line)))
                # s = ser.write(shifang)
                s= line.encode('hex')
                p = ' '.join('{:02X}'.format(ord(i)) for i in line)
                q = [binascii.hexlify(c).upper() for c in line] 
                t = struct.unpack('13c', line)
                print(s)
                print(p)
                print(' '.join(q))
                print(t)
                current_bytes_1 = line[3:7]
                current_bytes_2 = line[7:11]
                
                print('-----current_bytes------')
                print(current_bytes_1.encode('hex'))

                current_value_mA_1 = struct.unpack('!f', current_bytes_1)[0]
                current_value_A_1 = 10 * ((current_value_mA_1-3.92)/16)
                current_value_mA_2 = struct.unpack('!f', current_bytes_2)[0]
                current_value_A_2 = 10 * ((current_value_mA_2-3.92)/16)

                print('-----current_value_mA------')
                print(current_value_mA_1)
                print('-----current_value_A------')
                print(current_value_A_1)


                time.sleep(2)

                # import struct
                # bs = pack('f', 123432.523424)
                # ls = [i for i in bs]
                # print(ls)

        endTime = time.time()
        print "use time: "+str(endTime-startTime)
        print ""
        time.sleep(5)
ser.close()