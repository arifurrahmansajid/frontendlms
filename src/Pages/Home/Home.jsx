import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Community from "./Community";
import Partners from "./Partners";
import Question from "./Question";
import RivewCard from "./RivewCard";
// import Teacher from "./Teacher";
import TopEnroll from "./TopEnroll";
import Category from "./Category";
import Benefits from "./Benefits";
import InstructorCTA from "./InstructorCTA";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>EduHub | Home</title>
      </Helmet>
      <Banner />
      <Partners />
      <Benefits />
      <TopEnroll />
      {/* <Teacher /> */}
      <RivewCard />
      <InstructorCTA />
      <Community />
      <Question />
      <Category />
    </div>
  );
};


export default Home;
