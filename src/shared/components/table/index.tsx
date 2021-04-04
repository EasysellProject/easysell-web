import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useIntl } from 'react-intl';

import styles from './styles'
import SimpleText from '../text/simple-text';
import { Listing } from '../../models/listing';
import ListingCard from '../listing-card';
import { APP_COLORS } from '../../styles';


interface TableHeaderProps {
    classes: any,
    onRequestSort: (event, property) => void,
    order: 'asc' | 'desc',
    orderBy: string,
}

function EnhancedTableHead(props: TableHeaderProps) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const intl = useIntl()

    const headCells = [
        { id: 'index', numeric: true, disablePadding: false, label: '' },
        { id: 'title', numeric: false, disablePadding: false, label: intl.formatMessage({ id: 'product-info' }) },
        { id: 'desc', numeric: false, disablePadding: false, label: intl.formatMessage({ id: 'description' }) },
        { id: 'price', numeric: true, disablePadding: false, label: intl.formatMessage({ id: 'price' }) },
        { id: 'currency', numeric: false, disablePadding: false, label: intl.formatMessage({ id: 'currency' }) },
        { id: 'stock', numeric: true, disablePadding: false, label: intl.formatMessage({ id: 'quantity' }) },
        { id: 'marketPlace', numeric: false, disablePadding: false, label: intl.formatMessage({ id: 'marketplace' }) },
        { id: 'createdAt', numeric: true, disablePadding: false, label: intl.formatMessage({ id: 'created-at' }) },
        { id: 'actions', numeric: false, disablePadding: false, label: intl.formatMessage({ id: 'actions' }) },
    ];

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {
                            index != 8 ? (
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {
                                        index != 0 && (
                                            <SimpleText additionalStyle={styles.headerText} textID={headCell.label} />
                                        )
                                    }
                                    {orderBy === headCell.id ? (
                                        <span className={classes.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>

                            ) : (
                                <SimpleText additionalStyle={styles.headerText} textID={headCell.label} />
                            )
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        borderCollapse: 'collapse',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tableRow: {
        "&:hover": {
            backgroundColor: '#DBF3F7 !important'
        },
        borderWidth: 1,
        borderColor: 'black',
    }
}));

interface TableProps {
    data: Listing[]
}

export default function EnhancedTable(props: TableProps) {
    const { data } = props;
    const classes = useStyles();

    const [order, setOrder] = useState<"asc" | "desc">('asc');
    const [orderBy, setOrderBy] = useState('index');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [update, setUpdate] = useState(0);

    function handleRequestSort(event, property): void {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setUpdate(update + 1);
    };

    function getComparator(order, orderBy) {
        function descendingComparator(a, b, orderBy) {
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
            return 0;
        }
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const handleClick = (name) => {
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

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {
                            stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    let marketplace = row.marketPlace.length == 2 ? row.marketPlace[0] + "|\n" + row.marketPlace[1] : row.marketPlace[0];
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(row.title)}
                                            tabIndex={-1}
                                            key={row._id}
                                            className={classes.tableRow}
                                        >
                                            <ListingCard listing={row} index={row.index} onMorePressed={() => { }} />
                                        </TableRow>
                                    );
                                })
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}
