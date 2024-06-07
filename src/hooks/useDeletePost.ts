import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../service";

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deletePost(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    });
};