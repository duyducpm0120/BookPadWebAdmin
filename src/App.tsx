import './App.css';
import { Topbar } from './components/topbar/Topbar';
import SignIn from './pages/SignIn/SignInEx';
// import { Topbar } from './components/topbar/Topbar';

function App(): JSX.Element {
  return (
    <div className="app">
      <Topbar />
      <SignIn></SignIn>
    </div>
  );
}

export default App;
