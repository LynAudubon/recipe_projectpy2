import React, { useState, useRef, useEffect } from 'react';
import  { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import '../css/global.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Stack from '@material-ui/core/Stack';

function Label(props) {
  return (
      <label class="contained">{props.data} 
          <input type="checkbox"/>
          <span class="checkmark"></span>
      </label>
  )
};

export default function RecipeCard(props) {
  const location = useLocation();
  const id = location.state.from; 
  const item = useSelector(state => {
    return state.recipes.filter((x)=> x.id === id)[0];
  });

const [recipe, setRecipe] = useState(item !== undefined ? item : JSON.parse(window.localStorage.getItem(`recipe${id}`))); 

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handlePrint = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);

    const card = document.getElementById('print')
    window.print('', card);

  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

    useEffect(() => {
    const data = window.localStorage.getItem(`recipe${id}`);
    console.log('d',data);
    setRecipe(JSON.parse(data));
  }, [])

  useEffect(() => {
    window.localStorage.setItem(`recipe${id}`, JSON.stringify(recipe))
  })

  
  console.log('recipe2', recipe)
  const ingredientsList = recipe.ingredients.split(',');
    
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <main style={{ height:"100%", width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <Card id="print" sx={{ height: '70vh', maxWidth: 660, overflowY: 'auto'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {recipe.name[0].toUpperCase()}
          </Avatar>
        }
      action={
      <Stack direction="row" spacing={2}>
      <div>
          <IconButton 
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper id="paper"  sx={{ maxWidth: 70}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handlePrint}>Print</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      </Stack>
      }
        title={recipe.name}
        subheader={recipe.date_added}
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.imageUrl}
        alt={recipe.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.notes}
        </Typography>
      </CardContent>
      <CardActions>
        <CardActions style={{ margin: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <CardContent style={{display: 'flex', flexDirection: 'row'}}>
                <MenuBookRoundedIcon/> 
                <p style={{marginLeft: '5px', position:'relative', bottom: '11px'}}>{recipe.category}</p>
            </CardContent>
            <CardContent style={{display: 'flex', flexDirection: 'row'}}>
                <RestaurantRoundedIcon/> 
                <p style={{marginLeft: '5px', position:'relative', bottom: '10px'}}>Servings: {recipe.serving_size}</p>
            </CardContent>
        </CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{marginRight: '5px', position:'relative', bottom: '12px'}}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><h2>Ingredients:</h2></Typography>
          <hr></hr>
          <Typography paragraph>
            {ingredientsList.map((item, index) => (
            <Label key={index} data={item}/>))}
          </Typography>
          <Typography paragraph>
            <h2>Instructions:</h2>
          </Typography>
          <hr></hr>
          <Typography paragraph>
           {recipe.instructions}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </main>
    
  );
}
