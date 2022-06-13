import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationHeader from "./NavigationHeader/NavigationHeader";
import NavigationFooter from "./NavigationFooter/NavigationFooter";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
import RevisePage from "./pages/RevisePage";
import { AppStyled, MainBox } from "./AppStyles";

const App = () => {
  return (
    <AppStyled>
      <NavigationHeader />
      <MainBox>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/revise" element={<RevisePage />} />
          </Routes>
          <NavigationFooter />
        </BrowserRouter>
      </MainBox>
    </AppStyled>
  );
};

export default App;
