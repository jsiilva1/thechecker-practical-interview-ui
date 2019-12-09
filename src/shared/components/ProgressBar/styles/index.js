import styled from 'styled-components';

export const ProgressWrapper = styled.div`
  width: ${props => props.now ? `${props.now}%` : 0 };
  height: 7px;
  background: #4DC27A;
  border-radius: 7px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 4px;
  transition: width .2s ease-in;
`;