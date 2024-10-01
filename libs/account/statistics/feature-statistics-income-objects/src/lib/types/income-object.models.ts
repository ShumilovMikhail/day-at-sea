export interface IncomeObjectDTO {
  id: number;
  agency_object_id: number;
  profit: number;
  total_cost: number;
  rental_days: number;
  bookings_count: number;
  created_at: string;
}

export interface IncomeObjectEntity {
  id: number;
  title: string;
  profit: number;
  totalIncome: number;
  totalCost: number;
  downtime: number;
  rentalDays: number;
  averageIncome: number;
  bookingsCount: number;
}
