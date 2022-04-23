export interface DateAmountHash {
  [date: string]: number;
}

export interface DateAmountType {
  date: string;
  amount: number;
  type: string;
}

export interface MonthsMap {
  [date: number]: string;
}

export interface LocationMap {
  country: string;
  state: string;
  x: number;
  y: number;
}

export interface Geolocation {
  id: number;
  country: string;
  ISO_code: string;
  local_branch: string;
  geometry: {
    city: string;
    lat: number;
    lng: number;
  };
}
