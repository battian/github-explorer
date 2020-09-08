import React from 'react';

import Skeleton from '../../Skeleton';

import { Container } from './styles';

const InfoPanel: React.FC = () => {
  return (
    <Container>
      <section >
        <Skeleton className="avatar-skeleton" />
        <div>
          <Skeleton className="title-skeleton" />
          <Skeleton className="description-skeleton" />
          <Skeleton className="description-skeleton" />
        </div>
      </section>
    </Container>
  );
};

export default InfoPanel;
