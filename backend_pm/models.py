from core import app
from sqlalchemy.orm import  relationship
from flask_sqlalchemy import SQLAlchemy
from initData import Properties, Holders, Tasks


db= SQLAlchemy(app)

class Property(db.Model):
    __tablename__ = 'property'

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(100), nullable=False)
    propertyType = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    purchaseDate = db.Column(db.DateTime(), nullable=False)
    price = db.Column(db.Integer(), nullable=False)

    holders=relationship('Holder',back_populates='property',cascade='all, delete')
    tasks=relationship('Task',back_populates='property',cascade='all, delete')
    
    def json(self):
        return {'id': self.id, 'address':self.address, 'propertyType': self.propertyType, 
                'status': self.status, 'purchaseDate': self.purchaseDate,
                'price': self.price}

class Holder(db.Model):
    __tablename__ = 'holder'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    contactInfo = db.Column(db.String, nullable=False) #TODO a verifier
    leaseTermStart = db.Column(db.Date(), nullable=False)
    leaseTermEnd = db.Column(db.Date(), nullable=False)
    rentalPayementStatus = db.Column(db.String(50), nullable=False)
    propertyID = db.Column(db.Integer, db.ForeignKey("property.id", ondelete= "CASCADE")) # TODO unique 
    
    property=relationship('Property',back_populates='holders')
    # property = relationship("Property", back_populates="tenant")

    def json(self):
        return {'id': self.id, 'name': self.name, 'contactInfo': self.contactInfo, 'leaseTermStart': self.leaseTermStart, 'leaseTermEnd': self.leaseTermStart,'rentalPayementStatus': self.rentalPayementStatus, 'propertyID': self.propertyID}
            
class Task(db.Model):
    __tablename__ = 'task'
    
    id = db.Column(db.Integer, primary_key=True)
    description=db.Column(db.String(250), nullable=False)
    status=db.Column(db.String(50), nullable=False)
    scheduledDate=db.Column(db.Date(), nullable=False)
    propertyID = db.Column(db.Integer, db.ForeignKey("property.id", ondelete= "CASCADE")) # TODO unique 
    
    property=relationship('Property',back_populates='tasks')
    # property = relationship("Property", back_populates="tenant")

    def json(self):
        return {'id': self.id, 'description': self.description,'status': self.status,'scheduledDate':self.scheduledDate, 'propertyID': self.propertyID}

def initDB():
  tables = [Property, Holder,Task]

  for table in tables:
    db.session.query(table).delete()
    tableId = table.__name__ +"_id_seq"
    db.session.execute(f"ALTER SEQUENCE {tableId} RESTART WITH 1")
    db.session.commit()
    print(table, 'data deleted')
  for property in Properties:
    new_proprety = Property(address=property['Address'], propertyType=property['PropertyType'],
                    status=property['Status'], purchaseDate= property['PurchaseDate'], price= property['Price'])
    db.session.add(new_proprety)
    db.session.commit()
  for holder in Holders:
    a_property = Property.query.filter_by(id=holder['PropertyID']).first()
    new_holder = Holder(name= holder['Name'], contactInfo=holder['ContactInfo'], leaseTermStart=holder['LeaseTermStart'], leaseTermEnd=holder['LeaseTermEnd'], rentalPayementStatus=holder['RentalPaymentStatus'], property=a_property)
    db.session.add(new_holder)
    db.session.commit()
  for task in Tasks:
    a_property = Property.query.filter_by(id=task['PropertyID']).first()
    new_task = Task(description= task['Description'], status=task['Status'], scheduledDate=task['ScheduledDate'], property=a_property)
    db.session.add(new_task)
    db.session.commit()


db.create_all()
initDB()
