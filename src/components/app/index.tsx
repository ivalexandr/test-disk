import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../main";
import { Auth } from "../auth";

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/auth/*" element={ <Auth /> }/>
      </Routes>
    </BrowserRouter>
  );
};
