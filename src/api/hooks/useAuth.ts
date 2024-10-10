import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getCurrentUser, login } from "../auth";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_KEY } from "../base";

export function useGetCurrentUser() {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useQuery({
        queryFn: getCurrentUser,
        queryKey: ["me"],
        retry: false,
        throwOnError: (err) => {
            // Set the current user to null
            console.error(err)
            queryClient.setQueryData(["me"], null);
            router.replace("/login");
            return false;
        },
    });
}

export function useLogin() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const router = useRouter()
    return useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            const accessToken = res.data.token;
            queryClient.invalidateQueries({ queryKey: ["me"] });
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            toast({
                title: "Login successful",
                variant: "success",
            });
            router.push("/admin")
        },
        onError: (err: AxiosError) => {
            if (err.response!.status != 500) {
                toast({
                    title: "Error",
                    description: "Invalid credentials",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: "An unknown error occurred",
                    variant: "destructive",
                });
                console.error(err.response?.data);
            }
        }
    });
}

export function useLogout() {
    const {toast} = useToast();
    const router = useRouter();
    return useMutation({
        mutationFn: async () => {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        },
        onSuccess: () => {
            toast({
                title: "Logged out",
                variant: "success",
            });
            router.push("/login");
        },
        onError: (err) => {
            toast({
                title: "Error",
                description: "An unknown error occurred",
                variant: "destructive",
            });
            console.error(err);
        }
    })
}