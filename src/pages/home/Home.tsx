import { useState } from 'react';
import { Container } from '../../components/container/Container';
import { Grid } from '../../components/grid/Grid';
import { Link } from '../../components/link/Link';
import { X } from 'lucide-react';

const Home = () => {
  const [showAlert, setShowAlert] = useState(true);

  const ALERT_TEXT = `Under Construction`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-16">
        {showAlert && (
          <div className="bg-yellow-400 text-white p-4 rounded-lg shadow-sm">
            <Grid columns={3}>
              <span> {ALERT_TEXT}</span>
              <div></div>
              <button
                className="justify-self-end"
                onClick={() => setShowAlert(!showAlert)}
              >
                <X />
              </button>
            </Grid>
          </div>
        )}
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
