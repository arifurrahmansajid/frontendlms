import { useQuery } from "@tanstack/react-query";
import useContexHooks from "../useHooks/useContexHooks";
import useAxiosSecure from "../useHooks/useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user.email}`);
      return res.data?.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
