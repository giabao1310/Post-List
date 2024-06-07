import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../types/post";
import { POST_API } from "../path/config";

const FetchPost = async () => {
    const url = POST_API;

    const { data } = await axios.get(url);
    return data;
}

export const useFetchPost = () => {
    return useQuery<Data[]>({
        queryKey: ["posts"],
        queryFn: FetchPost,
    });
};