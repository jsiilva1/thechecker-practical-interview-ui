import styled from 'styled-components';

import { device } from '../../../theme/settings/screens';

export const CardListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const List = styled.article`
  background: #FFF;
  width: calc(90vh - 25%);
  min-height: calc(100vh - 300px); 
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 4px;
  border: 1px solid #ecf0f1;
  border-radius: 7px;
  padding: 10px; 
  margin: 0px 9px 10px 0;

  @media ${device.mobile} {
    width: 100%;
    min-height: calc(100vh - 350px); 
    margin: 0px 0 10px 0;

    &:last-child {
      margin-bottom: 26%;
    }
  }
`;