import React from 'react';
import {Routes, Navigate, Route} from 'react-router-dom'
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import AuthPage from "../AuthPage/AuthPage";
import TodosPage from "../TodoPage/TodosPage";

const AppRoutes = () => {
    const isLogin = useTypedSelector(state => state.user.isLogin)

    if (isLogin)
        return (
            <Routes>
                <Route path="/todos" element={<TodosPage/>}/>
                <Route path="*" element={<Navigate to="/todos"/>}/>
            </Routes>)
    else
        return (
        <Routes>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="*" element={<Navigate to="/auth"/>}/>
        </Routes>)
};

export default AppRoutes;