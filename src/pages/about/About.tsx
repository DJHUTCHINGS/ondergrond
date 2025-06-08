import { Container } from '../../components/container/Container';
import { Grid } from '../../components/grid/Grid';
import { LinkTo } from '../../components/link/LinkTo';

const HEADER_CLASS = 'text-2xl font-semibold text-gray-900 mt-8 mb-4';

const About = () => {
  const INTRO_TXT = `Ondergrond (Dutch for "underground" or "foundation") is a small online platform I use for hosting code projects.`;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        About Ondergrond
      </h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-gray-600 mb-6">{INTRO_TXT}</p>

        <Grid columns={2}>
          <Container>
            <h2 className={HEADER_CLASS}>Dave H</h2>

            <p>
              David is a web developer in Washington, DC, currently working for
              a large, well-known tech company.
            </p>
            <br />
            <p>He also is an electronic music producer.</p>
          </Container>

          <Container>
            <h2 className={HEADER_CLASS}>Links</h2>

            <p>
              <LinkTo
                href="https://www.linkedin.com/in/djhutchings/"
                label="LinkedIn"
                external
              />
            </p>

            <p>
              <LinkTo
                label="GitHub"
                href="https://github.com/DJHUTCHINGS"
                external
              />
            </p>
            <br />
            <p>
              <LinkTo
                label="DHAHM"
                href="https://dhahm.com"
                external
                description="A selection of some weird instrumental songs."
              />
            </p>
          </Container>
        </Grid>

        <Grid columns={2}>
          <Container>
            <h2 className={HEADER_CLASS}>Technical Stack</h2>

            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Frontend:</strong> React 18, TypeScript, Vite
              </li>
              <li>
                <strong>Styling:</strong> Tailwind CSS
              </li>
              <li>
                <strong>Testing:</strong> Vitest, React Testing Library
              </li>
              <li>
                <strong>Hosting:</strong> AWS S3 + CloudFront
              </li>
              <li>
                <strong>Infrastructure:</strong> AWS CDK
              </li>
              <li>
                <strong>CI/CD:</strong> GitHub Actions
              </li>
            </ul>
          </Container>

          <Container>
            <h2 className={HEADER_CLASS}>Future Plans</h2>

            <p className="text-gray-600 mb-4">
              This platform is designed to grow. Possibile features may include:
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Project sections?</li>
              <li>Blog functionality?</li>
              <li>User authentication and accounts?</li>

              <li>Contact forms?</li>
            </ul>
          </Container>
        </Grid>
      </div>
    </div>
  );
};

export default About;
