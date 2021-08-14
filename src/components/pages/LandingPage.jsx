import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const LandingPageWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <h1>Admin panel HR-dep - The OGB Group AB</h1>
      <Link to="/employees">Handle employees</Link>
      <Link to="/companies">Handle companies</Link>
      <Link to="/quick-hire">Quick Hire</Link>
    </LandingPageWrapper>
  );
};

export default LandingPage;
