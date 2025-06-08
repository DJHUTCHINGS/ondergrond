import { Container } from '../../components/container/Container';
import { Grid } from '../../components/grid/Grid';
import { Link } from '../../components/link/Link';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-16">
        <div className="bg-orange-500 text-white p-4">Under Construction</div>
        <br />
        <h1
          className="text-4xl font-bold text-gray-900 mb-6"
          data-testid="home-main-header"
        >
          Welcome to the Ondergrond
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A simple introduction to Dave H.
        </p>

        <Grid columns={1}>
          <Container>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>

            <p>
              <Link
                href="https://www.linkedin.com/in/djhutchings/"
                label="LinkedIn"
                external
              />
            </p>

            <p>
              <Link
                label="GitHub"
                href="https://github.com/DJHUTCHINGS"
                external
              />
            </p>
          </Container>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
