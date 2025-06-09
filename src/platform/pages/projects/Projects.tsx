import type { JSX } from 'react';
import { Container } from '../../../shared/ui/container/Container';
import { LinkTo } from '../../../shared/ui/link/LinkTo';

export const UnfinishedProjects = (): JSX.Element => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2>Unfinished Projects</h2>
      <Container>
        <div>RAD EX PLACE HOLDER</div>
        <LinkTo href="/redacted/radEx" label="Radical Exploder" />.
      </Container>
    </div>
  );
};
