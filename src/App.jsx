// TODO Snygga till med emotion
// TODO framer motion för animeringar
// TODO Jest + react testing library
// TODO Login m. knuten data m. firebase?
// TODO <ErrorBoundary />
// TODO Sortera hämtad från Firebase efter timestamp?
// TODO confirm-modal när man tar bort saker?
// TODO Värt att köra in Redux för en error-modal? Annars prop-drilla en trigger-funktion.
// TODO Dummydata Oskar + Erik + Andreas + afry
// TODO Mobile
// TODO Uppdatera readme
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
