import Banner from '../Home/Banner/Banner';
import Classes from './Classes/Classes';
import Feedback from './Feedback/Feedback';
import Partner from './Partner/Partner';
import Stats from './Stats/Stats';

const Home = () => {
  return (
    <div>
      <Banner/>
      <Partner/>
      <Classes/>
      <Feedback/>
      <Stats/>
    </div>
  );
};

export default Home;