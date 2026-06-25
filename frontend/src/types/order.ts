export interface Order {
  id: string;
  status: string;
  created_at: string;

  reservations: {
    quantity: number;

    products: {
      name: string;
      price: number;
      image_url: string;
    };
  };
  profiles?: {
    email: string;
  };
}
