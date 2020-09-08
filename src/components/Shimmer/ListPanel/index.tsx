import React from 'react';

import Skeleton from '../../Skeleton';

import { Container } from './styles';

const ListPanel: React.FC = () => {
  return (
    <Container>
      <section >
        <Skeleton className="title-skeleton" />
        <Skeleton className="description-skeleton" />
        <Skeleton className="description-skeleton" />
      </section>

      <section >
        <Skeleton className="title-skeleton" />
        <Skeleton className="description-skeleton" />
        <Skeleton className="description-skeleton" />
      </section>
    </Container>
  );
};

export default ListPanel;
