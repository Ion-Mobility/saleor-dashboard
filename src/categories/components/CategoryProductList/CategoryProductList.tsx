import Checkbox from "@dashboard/components/Checkbox";
import ResponsiveTable from "@dashboard/components/ResponsiveTable";
import Skeleton from "@dashboard/components/Skeleton";
import TableCellAvatar from "@dashboard/components/TableCellAvatar";
import { AVATAR_MARGIN } from "@dashboard/components/TableCellAvatar/Avatar";
import TableHead from "@dashboard/components/TableHead";
import { TablePaginationWithContext } from "@dashboard/components/TablePagination";
import TableRowLink from "@dashboard/components/TableRowLink";
import { CategoryDetailsQuery } from "@dashboard/graphql";
import { maybe, renderCollection } from "@dashboard/misc";
import { productUrl } from "@dashboard/products/urls";
import { ListActions, ListProps, RelayToFlat } from "@dashboard/types";
import { TableBody, TableCell, TableFooter } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: "auto",
      },
    },
    colFill: {
      padding: 0,
      width: "100%",
    },
    colName: {},
    colNameHeader: {
      marginLeft: AVATAR_MARGIN,
    },
    link: {
      cursor: "pointer",
    },
    table: {
      tableLayout: "fixed",
    },
    tableContainer: {
      overflowX: "scroll",
    },
    textLeft: {
      textAlign: "left",
    },
    textRight: {
      textAlign: "right",
    },
  }),
  {
    name: "CategoryProductList",
  },
);

interface CategoryProductListProps extends ListProps, ListActions {
  products: RelayToFlat<CategoryDetailsQuery["category"]["products"]>;
}

export const CategoryProductList: React.FC<CategoryProductListProps> = props => {
  const { disabled, isChecked, products, selected, toggle, toggleAll, toolbar } = props;

  const classes = useStyles(props);

  const numberOfColumns = 2;

  return (
    <div className={classes.tableContainer}>
      <ResponsiveTable className={classes.table}>
        <colgroup>
          <col />
          <col className={classes.colName} />
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={products}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCell className={classes.colName}>
            <span className={classes.colNameHeader}>
              <FormattedMessage id="VQLIXd" defaultMessage="Name" description="product" />
            </span>
          </TableCell>
        </TableHead>
        <TableFooter>
          <TableRowLink>
            <TablePaginationWithContext colSpan={numberOfColumns} />
          </TableRowLink>
        </TableFooter>
        <TableBody>
          {renderCollection(
            products,
            product => {
              const isSelected = product ? isChecked(product.id) : false;

              return (
                <TableRowLink
                  data-test-id="product-row"
                  selected={isSelected}
                  hover={!!product}
                  key={product ? product.id : "skeleton"}
                  href={product && productUrl(product.id)}
                  className={classes.link}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(product.id)}
                    />
                  </TableCell>
                  <TableCellAvatar
                    className={classes.colName}
                    thumbnail={maybe(() => product.thumbnail.url)}
                  >
                    {product ? product.name : <Skeleton />}
                  </TableCellAvatar>
                </TableRowLink>
              );
            },
            () => (
              <TableRowLink>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage id="Q1Uzbb" defaultMessage="No products found" />
                </TableCell>
              </TableRowLink>
            ),
          )}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
};

CategoryProductList.displayName = "CategoryProductList";
export default CategoryProductList;
