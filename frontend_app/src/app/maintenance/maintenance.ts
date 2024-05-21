export interface Maintenance {
  id: number;
  description: string;
  status: string;
  scheduledDate: Date;
  propertyID: number;
}
