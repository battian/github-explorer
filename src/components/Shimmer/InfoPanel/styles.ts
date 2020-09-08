import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 80px;

  section {
    width: 100%;
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;

    .avatar-skeleton {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    .title-skeleton {
      width: 250px;
      height: 24px;
      border-radius: 8px;
      margin-left: 24px;
    }

    .description-skeleton {
      height: 16px;
      border-radius: 8px;
      margin-top: 16px;
      margin-left: 24px;
    }
  }
`;
