
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import TasksContextProvider from '../../context/TasksContext/TasksContext';
import { StyledNav, ContentArea, LogoutButton } from './Dashboard.styles';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <div>
            <StyledNav>
                <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Tasks
                </NavLink>
                <NavLink to="/weather" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Weather
                </NavLink>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </StyledNav>
            <ContentArea>
                <Outlet />
            </ContentArea>
        </div>
    );
};

export default () => (
    <TasksContextProvider>
        <DashboardPage />
    </TasksContextProvider>
);
