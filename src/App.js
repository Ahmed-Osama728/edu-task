import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './Screens/HomeScreen';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="center">
            <h1>Education Classrooms</h1>
          </div>
          <HomeScreen />
        </Container>
      </main>
    </>
  );
}

export default App;
