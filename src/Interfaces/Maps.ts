export interface DateAmountHash {
  [date: string]: number;
}

export interface DateAmount {
  date: string;
  amount: number;
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
  geometry: {
    city: string;
    lat: number;
    lng: number;
  };
}
