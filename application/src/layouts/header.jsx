import React from 'react';
import {HeaderWrapper, Left, Middle, Navbar, Right} from "../styles/header";

import {Icon} from 'react-fa';
import {Link, NavLink, withRouter} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Logo from "../logo.png"

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CameraIcon from '@material-ui/icons/Camera';


import {Store} from "../store/store";
import {Button} from "@material-ui/core";
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';

import AppsIcon from '@material-ui/icons/Apps';
import {desktopStyle} from "../utils/constants";

import {useMediaQuery} from "react-responsive";

const Header = (props) => {
  const {location} = props;
  const isDesktop = useMediaQuery({query: desktopStyle});
  const {breadcrumb} = React.useContext(Store);
  document.title = `${breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].value : ''}`

  return (
      <HeaderWrapper>
        {
          isDesktop &&
          <Left>
            <Breadcrumbs separator="›" aria-label="breadcrumb" component='div'>
              <NavLink to={'/'}>
                <img src={Logo} alt='logo'/>
              </NavLink>
              {
                breadcrumb.map(e => <NavLink to={e.label} key={e.label} exact>{e.value} </NavLink>)
              }
            </Breadcrumbs>
          </Left>
        }
        <Middle>
          <Button component={Link} to='/post' className={location.pathname.startsWith('/post') ? 'active' : ''}>
            <AppsIcon style={{marginRight: 5}}/> 博客
          </Button>
          <Button component={Link} to='/topic' className={location.pathname.startsWith('/topic') ? 'active' : ''}>
            <CameraIcon style={{marginRight: 5}}/> 专栏
          </Button>
          <Button component={Link} to='/project' className={location.pathname.startsWith('/project') ? 'active' : ''}>
            <SportsSoccerIcon style={{marginRight: 5}}/> 项目
          </Button>

        </Middle>
        {
          isDesktop &&
          <Right>
            <Tooltip title="个人主页">
              <a target='_blank' rel='noopener noreferrer' href='https://chenjiaming.org'>
                <Icon name="home"/>
              </a>
            </Tooltip>
            <Tooltip title="电子邮箱">
              <a target='_blank' rel='noopener noreferrer' href='mailto:aircjm@gmail.com'>
                <Icon name="at"/>
              </a>
            </Tooltip>
            <Tooltip title="Github">
              <a target='_blank' rel='noopener noreferrer' href='https://github.com/aircjm'>
                <Icon name="github"/>
              </a>
            </Tooltip>
          </Right>
        }
        {
          isDesktop &&
          <Navbar>
            <ArrowUpwardIcon onClick={() => document.querySelector('body').scrollIntoView({behavior: 'smooth'})}/>
            <ArrowDownwardIcon onClick={() => window.scroll({top: 250000, left: 0, behavior: 'smooth'})}/>
          </Navbar>
        }
      </HeaderWrapper>
  )
};


export default withRouter(Header);




