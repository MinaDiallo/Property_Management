
from flask import Blueprint, request, jsonify, make_response
from core import app
from models import db, Property, Holder, Task



@app.route('/', methods=['GET'])
def test():
  return 'App is running'

# create a property
@app.route('/properties', methods=['POST'])
def add_property():
  try:
    data = request.get_json()
    new_proprety = Property(address=data['address'], propertyType=data['propertyType'],
                    status=data['status'], purchaseDate= data['purchaseDate'], price= data['price'])
    db.session.add(new_proprety)
    db.session.commit()
    return make_response(jsonify({'message': 'proprety created'}), 201)
  except Exception as e:
    print(e)
    return make_response(jsonify({'message': 'error created property'}), 500)
  
# get all properties
@app.route('/properties', methods=['GET'])
def get_properties():
  try:
    properties = Property.query.all()
    return make_response(jsonify([property.json() for property in properties]), 200)
  except:
    return make_response(jsonify({'message': 'error getting properties'}), 500)

# get a user by id
@app.route('/properties/<int:id>', methods=['GET'])
def get_property(id):
  try:
    property = Property.query.filter_by(id=id).first()
    if property:
      return make_response(jsonify(property.json()), 200)
    return make_response(jsonify({'message': 'property not found'}), 404)
  except:
    return make_response(jsonify({'message': 'error getting property'}), 500)
  
# update a property
@app.route('/properties/<int:id>', methods=['PUT'])
def update_property(id):
  try:
    property = Property.query.filter_by(id=id).first()
    if property:
      data = request.get_json()
      property.address=data['address']
      property.propertyType=data['propertyType'],
      property.status=data['status'], 
      property.purchaseDate= data['purchaseDate'], 
      property.price= data['price']
      db.session.commit()
      return make_response(jsonify({'message': 'property updated'}), 200)
    return make_response(jsonify({'message': 'property not found'}), 404)
  except:
    return make_response(jsonify({'message': 'error updating property'}), 500)
  
# delete a property
@app.route('/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
  try:
    property = Property.query.filter_by(id=id). first()
    if property:
      db.session.delete(property)
      db.session.commit()
      return make_response(jsonify({'message': 'property deleted'}), 200)
    return make_response(jsonify({'message': 'property not found'}), 404)
  except :
    return make_response(jsonify({'message': 'error deleting property'}), 500)
  
#get All holders
@app.route('/holders', methods=['GET'])
def get_holders():
  try:
    holders = Holder.query.all()
    return make_response(jsonify([holder.json() for holder in holders]), 200)
  except Exception as e:
    return make_response(str(e))
  
# create a holder
@app.route('/holders', methods=['POST'])
def add_holder():
  try:
    data = request.get_json()
    new_property = Property.query.filter_by(id=data['propertyID']).first()
    if new_property:
      new_holder = Holder(name= data['name'], contactInfo=data['contactInfo'], leaseTermStart=data['leaseTermStart'], leaseTermEnd=data['leaseTermEnd'], rentalPayementStatus=data['rentalPayementStatus'], property=new_property)
      print('aaa', new_holder)
      db.session.add(new_holder)
      db.session.commit()
      return make_response(jsonify({'holder': "holder added"}), 201)
    return make_response(jsonify({'message': 'property not found'}), 404)

  except Exception as e:
    print(e)
    return make_response(str(e)) 

# get a holder by id
@app.route('/holders/<int:id>', methods=['GET'])
def get_holder_byId(id):
  try:
    holder = Holder.query.filter_by(id=id).first()
    if holder:
      return make_response(jsonify( holder.json()), 200)
    return make_response(jsonify({'message': 'holder not found'}), 404)
  except:
    return make_response(jsonify({'message': 'error getting holder'}), 500)
  
# get a holder by propertyId #Todo array
@app.route('/holders/propertyId/<int:propertyId>', methods=['GET'])
def get_holderByPropertyID(propertyId):
  try:
    holders=Holder.query.filter_by(propertyID=propertyId)
    if holders:
      return make_response(jsonify([holder.json() for holder in holders]), 200)
    return make_response(jsonify({'message': 'holder not found'}), 404)
  except:
    return make_response(jsonify({'message': 'error getting holder'}), 500) 
  
# update a holder
@app.route('/holders/<int:id>', methods=['PUT'])
def update_holder(id):
  try:
    data = request.get_json()
    holder = Holder.query.filter_by(id=id).first()
    new_property = Property.query.filter_by(id=data['propertyID']).first()
    if holder and new_property:
      holder.name=data['name']
      holder.contactInfo=data['contactInfo']
      holder.leaseTermStart=data['leaseTermStart'], 
      holder.leaseTermEnd=data['leaseTermEnd'],
      holder.rentalPayementStatus=data['rentalPayementStatus'], 
      holder.property= new_property
      db.session.commit()
      return make_response(jsonify({'message': 'holder updated'}), 200)
    return make_response(jsonify({'message': 'holder not found'}), 404)
  except Exception as e:
    return make_response(str(e))
  
# delete a holder
@app.route('/holders/<int:id>', methods=['DELETE'])
def remove_holder(id):
  try:
    holder = Holder.query.filter_by(id=id). first()
    if holder:
      db.session.delete(holder)
      db.session.commit()
      return make_response(jsonify({'message': 'holder deleted'}), 200)
    return make_response(jsonify({'message': 'holder not found'}), 404)
  except :
    return make_response(jsonify({'message': 'error deleting holder'}), 500)


#get all tasks
@app.route('/tasks', methods=['GET'])
def getAll_tasks():
  try:
    tasks = Task.query.all()
    return make_response(jsonify([task.json() for task in tasks]), 200)
  except Exception as e:
    return make_response(jsonify({'message': 'error getting tasks'}))
  
#get a tasks
@app.route('/tasks/<int:id>', methods=['GET'])
def getTask(id):
  try:
    task = Task.query.filter_by(id=id).first()
    if task:
      return make_response(jsonify( task.json()), 200)
    return make_response(jsonify({'message': 'task not found'}), 404)
  except:
    return make_response(jsonify({'message': 'error getting task'}), 500)
  
# log task
@app.route('/tasks', methods=['POST'])
def log_task():
  try:
    data = request.get_json()
    a_property = Property.query.filter_by(id=data['propertyID']).first()
    #TODO fix date insert
    if a_property:
      new_task = Task(description= data['description'], status=data['status'], scheduledDate=data['scheduledDate'], property=a_property)
      db.session.add(new_task)
      db.session.commit()
      return make_response(jsonify({'new_task': "new_task added"}), 201)
    return make_response(jsonify({'message': 'property not found'}), 404)

  except Exception as e:
    print(e)
    return make_response(str(e)) 
  
# get a tasks by propertyId #Todo array
@app.route('/tasks/propertyId/<int:propertyId>', methods=['GET'])
def get_tasksByPropertyID(propertyId):
  try:
    tasks = Task.query.filter_by(propertyID=propertyId)
    return make_response(jsonify([task.json() for task in tasks]), 200)
  except:
    return make_response(jsonify({'message': 'error getting holder'}), 500) 
  
# update a holder
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
  try:
    data = request.get_json()
    task = Task.query.filter_by(id=id).first()
    if task :
      task.description= data['description']
      task.status= data['status']
      task.scheduledDate= data['scheduledDate']
      db.session.commit()
      return make_response(jsonify({'message': 'task updated'}), 200)
    return make_response(jsonify({'message': 'task not found'}), 404)
  except Exception as e:
    return make_response(str(e))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4000)