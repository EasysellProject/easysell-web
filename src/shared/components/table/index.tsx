import React, { useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useIntl } from 'react-intl';

import SimpleText from '../text/simple-text';
import { Listing } from '../../models/listing';
import ListingCard from '../listing-card';
import { WEB_STYLES } from '../../styles';
import styles from './styles'

interface TableHeaderProps {
    onRequestSort: (event, property) => void,
    order: 'asc' | 'desc',
    orderBy: string,
}

type HeadCell = {
    id: string,
    numeric: boolean,
    label: string
}

function EnhancedTableHead(props: TableHeaderProps) {
    const intl = useIntl();
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells: HeadCell[] = [
        { id: 'index', numeric: true, label: '' },
        { id: 'title', numeric: false, label: intl.formatMessage({ id: 'product-info' }) },
        { id: 'desc', numeric: false, label: intl.formatMessage({ id: 'description' }) },
        { id: 'price', numeric: true, label: intl.formatMessage({ id: 'price' }) },
        { id: 'currency', numeric: false, label: intl.formatMessage({ id: 'currency' }) },
        { id: 'stock', numeric: true, label: intl.formatMessage({ id: 'quantity' }) },
        { id: 'marketPlace', numeric: false, label: intl.formatMessage({ id: 'marketplace' }) },
        { id: 'createdAt', numeric: true, label: intl.formatMessage({ id: 'created-at' }) },
        { id: 'actions', numeric: false, label: intl.formatMessage({ id: 'actions' }) },
    ];

    return (
        <div style={styles.headerContainer}>
            {headCells.map((headCell: HeadCell, index) => (
                index == 0 ? (
                    <div
                        style={{
                            width: 48,
                        }}
                    >
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
                        </TableSortLabel>
                    </div>
                ) : (
                    <div
                        style={{
                            flex: index == 2 ? 3 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {
                            index != 8 ? (
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                    style={{ flex: 1 }}
                                >
                                    {
                                        index != 0 && (
                                            <SimpleText ellipsis additionalStyle={styles.headerText} textID={headCell.label} />
                                        )
                                    }
                                </TableSortLabel>
                            ) : (
                                <SimpleText ellipsis additionalStyle={styles.headerText} textID={headCell.label} />
                            )
                        }
                    </div>
                )
            ))
            }
        </div >
    );
}

interface TableProps {
    data: Listing[],
    onEditListing: (listing: Listing) => void
}

export default function EnhancedTable(props: TableProps) {
    const { data, onEditListing } = props;
    const [order, setOrder] = useState<"asc" | "desc">('asc');
    const [orderBy, setOrderBy] = useState('index');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [update, setUpdate] = useState(0);
    const [tooltipOpened, setTooltipOpened] = useState<Listing>(null);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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

    return (
        <div style={{ ...WEB_STYLES.flexColum, flex: 1 }}>
            <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
            />
            <div style={{ ...WEB_STYLES.flexColum, flex: 1 }}>
                {
                    stableSort(data, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((listing, index) => (
                            <ListingCard editListing={() => onEditListing(listing)} tooltipVisible={tooltipOpened && listing._id == tooltipOpened._id} listing={listing} index={listing.index} onMorePressed={(listing) => {
                                if (tooltipOpened && listing._id == tooltipOpened._id)
                                    setTooltipOpened(null);
                                else
                                    setTooltipOpened(listing);
                            }} />
                        ))
                }
            </div>
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