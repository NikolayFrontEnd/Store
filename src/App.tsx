
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import Navbar from "./components/Navbar/Navbar";
import ShowAllElements from "./unsortedItems/ShowAllElements";
import repositoriesStore from "./store/RepositoriesStore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditItem from "./pages/EditItem";
const App: React.FC = observer(() => {

    useEffect(() => {
        if (repositoriesStore.repos.length === 0) { // тут я предотвращаем повторные запросы
            repositoriesStore.fetch();
        }
    }, []);

    return (
        <div>
            <Navbar />
<Router>
    <Routes>
        <Route path = "/" element = {<ShowAllElements />}/>
        <Route path = "/edit/:id" element = {<EditItem/>}/>
    </Routes>
</Router>
            
        </div>
    );
});

export default App;
