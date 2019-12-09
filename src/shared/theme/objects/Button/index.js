import styled from 'styled-components';

export const Button = styled.button`
  box-shadow: 0px 10px 14px -7px #95a5a6;
	border-radius: 20px;
	display: inline-block;
	font-size: .98rem;
	font-weight: 800;
	padding: 13px 32px;
  text-shadow: 0px 1px 0px #3d768a;
  line-height: normal;
  overflow: visible;
  border: 0;

  color: ${props => {
    if (props.color) {
      const { color } = props;

      switch (color) {
        case 'primary':
          return '#FFF';

        case 'secondary':
          return '#FFF';

        case 'light':
          return '#B0B0B0';

        default: return '#cdcdcd';
      }
    }
  }};

  background: ${props => {
    if (props.color) {
      const { color } = props;

      switch (color) {
        case 'primary':
          return 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% );';

        case 'secondary':
          return '#2c3e50';

        default: return '#FFF';
      }
    } 
  }}

  opacity: ${props => {
    if (props.disabled && props.disabled === true) {
      return '0.5';
    }
  }};

  cursor: ${props => {
    if (props.disabled && props.disabled === true) {
      return 'default';
    } else {
      return 'pointer'
    }
  }};

  &:hover {
    opacity: ${props => {
      if (!props.disabled) {
        return '0.9';
      }
    }};
  }

  &:active {
    position: relative;
    top: 0.1rem;
  }

  & p {
    margin: 2px 0 0 0;
    vertical-align: middle;
    float: left;
  }
`;