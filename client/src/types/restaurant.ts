//defines types for typescript
export interface IRestaurant {
    restaurant: {};
    reviews: { id: number; restaurant_id: number; name: string; review: string; rating: number; }[];
    data: {
        data: {
            restaurant: {
                id: number
                name: string
                location: string
                price_range: number
                average_rating: number
                count: number
            };
            reviews: {
                id: number
                restaurant_id: number
                name: string
                review: string
                rating: number
            }[]
        }
    }
    id: number,
    name: string,
    location: string,
    price_range: number,
    average_rating: number,
    count: number,
}

export interface ISetSelectedResponseResults {
    data: {
        data: {
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
        }
    }

}

export interface IRestaurantListProps {
    restaurants: Array<IRestaurant>,
    setRestaurants: (restaurants: Array<IRestaurant>) => void
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
    setRestaurants: React.Dispatch<React.SetStateAction<IRestaurant[]>>;
    addRestaurants?: (restaurant: IRestaurant) => void;
    selectedRestaurant?: ISetSelectedResponseResults;
    setSelectedRestaurant?: React.Dispatch<React.SetStateAction<ISetSelectedResponseResults | undefined>>;
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
        data: {
            restaurant: IRestaurant,
            reviews: Array<IRestaurant>
        }
    }

}

export interface IStarRatingParams {
    rating: number,
}

export type ResponseUpdateResults = {
    data: {
        data: {
            restaurant: {
                id: number,
                name: string,
                location: string,
                price_range: string,
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
        }
    }

}

export type ResponseDeleteResults = {
    data: {
        status: "success" | "error";
        message?: string
    }
}

export interface IReview {
    ({ reviews }: {
        reviews: Array<{
            id: number,
            restaurant_id: number,
            name: string,
            review: string,
            rating: number,
        }>
    }): JSX.Element;
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
  setSelectedRestaurant: (selectedRestaurant: IRestaurant) => void
}

// export interface IRestaurantParams {
//     id: string | number,
// }