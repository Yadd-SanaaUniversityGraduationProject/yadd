import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PubHome from './screens/pub/Home.jsx';
import PubSearch from './screens/pub/Search.jsx';
import PubResults from './screens/pub/Results.jsx';
import PubProviderProfile from './screens/pub/ProviderProfile.jsx';
import PubPortfolio from './screens/pub/Portfolio.jsx';
import PubGate from './screens/pub/Gate.jsx';
import SignIn from './screens/auth/SignIn.jsx';
import CreateAccount from './screens/auth/CreateAccount.jsx';
import PortalSelect from './screens/auth/PortalSelect.jsx';
import PortalSwitch from './screens/auth/PortalSwitch.jsx';
import ForgotPassword from './screens/auth/ForgotPassword.jsx';
import ManageAccount from './screens/auth/ManageAccount.jsx';
import BenHome from './screens/ben/Home.jsx';
import MyRequests from './screens/ben/MyRequests.jsx';
import CreateRequest from './screens/ben/CreateRequest.jsx';
import RequestDetails from './screens/ben/RequestDetails.jsx';
import Responses from './screens/ben/Responses.jsx';
import Compare from './screens/ben/Compare.jsx';
import ConfirmSelection from './screens/ben/ConfirmSelection.jsx';
import ProHome from './screens/pro/Home.jsx';
import Suitable from './screens/pro/Suitable.jsx';
import ProReqDetails from './screens/pro/ReqDetails.jsx';
import CreateResponse from './screens/pro/CreateResponse.jsx';
import MyResponse from './screens/pro/MyResponse.jsx';
import More from './screens/More.jsx';
import Soon from './screens/Soon.jsx';
import PrototypeIndex from './screens/Index.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PubHome />} />
      <Route path="/search" element={<PubSearch />} />
      <Route path="/results" element={<PubResults />} />
      <Route path="/provider/:id" element={<PubProviderProfile />} />
      <Route path="/provider/:id/works" element={<PubPortfolio />} />
      <Route path="/gate" element={<PubGate />} />
      <Route path="/more" element={<More />} />
      {/* Auth */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/portal" element={<PortalSelect />} />
      <Route path="/switch" element={<PortalSwitch />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/account" element={<ManageAccount />} />
      {/* Beneficiary */}
      <Route path="/b" element={<BenHome />} />
      <Route path="/b/requests" element={<MyRequests />} />
      <Route path="/b/requests/new" element={<CreateRequest />} />
      <Route path="/b/requests/:id" element={<RequestDetails />} />
      <Route path="/b/requests/:id/responses" element={<Responses />} />
      <Route path="/b/requests/:id/compare" element={<Compare />} />
      <Route path="/b/requests/:id/confirm/:respId" element={<ConfirmSelection />} />
      {/* Provider */}
      <Route path="/p" element={<ProHome />} />
      <Route path="/p/requests" element={<Suitable />} />
      <Route path="/p/requests/:id" element={<ProReqDetails />} />
      <Route path="/p/requests/:id/respond" element={<CreateResponse />} />
      <Route path="/p/requests/:id/my-response" element={<MyResponse />} />
      {/* Aids */}
      <Route path="/soon/:id" element={<Soon />} />
      <Route path="/_index" element={<PrototypeIndex />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
