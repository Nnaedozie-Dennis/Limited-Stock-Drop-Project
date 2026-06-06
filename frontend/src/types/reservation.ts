// export interface Reservation {
//   id: string;
//   product_id: string;
//   quantity: number;
//   status: string;
//   expires_at: string;
// }

export interface Reservation {
  id: string;
  quantity: number;
  status: string;
  expires_at: string;
  created_at: string;

  products: {
    name: string;
    image_url: string;
    price: number;
  };
}