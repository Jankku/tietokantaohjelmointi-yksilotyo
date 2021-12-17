import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import { QueryClient, QueryClientProvider } from "react-query";
import Error404 from "./components/common/Error404";
import Layout from "./components/common/Layout";
import History from "./pages/History";

const queryClient = new QueryClient();

function App() {
    return (<QueryClientProvider client={queryClient}>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/movie/:id/:region" element={<MovieDetail />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<Error404 />} />
            </Route>
        </Routes>
    </QueryClientProvider>);
}

export default App;
