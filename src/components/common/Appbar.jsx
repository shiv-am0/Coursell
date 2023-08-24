import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userLoadingState} from "../../store/selectors/userLoadingState.js";
import {usernameState} from "../../store/selectors/usernameState.js";
import {userState} from "../../store/atoms/users.js";
import {Loading} from "./Loading.jsx";

const pages_logged_in = ['View Courses', 'Create Course'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages = ['Signup', 'Login'];

function Appbar() {
    // Below state handles the opening and closing of menu box
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // Below state handles conditional rendering of the AppBar
    const userLoading = useRecoilValue(userLoadingState);
    const username = useRecoilValue(usernameState);
    const setUsersState = useSetRecoilState(userState);

    const navigate = useNavigate();

    if(userLoading) {
        return <Loading />
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSettingClick = (setting) => {
        handleCloseUserMenu(); // Close the menu

        switch (setting) {
            case 'Profile':
                // Handle Profile action
                break;
            case 'Account':
                // Handle Account action
                break;
            case 'Dashboard':
                // Handle Dashboard action
                break;
            case 'Logout':
                // Handle Logout action
                localStorage.setItem("token", null);
                setUsersState({
                    isLoading: false,
                    username: null
                });
                navigate("/login");
                break;
            default:
                // Handle other actions
                break;
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="false">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => {
                            navigate("/");
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        COURSELL
                    </Typography>

                    {username? (
                            <>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {pages_logged_in.map((page) => (
                                        <Button
                                            key={page}
                                            onClick={() => {
                                                console.log(page.toLowerCase().trim());
                                                navigate("/" + page.toLowerCase().trim());
                                            }}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </Box>

                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                                                <Typography>
                                                    {setting}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {pages.map((page) => (
                                        <Button
                                            key={page}
                                            onClick={() => {
                                                navigate("/" + page.toLowerCase());
                                            }}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </Box>
                            </>
                        )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Appbar;
