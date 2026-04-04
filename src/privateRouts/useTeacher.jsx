import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContexHooks from "../useHooks/useContexHooks";

const useTeacher = () => {
  const { user, loading } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
    queryKey: [user?.email, "isTeacher"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/teacher/${user.email}`);
      return res.data?.isTeacher;
    },
  });
  return [isTeacher, isTeacherLoading];
};

export default useTeacher;
