import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

import CodeIcon from '@mui/icons-material/Code';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import clang from '../assets/c.jpg';
import jlang from '../assets/java.png';
import javascriptlang from '../assets/javascript.png';
import pythonlang from '../assets/python.png';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



export default function Home() {

  // side navbar need this open and toggledrawer
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };



  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={event =>  navigate('/login')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LoginIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
      <MenuItem onClick={event =>  navigate('/signup')}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <HowToRegIcon />
        </IconButton>
        <p>Singup</p>
      </MenuItem>
    </Menu>
  );

 
  const icons_arr = [<CodeIcon />,<BookmarkAddedIcon />,<ContactEmergencyIcon />,<AutoGraphIcon />];
  const link_arr = ['code','','certificate',''];
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>

        {['Live Compiler', 'Score', 'Certificate', 'Task Sheet'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={event=>navigate('/'+link_arr[index])}>
            <ListItemButton>
              <ListItemIcon>
                {icons_arr[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['ContactUS'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ContactPhoneIcon /> 
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  const home_body_arr = [
    {lang_img:clang,language:'C',content:'C is a high-level, procedural programming language known for its efficiency, low-level access, portability, and use in system-level programming.'},
    {lang_img:clang,language:'C++',content:'C++ is a high-level programming language with object-oriented, generic, and functional features, designed for system and application software development.'},
    {lang_img:jlang,language:'Java',content:'Java is a high-level, object-oriented programming language designed for portability, cross-platform compatibility, and ease of use in application development.'},
    {lang_img:javascriptlang,language:'Javascript',content:'JavaScript is a dynamic, high-level scripting language used primarily for creating interactive web pages and enhancing user experiences online.'},
    {lang_img:pythonlang,language:'Python',content:'Python is a versatile, high-level programming language known for its readability, simplicity, and wide range of applications, from web development to data science.'},
  ]
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 ,display:{sx:'inline',lg:'none'}}}
            
          >
            <MenuIcon onClick={toggleDrawer(true)}/>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display:'block',width:'fit-content',marginRight:'0.5rem',fontWeight:800 }}
            
          >
            StrategyLearning
          </Typography>

          <Box sx={{display:'flex',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
            <Link onClick={event =>  navigate('/code')} underline="hover" sx={{color:'white', display:{lg:'inline',xs:'none'}}}> Live Compiler </Link>
            <Link href="#" underline="hover" sx={{color:'white', display:{lg:'inline',xs:'none'}}}> Score</Link>
            <Link onClick={event =>  navigate('/certificate')}  underline="hover" sx={{color:'white', display:{lg:'inline',xs:'none'}}}> Certificate </Link>
            <Link href="#" underline="hover" sx={{color:'white', display:{lg:'inline',xs:'none'}}}> Task Sheet </Link>
            <Link href="#" underline="hover" sx={{color:'white', display:{lg:'inline',xs:'none'}}}> Contact US </Link>
          </Box>
          <Search sx={{display:{xs:'none',md:'inline',lg:'inline'}}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button variant="contained" color="success"   onClick={event =>  navigate('/login')}  endIcon={<LoginIcon />}>Login </Button>
            <Button variant="contained" color="secondary" onClick={event => navigate('/signup')} style={{marginLeft:'1rem'}} endIcon={<HowToRegIcon />}>SingUp</Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>


    <Box sx={{backgroundColor:'#a8a8a8',width:'100%',height:'90vh',display:'flex',flexDirection:'row',padding:'0.5rem'}}>
      <div className='flex flex-row flex-wrap w-full h-full justify-start mt-4'>
        {home_body_arr.map((item,index)=>(
          <div className='w-[25%] h-max flex flex-col justify-center items-center p-2 '>
            <div className='h-8 w-[90%] mb-2'>
              <div className='bg-white w-full h-full  flex flex-row justify-center  items-center rounded-2xl'>
                <img src={item.lang_img} className='w-[25px] h-[25px]' alt="" />
                <span className='font-medium'>{item.language}</span>
              </div>
            </div>
            <p className='text-white font-serif h-full w-[90%]'>
              {item.content}
            </p>
          </div>
        ))}
       

     

      </div>
    </Box>
    </>
  );
}
