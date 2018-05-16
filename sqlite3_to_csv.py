import sqlite3
import csv

# '''创建一个数据库，文件名'''
conn = sqlite3.connect('/home/quanpower/Downloads/app.db')
# '''创建游标'''
cursor = conn.cursor()

# '''执行语句'''

sql = 'select * from conc_temp'
# sql = 'select * from conc_temp where conc_node_id != 115'

records = cursor.execute(sql)

# records = cursor.fetchall()

# for record in records:
# 	print(record)

with open('names.csv', 'w', newline='') as csvfile:
    fieldnames = ['conc_location_id', 'conc_gateway_id','conc_region_id', 'conc_node_id', 'reserve', 'temp1', 'temp2','temp3', 'temp4', 'temp5' ,'temp6', 'battery_vol','datetime' ]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for record in records:
	    writer.writerow({'conc_location_id': record[1], 'conc_gateway_id': record[2],'conc_region_id': record[3], 'conc_node_id': record[4], 'reserve': record[5], 'temp1': record[6], 'temp2': record[7],'temp3': record[8], 'temp4': record[9], 'temp5': record[10] ,'temp6': record[11], 'battery_vol': record[12],'datetime': record[13]})




# '''使用游标关闭数据库的链接'''
cursor.close()