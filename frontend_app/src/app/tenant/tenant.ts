export interface Tenant {
  id: number;
  name: string;
  contactInfo: string;
  leaseTermStart: Date;
  leaseTermEnd: Date;
  rentalPayementStatus: string;
  propertyID: number;
}
