export interface ObjectInfrastructureVM {
  places: InfrastructureItemVM[];
  leisure: InfrastructureItemVM[];
  leisureWater: InfrastructureItemVM[];
  leisureActive: InfrastructureItemVM[];
  reachByPublicTransport: string;
  reachByPrivateTransport: string;
}

export interface InfrastructureItemVM {
  name: string;
  distance: string;
}
