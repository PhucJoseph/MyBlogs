import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useState } from 'react';

const menus = [
    {
        label: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/dashboard',
    },
    {
        label: 'Hồ sơ đến',
        icon: <DescriptionIcon />,
        path: '/incoming',
    },
    {
        label: 'Hồ sơ nháp',
        icon: <FolderIcon />,
        path: '/draft',
    },
    {
        label: 'Báo cáo',
        icon: <AssessmentIcon />,
        path: '/report',
    },
];

const LeftMenu =() =>{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);

    const sidebarContent = (
        <Box
            sx={{
                width: {
                    xs: 260,
                    md: 280,
                },
                height: '100%',
                bgcolor: '#005199',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Logo */}
            <Box
                sx={{
                    height: 72,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    MY NOTES
                </Typography>
            </Box>

            {/* Menu */}
            <List sx={{ py: 2 }}>
                {menus.map((item) => (
                    <ListItemButton
                        key={item.path}
                        sx={{
                            mx: 1,
                            mb: 1,
                            borderRadius: 2,

                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.1)',
                            },

                            '&.active': {
                                bgcolor: '#0087FF',
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: '#fff',
                                minWidth: 40,
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    if (isMobile) {
        return (
            <>
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{
                        position: 'fixed',
                        top: 12,
                        left: 12,
                        zIndex: 2000,
                        bgcolor: '#fff',
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    {sidebarContent}
                </Drawer>
            </>
        );
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1200,
            }}
        >
            {sidebarContent}
        </Box>
    );
}

export default LeftMenu