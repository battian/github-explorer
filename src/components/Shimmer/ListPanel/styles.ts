import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 200px;

  section {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: grid;
    align-items: center;
    margin-bottom: 16px;

    .title-skeleton {
      width: 200px;
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
