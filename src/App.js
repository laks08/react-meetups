import "./App.css";
import AllMeetups from "./pages/AllMeetups";
import NewMeetup from "./pages/NewMeetup";
import Favorites from "./pages/Favorites";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import EditMeetup from "./pages/EditMeetup";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMeetups />} />
        <Route path="/new-meetup" element={<NewMeetup />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/meetups/:meetupId/edit" element={<EditMeetup />} />
      </Routes>
    </Layout>
  );
}

export default App;
