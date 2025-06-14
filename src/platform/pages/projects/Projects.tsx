import type { JSX } from 'react';
import { Container } from '../../../shared/ui/container/Container';
import { LinkTo } from '../../../shared/ui/link/LinkTo';

export const UnfinishedProjects = (): JSX.Element => {
  return (
    <div className="max-w-3xl mx-auto">
      <br />
      <h1>Unfinished Projects</h1>
      <br />
      <Container>
        <ul>
          <li>
            <LinkTo href="/redacted/radEx" label="Radical Exploder" />
          </li>
          <li>
            <LinkTo href="/redacted/sluce" label="Sluce" />
          </li>
        </ul>
      </Container>
    </div>
  );
};
