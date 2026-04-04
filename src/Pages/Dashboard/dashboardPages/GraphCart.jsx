import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import PreLoader from "../../../components/PreLoader";
import SectionHeader from "../../../components/SectionHeader";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const GraphCart = () => {
  const axiosSecure = useAxiosSecure();
  const { data: teachersRating, isLoading } = useQuery({
    queryKey: "teachersRating",
    queryFn: async () => {
      const res = await axiosSecure.get("/allTeachers-Rating");
      return res.data;
    },
  });

  if (isLoading) {
    return <PreLoader />;
  }
  return (
    <div>
      <div className="my-5">
        <SectionHeader title={"Progress Chart"} />
      </div>
      <div className="flex justify-center items-center w-full min-h-[calc(100vh-360px)]">
        <div style={{ width: "100%", height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={teachersRating}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Bar
                dataKey="averageRating"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {teachersRating.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GraphCart;
