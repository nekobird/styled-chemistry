import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  theme,
} from './system/test/theme';

import {
  StyleChemistryProvider,
} from './system/provider';

import {
  space,
} from './system/style-props/space';

const StyledTextComponent = styled.div`
  background-image: ${props => props.theme.compounds.gradients('sunset')()};
  color: ${props => props.theme.elements.color('red')()};
  font-size: ${props => props.theme.elements.fontSize('large')};
  ${props => space(props.theme)(props)}
`;

const ExampleComponent = () => (
  <>
    <div>Hello World</div>
    <StyledTextComponent
      breakpoints={[0, 1, 2]}
      m={4}
      ml={['xs', 's', 'l']}
    >
      StarBucks
    </StyledTextComponent>
  </>
);

const App = () => (
  <StyleChemistryProvider theme={theme}>
    <ExampleComponent />
  </StyleChemistryProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
