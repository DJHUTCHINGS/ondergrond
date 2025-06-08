import { Container } from '../../components/container/Container';
import { CONTAINER_HEADER_CLASS } from '../about/About';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-16">
        <br />
        <h1
          className="text-4xl font-bold text-gray-900 mb-6"
          data-testid="home-main-header"
        >
          Welcome to the Ondergrond
        </h1>
        <Container>
          <h2 className={CONTAINER_HEADER_CLASS}>Features</h2>
          <em>Coming soon.</em>
        </Container>
      </div>
    </div>
  );
};

export default Home;
