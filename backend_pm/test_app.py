import unittest
import requests
from os import environ

class TestApp(unittest.TestCase):
  
  URL = 'http://host.docker.internal:4000'

  exampleDataProperty =  {
        "address": "11 Rue Francis Perrin, 91190 Gif Sur Yvette",
        "id": 4,
        "price": 100000,
        "propertyType": "Residensiel",
        "purchaseDate": "2024-05-19",
        "status": "Occupied"
    }
  exampleDataPropertyUpdate =  {
        "address": "address updated",
        "id": 4,
        "price": 100000,
        "propertyType": "Residensiel",
        "purchaseDate": "2024-05-19",
        "status": "Occupied"
    }
  exampleBadDataProperty =  {
        "address": "11 Rue Francis Perrin, 91190 Gif Sur Yvette",
        "id": 4,
        "price": 100000,
        "propertyType": "Residensiel",
        "purchaseDate": "2024-05-19",
        
    }
  exampeDataTenants={
       "contactInfo": "+33123456789",
        "leaseTermEnd": "2025-08-30",
        "leaseTermStart": "2023-12-10",
        "name": "test",
        "propertyID": 3,
        "rentalPayementStatus": "Paid"
    },
  exampeBadDataTenants={
        "contactInfo": "+33123456789",
        "id": 4,
        "leaseTermEnd": "2025-08-30",
        "leaseTermStart": "2023-12-60",
        "name": "test",
        "propertyID": 20,
        "rentalPayementStatus": "Paid"
    },
  exampeUpdateDataTenants={
        "contactInfo": "+33123456789",
        "leaseTermEnd": "2025-08-30",
        "leaseTermStart": "2023-12-60",
        "name": "test updated",
        "propertyID": 20,
        "rentalPayementStatus": "Paid"
    },
  exampleBadDataMaintenance = {
        "description": 1,
        "propertyID": 1,
        "scheduledDate": "Tue, 15 Mar 2022 00:00:00 GMT",
        "status": "Completed"
    }
  
  def test_getProperties(self):
    resp = requests.get(self.URL + '/properties')
    self.assertEqual(resp.status_code, 200)
    self.assertEqual(len(resp.json()), 3) 
    print('Test itinial Properties completed')
    
  def test_getTenants(self):
    resp = requests.get(self.URL + '/holders')
    self.assertEqual(resp.status_code, 200)
    self.assertEqual(len(resp.json()), 3)
    print('Test itinial Tenants completed')
    
  def test_getMaintenances(self):
    resp = requests.get(self.URL + '/tasks')
    self.assertEqual(resp.status_code, 200)
    self.assertEqual(len(resp.json()), 3)
    print('Test itinial Tasks completed')
  
  def test_postProperty(self):
    resp = requests.post(self.URL + '/properties', json= self.exampleDataProperty)
    self.assertEqual(resp.status_code, 201)
    print('Test add Property completed')
    
  def test_getProperty(self):
    resp = requests.get(self.URL + '/properties/4')
    self.assertEqual(resp.status_code, 200)
    self.assertEqual(resp.json()['address'], self.exampleDataProperty['address'])
    print('Test get Property completed')
    
  def test_badPostProperty(self):
    resp = requests.post(self.URL + '/properties', json= self.exampleBadDataProperty)
    self.assertEqual(resp.status_code, 500)
    print('Test add bad Property completed')
    
  def test_UpdateProperty(self):
    resp = requests.put(self.URL + '/properties/4', json= self.exampleDataPropertyUpdate)
    self.assertEqual(resp.status_code, 200)
    print('Test updateProperty completed')
    
  def test_DeleteProperty(self):
    resp = requests.delete(self.URL + '/properties/4', json= self.exampleDataPropertyUpdate)
    self.assertEqual(resp.status_code, 200)
    print('Test delete Property completed')
    
  def test_postTenant(self):
    resp = requests.post(self.URL + '/holders', json= self.exampeDataTenants)
    self.assertEqual(resp.status_code, 201)
    print('Test add Tenant completed')
    
  def test_getTenant(self):
    resp = requests.get(self.URL + '/holders/3')
    self.assertEqual(resp.status_code, 200)
    print('Test get Tenant completed')
    
  def test_badPostTenant(self):
    resp = requests.post(self.URL + '/holders', json= self.exampeBadDataTenants)
    self.assertEqual(resp.status_code, 404)
    print('Test add bad Tenant completed')
    
  def test_UpdateTenant(self):
    resp = requests.put(self.URL + '/holders/4', json= self.exampeUpdateDataTenants)
    self.assertEqual(resp.status_code, 200)
    print('Test updateProperty completed')
    
  def test_DeleteTeant(self):
    resp = requests.delete(self.URL + '/holders/4', json= self.exampleDataPropertyUpdate)
    self.assertEqual(resp.status_code, 200)
    print('Test delete Tenant completed')
    
  def test_badPostMaintenance(self):
    resp = requests.post(self.URL +'tasks', json= self.exampleBadDataMaintenance)
    self.assertEqual(resp.status_code, 500)
    print('Test add bad Maintenance completed')
  
if __name__ == "__main__":
  run_test= TestApp()
  run_test.test_getProperties() 
  run_test.test_getTenants()
  run_test.test_getMaintenances()
  run_test.test_postProperty()
  run_test.test_getProperty()
  run_test.test_badPostProperty()
  run_test.test_UpdateProperty()
  run_test.test_DeleteProperty()
  # run_test.test_postTenant()
  # run_test.test_getTenant()
  # run_test.test_UpdateTenant()
  # run_test.test_badPostTenant()
  # run_test.test_DeleteTeant()
  