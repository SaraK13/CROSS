import {createBrowserRouter, Route, createRoutesFromElements} from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Map } from './pages/Map';
import { Profile } from './pages/Profile';

export const browserRouter = createBrowserRouter(createRoutesFromElements(
    [
        (<Route path={'/'} element={<Home/>}/>),
        (<Route path={'/about'} element={<About/>}/>),
        (<Route path={'/map'} element={<Map/>}/>),
        (<Route path={'/profile'} element={<Profile/>}/>)
    ]
))