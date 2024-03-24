//defines types for typescript
export interface IRestaurantDataNum {
    restaurant: {
        id: number,
        name: string,
        location: string,
        price_range: number,
        average_rating: number,
        count: number,
    },
    reviews: {
        id: number,
        restaurant_id: number,
        name: string,
        review: string,
        rating: number,
    }[]
}

export interface IResponseResults {
    data: {
        data: IRestaurantDataNum
    }
}


export interface IRestaurant {
    restaurant: {};
    reviews: { id: number; restaurant_id: number; name: string; review: string; rating: number; }[];
    data: {
        data: IRestaurantDataNum
    }
    id: number,
    name: string,
    location: string,
    price_range: number,
    average_rating: number,
    count: number,
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
    selectedRestaurant?: IResponseResults;
    setSelectedRestaurant?: React.Dispatch<React.SetStateAction<IResponseResults | undefined>>;
}

export interface IAddRestaurantProps {
    addRestaurants?: ((restaurant: IRestaurant) => void)
}
// write type to simplify by showing change of price range type from string to number with
// IResponseResults
export type ResponseUpdateResults = {
    data: {
        data: IRestaurantDataNum
    }
}
// Can it be simplified by having a common restaurant review interface?
export type ResponseResults = {
    data: {
        data: {
            restaurant: IRestaurant,
            reviews: IRestaurant[]
        }
    }

}

export interface IStarRatingParams {
    rating: number,
}

export type ResponseDeleteResults = {
    data: {
        status: "success" | "error";
        message?: string
    }
}

export interface IReview {
    ({ reviews }: {
        reviews: {
            id: number,
            restaurant_id: number,
            name: string,
            review: string,
            rating: number,
        }[]
    }): JSX.Element;
}