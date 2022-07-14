import React, { useState, useMemo, useContext, useEffect } from 'react';
import { AppContext } from './AppContext';
import { useAuth0 } from '@auth0/auth0-react'
import  { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { alpha } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import { visuallyHidden } from '@mui/utils';
import  { recipeSlice } from '../redux/slice/recipe';
import { DELETE_RECIPE_BY_ID, GET_RECIPES } from '../redux/types';
import SignIn from './SignIn';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'imageUrl',
    numeric: true,
    disablePadding: true,
    label: 'Photo',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
   {
    id: 'category',
    numeric: false,
    disablePadding: true,
    label: 'Category',
  },
  {
    id: 'serving_size',
    numeric: true,
    disablePadding: true,
    label: 'Serving Size',
  },
  {
    id: 'date_added',
    numeric: true,
    disablePadding: true,
    label: 'Date Added',
  },
   {
    id: 'date_modified',
    numeric: true,
    disablePadding: true,
    label: 'Date Modified',
  },
  {
    id: 'edit',
    numeric: false,
    disablePadding: false,
    label: '',
  },
  {
    id: 'delete',
    numeric: false,
    disablePadding: false,
    label: '',
  },
  
];

const SearchBar = ({setSearchQuery, onSearch}) => (
  <form style={{display: 'flex'}}>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      placeholder="Search Field"
      size="small"
    />
    <IconButton type="submit" aria-label="search" onClick={() => onSearch()}>
      <SearchIcon style={{ fill: "grey" }}/>
    </IconButton>
  </form>
);

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { numSelected, onDelete} = props;
  const { handleState } = useContext(AppContext);
  console.log('query', searchQuery)
  const handleSearch = useMemo(() => {
    console.log('handlesearch')
    handleState(searchQuery);
  }, [searchQuery])

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          My Recipes
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={onDelete}/>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Search list">
         <div
          style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 20
      }}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch}/>
    </div>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
};


export default function EnhancedTable() {
  const rows = useSelector(state => state.recipes);
  console.log('rows',rows);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: GET_RECIPES})
  });
  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleDelete = () => {
    console.log('handleDelete', selected)
    console.log('deleted', delete[0].id)
    selected.map(select => {
      const deleted = rows.filter((x)=> x.name === select);
      setSelected([]);
      return dispatch({type: DELETE_RECIPE_BY_ID, id: deleted[0].id});
    })
    // console.log(selected)
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {

      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    // console.log(selected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const query = useContext(AppContext).currentState;
  const  filterData = (searched, data) => {
    console.log('s', searched)
  if (searched === null) {
    return data;
  } else {
    console.log('data', data)
    return data.filter((d) => (d.name).toLowerCase().includes(searched));
  }
};

  const dataFiltered = filterData(query, rows);

  const {user, isAuthenticated, isLoading } = useAuth0();

  return (
    isLoading ? <p>Loading...</p> :(
    isAuthenticated ? (
      <Box sx={{ width: "100%", height: "100vh", flexdDirection:"column"}}>
      <Paper sx={{ width: "100%"}}>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDelete}/>
        <TableContainer sx={{ width: "100%" }}>
          <Table
            sx={{ minWidth: 700}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody >
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(dataFiltered, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  console.log('is', isItemSelected)
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log(row.name);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                            <img src={row.imageUrl} alt={row.name} width='70' height='60' />
                       </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left"> {row.category}</TableCell>
                      <TableCell align="center">{row.serving_size}</TableCell>
                      <TableCell align="center">{row.date_added}</TableCell>
                      <TableCell align="center">{row.date_modified}</TableCell>
                      <TableCell align="center">
                            <Link to={`/update-recipe/${row.id}`} style={{textDecoration:'none'}}>
                                <Button onClick={() => dispatch(recipeSlice(row))}
                                style={{background:"#F98404"}} variant='contained'>UPDATE</Button>
                            </Link>
                       </TableCell>
                       <TableCell align="left">
                           <Link to={`/recipe/${row.id}`} state={{ from: row.id }} style={{textDecoration:'none'}}>View</Link>
                       </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  ) : <SignIn/>))
};
