import csv
import json
import os

def formatCsvFileToJson(namefile):
  with open('./data/'+namefile+'.csv', newline='') as csvfile:
      reader = csv.DictReader(csvfile)
      data = [row for row in reader]
  with open('./data/'+namefile+'.json', 'w') as jsonfile:
      json.dump(data, jsonfile) 
  f = open('./data/'+namefile+'.json')
  data = json.load(f)
  return data;
  
Properties= formatCsvFileToJson('properties')
Holders=formatCsvFileToJson('tenants')
Tasks= formatCsvFileToJson('maintenance')