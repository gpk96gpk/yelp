export interface IRestaurant {
    restaurant: any;
    reviews: { id: number; restaurant_id: number; name: string; review: string; rating: number; }[];
    id: number,
    name: string,
    location: string,
    price_range: number,
    average_rating: number,
    count: number,
}

export interface IRestaurantListProps {
    restaurants?: Array<IRestaurant>,
    setRestaurants?: (restaurants: Array<IRestaurant>) => void
}

export interface IAddRestaurantResponseResults {
    data: {
        data: {
            restaurant: IRestaurant
        }
    }
}

export interface IRestaurantContextData {
    restaurants?: IRestaurant[];
    setRestaurants?: React.Dispatch<React.SetStateAction<IRestaurant[]>>;
    addRestaurants?: (restaurant: IRestaurant) => void;
    selectedRestaurant?: IRestaurant;
    setSelectedRestaurant?: React.Dispatch<React.SetStateAction<IRestaurant>>;
}

export type UpdateRestaurantProps = {
    (props: (name: string, location: string, price_range: number) => JSX.Element): JSX.Element;
}
export interface UpdateRestaurantId {
    id: string,
}

export interface IParamId {
    id: string,
}

export interface IAddRestaurantProps {
    addRestaurants?: ((restaurant: IRestaurant) => void)
}
//How to fix this error?


export interface IAddRestaurantResponseResults {
    data: {
        data: {
            restaurant: IRestaurant
        }
    }
}

export type ResponseResults = {
    data: {
        results: {
            restaurant: IRestaurant,
            reviews: Array<IRestaurant>
        }
    }

}

// export interface RestaurantParams {
//   id: number,
// }

export type SelectedRestaurantContext = {
  selectedRestaurant: {
    restaurant: {
      id: number,
      name: string,
      location: string,
      price_range: number,
      average_rating: number,
      count: number,
    },
    reviews: Array<{
      id: number,
      restaurant_id: number,
      name: string,
      review: string,
      rating: number,
    }>
  },
  setSelectedRestaurant: (selectedRestaurant: number) => void
}

// export interface IRestaurantParams {
//     id: string | number,
// }