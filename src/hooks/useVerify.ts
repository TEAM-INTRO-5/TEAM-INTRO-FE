import { user } from "@/apis/auth";
import { getCookie } from "@/utils/cookies";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function useUser() {
    const token = getCookie('access_token')
    const { data ,isLoading, error } = useQuery(['user',`${token}`], user)    
    const router = useRouter();
      useEffect(() => {
          if (!token || error) {
              console.log(data)
              router.replace("/login");
            } else if(data && router.pathname === '/login') {
                router.replace("/dashboard/main")
            }
    }, [data]);
    return { data, isLoading: !isLoading && !error };
    }
      