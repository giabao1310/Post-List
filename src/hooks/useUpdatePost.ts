import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../service";
import { Data } from "../types/post";

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updatedPost: Data) => updatePost(updatedPost),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"]})
    });
};