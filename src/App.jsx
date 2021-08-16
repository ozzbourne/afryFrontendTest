// TODO Animera med Framer Motion?
// TODO Jest + react testing library?
// TODO Login m. firebase?
// TODO <ErrorBoundary />
// TODO Sortera hämtad data från Firebase efter timestamp?
// TODO Confirm-modal när man tar bort saker?
// TODO Mobile?
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import LandingPage from './components/pages/LandingPage';
import HandleEmployeesPage from './components/pages/HandleEmployeesPage';
import CompaniesPage from './components/pages/companies/CompaniesPage';
import HandleCompanyPage from './components/pages/companies/HandleCompanyPage';
import QuickHirePage from './components/pages/QuickHire';

const AppWrapper = styled('div')`
  padding: 35px;
  display: flex;
  justify-content: center;
  background: #f0f0f0;
  > * {
    width: 80%;
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/employees" component={HandleEmployeesPage} />
          <Route exact path="/companies" component={CompaniesPage} />
          <Route exact path="/companies/:id" component={HandleCompanyPage} />
          <Route exact path="/quick-hire" component={QuickHirePage} />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  );
};

export default App;
