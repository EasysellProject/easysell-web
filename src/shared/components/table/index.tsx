import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import SimpleText from '../text/simple-text';
import { Listing } from '../../models/listing';
import ListingCard from '../listing-card';
import { WEB_STYLES } from '../../styles';
import styles from './styles'
import { Product } from '../../models/product';
import { Order } from '../../models/order';

interface TableHeaderProps {
    onRequestSort: (event, property) => void,
    order: 'asc' | 'desc',
    orderBy: string,
    headCells: HeadCell[]
}

export type HeadCell = {
    id: string,
    numeric: boolean,
    label: string
}

function EnhancedTableHead(props: TableHeaderProps) {
    const { order, orderBy, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

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
                                            <SimpleText maxLine={2} ellipsis additionalStyle={styles.headerText} textID={headCell.label} />
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
    headCells: HeadCell[],
    renderItem: (row: any) => JSX.Element
}

interface ListingTableProps extends TableProps {
    data: Listing[],
    onEditListing: (listing: Listing) => void
}

interface ProductTableProps extends TableProps {
    data: Product[],
}

interface OrderTableProps extends TableProps {
    data: Order[],
}

export default function EnhancedTable(props: ListingTableProps | ProductTableProps | OrderTableProps) {
    const { data, headCells, renderItem } = props;

    const [indexedData, setIndexedData] = useState<any[]>([]);
    const [order, setOrder] = useState<"asc" | "desc">('asc');
    const [orderBy, setOrderBy] = useState('index');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        let indexedData = []
        data.forEach((row, idx) => {
            let indexedRow: any = Object.assign({}, row);
            indexedRow.index = idx + 1;
            indexedData.push(indexedRow);
        });
        setIndexedData(indexedData);
    }, [data])

    function handleRequestSort(event, property): void {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        console.log('property ', property)
        setUpdate(update + 1);
    };

    function getComparator(order, orderBy) {
        function descendingComparator(a, b, orderBy) {
            let compA = a;
            let compB = b;
            if (props.data.length > 0 && props.data[0] instanceof Listing) {
                compA = (orderBy == 'marketPlace' || orderBy == 'createdAt' || orderBy == 'index') ? a : a.product;
                compB = (orderBy == 'marketPlace' || orderBy == 'createdAt' || orderBy == 'index') ? b : b.product;
            }
            if (compB[orderBy] < compA[orderBy]) {
                return -1;
            }
            if (compB[orderBy] > compA[orderBy]) {
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
                headCells={headCells}
            />
            <div style={{ ...WEB_STYLES.flexColum, flex: 1 }}>
                {
                    stableSort(indexedData, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                            renderItem(row)
                            // ('onEditListing' in props) ? (
                            //     <ListingCard editListing={() => props.onEditListing(row)} tooltipVisible={tooltipOpened && row._id == tooltipOpened._id} listing={row} index={row.index} onMorePressed={(listing) => {
                            //         if (tooltipOpened && listing._id == tooltipOpened._id)
                            //             setTooltipOpened(null);
                            //         else
                            //             setTooltipOpened(listing);
                            //     }} />
                            // ) : (
                            //     <div>Product table</div>
                            // )
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
