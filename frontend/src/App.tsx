import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PolicyList from './components/PolicyList';
import PolicyCreate from './components/PolicyCreate';
import PaymentList from './components/PaymentList';
import RiskAssessment from './components/RiskAssessment';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <h1 className="logo">保险系统</h1>
            <ul className="nav-menu">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? "nav-active" : ""}>
                  保单列表
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/create" 
                  className={({ isActive }) => isActive ? "nav-active" : ""}>
                  创建保单
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/payments" 
                  className={({ isActive }) => isActive ? "nav-active" : ""}>
                  支付记录
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/assessment" 
                  className={({ isActive }) => isActive ? "nav-active" : ""}>
                  风险评估
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<PolicyList />} />
              <Route path="/create" element={<PolicyCreate />} />
              <Route path="/payments" element={<PaymentList />} />
              <Route path="/assessment" element={<RiskAssessment />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;