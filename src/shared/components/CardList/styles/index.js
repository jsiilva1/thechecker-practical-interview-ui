import styled from 'styled-components';

import { Button } from '../../../theme/objects/Button';
import { device } from '../../../theme/settings/screens';

export const CardListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const List = styled.article`
  background: #FFF;
  width: calc(80vh - 21%);
  min-height: calc(65vh - 200px); 
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 4px;
  border: 1px solid #ecf0f1;
  border-radius: 7px;
  padding: 20px; 
  margin: 0px 9px 10px 0;

  @media ${device.mobile} {
    width: 100%;
    min-height: calc(100vh - 350px); 
    margin: 0px 0 10px 0;

    &:last-child {
      margin-bottom: 26%;
    }
  }

  > .list-title {
    margin: 0;
    font-weight: 900;
    font-style: bold;
  }
  
  > .list-id {
    margin: 2px 0;
    font-size: 0.98rem;
    font-weight: 500;
    font-style: normal;
    color: #B8B8B8;
  }

  > .list-createdat {
    margin: 4px 0;
    font-size: 0.8rem;
    font-weight: 500;
    font-style: normal;
    color: #B8B8B8;
  }

  .stats { 
    margin-top: 40px; 
    font-size: 1.2rem;
    font-weight: 400;
    font-style: normal;
    
    > .stats-number {
      font-size: 2.8rem;
      font-weight: 900;
      font-style: bold;
    } 

    &:hover { 
      cursor: pointer;
      color: #4DC27A; 
    }
  }

  & ${Button} {
    font-weight: 800 !important;
    text-shadow: none !important;
    color: #999 !important;
  }
`;

export const ListHeader = styled.div`
  border-bottom: 1px solid #D0D0D0;
`;
