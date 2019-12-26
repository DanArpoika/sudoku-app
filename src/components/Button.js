import styled from 'styled-components';
import { rgba } from 'polished';

const Button = styled.button`
  padding: 14px 18px;
  width: 120px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.mainAccent};
  background-color: ${props => rgba(props.theme.secondaryAccent, .65)};
  color: ${props => props.theme.background};
  text-transform: uppercase;
  font-weight: 800;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.secondaryAccent};
  }
`;

export default Button;
