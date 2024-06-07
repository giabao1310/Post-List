import { useMutation , useQueryClient } from "@tanstack/react-query";
import { createPost } from "../service";
import { Data } from "../types/post";

export const useAddPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (addPost: Data) => createPost(addPost),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"]
            })
        }
    })
}