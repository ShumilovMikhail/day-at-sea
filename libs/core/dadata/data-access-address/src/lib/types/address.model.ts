export interface Suggestion {
  value: string;
}

export interface AddressResponse {
  suggestions: Suggestion[];
}

export type AddressList = string[];
