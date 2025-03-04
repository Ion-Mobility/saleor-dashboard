// @ts-strict-ignore
import DeleteFilterTabDialog from "@dashboard/components/DeleteFilterTabDialog";
import FilterBar from "@dashboard/components/FilterBar";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData,
} from "@dashboard/components/SaveFilterTabDialog";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@dashboard/config";
import { giftCardListUrl } from "@dashboard/giftCards/urls";
import { useGiftCardCurrenciesQuery } from "@dashboard/graphql";
import { getSearchFetchMoreProps } from "@dashboard/hooks/makeTopLevelSearch/utils";
import useLocalStorage from "@dashboard/hooks/useLocalStorage";
import useNavigator from "@dashboard/hooks/useNavigator";
import { maybe } from "@dashboard/misc";
import useCustomerSearch from "@dashboard/searches/useCustomerSearch";
import useGiftCardTagsSearch from "@dashboard/searches/useGiftCardTagsSearch";
import useProductSearch from "@dashboard/searches/useProductSearch";
import createFilterHandlers from "@dashboard/utils/handlers/filterHandlers";
import { mapEdgesToItems } from "@dashboard/utils/maps";
import compact from "lodash/compact";
import React from "react";
import { useIntl } from "react-intl";

import { useGiftCardListDialogs } from "../providers/GiftCardListDialogsProvider";
import { useGiftCardList } from "../providers/GiftCardListProvider";
import { GiftCardListActionParamsEnum } from "../types";
import {
  createFilterStructure,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  saveFilterTab,
} from "./filters";
import {
  giftCardListFilterErrorMessages as errorMessages,
  giftCardListSearchAndFiltersMessages as messages,
} from "./messages";

const GiftCardListSearchAndFilters: React.FC = () => {
  const navigate = useNavigator();
  const intl = useIntl();
  const [selectedChannel] = useLocalStorage("channel", "");

  const { reset, params } = useGiftCardList();

  const { onClose, openSearchDeleteDialog, openSearchSaveDialog } =
    useGiftCardListDialogs();

  const defaultSearchVariables = {
    variables: { ...DEFAULT_INITIAL_SEARCH_DATA, first: 5 },
  };

  const {
    loadMore: fetchMoreCustomers,
    search: searchCustomers,
    result: searchCustomersResult,
  } = useCustomerSearch(defaultSearchVariables);

  const {
    loadMore: fetchMoreProducts,
    search: searchProducts,
    result: searchProductsResult,
  } = useProductSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5,
      channel: selectedChannel,
    },
  });

  const {
    loadMore: fetchMoreGiftCardTags,
    search: searchGiftCardTags,
    result: searchGiftCardTagsResult,
  } = useGiftCardTagsSearch(defaultSearchVariables);

  const { data: giftCardCurrenciesData, loading: loadingGiftCardCurrencies } =
    useGiftCardCurrenciesQuery();

  const filterOpts = getFilterOpts({
    params,
    productSearchProps: {
      ...getSearchFetchMoreProps(searchProductsResult, fetchMoreProducts),
      onSearchChange: searchProducts,
    },
    products: mapEdgesToItems(searchProductsResult?.data?.search),
    currencies: giftCardCurrenciesData?.giftCardCurrencies,
    loadingCurrencies: loadingGiftCardCurrencies,
    customerSearchProps: {
      ...getSearchFetchMoreProps(searchCustomersResult, fetchMoreCustomers),
      onSearchChange: searchCustomers,
    },
    customers: mapEdgesToItems(searchCustomersResult?.data?.search),
    tagSearchProps: {
      ...getSearchFetchMoreProps(
        searchGiftCardTagsResult,
        fetchMoreGiftCardTags,
      ),
      onSearchChange: searchGiftCardTags,
    },
    tags: compact(
      mapEdgesToItems(searchGiftCardTagsResult?.data?.search)?.map(
        ({ name }) => name,
      ),
    ),
  });

  const filterStructure = createFilterStructure(intl, filterOpts);

  const tabs = getFilterTabs();
  const currentTab = getFiltersCurrentTab(params, tabs);

  const [changeFilters, resetFilters, handleSearchChange] =
    createFilterHandlers({
      createUrl: giftCardListUrl,
      getFilterQueryParam,
      navigate,
      params,
      cleanupFn: reset,
    });

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      giftCardListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data,
      }),
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(giftCardListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  return (
    <>
      <FilterBar
        errorMessages={{
          initialBalanceAmount: errorMessages.balanceAmount,
          initialBalanceCurrency: errorMessages.balanceCurrency,
          currentBalanceAmount: errorMessages.balanceAmount,
          currentBalanceCurrency: errorMessages.balanceCurrency,
        }}
        tabs={tabs.map(tab => tab.name)}
        currentTab={currentTab}
        filterStructure={filterStructure}
        initialSearch={params?.query || ""}
        onAll={resetFilters}
        onFilterChange={changeFilters}
        onSearchChange={handleSearchChange}
        onTabChange={handleTabChange}
        onTabDelete={openSearchDeleteDialog}
        onTabSave={openSearchSaveDialog}
        searchPlaceholder={intl.formatMessage(messages.searchPlaceholder, {
          exampleGiftCardCode: "21F1-39DY-V4U2",
        })}
        allTabLabel={intl.formatMessage(messages.defaultTabLabel)}
      />
      <SaveFilterTabDialog
        open={params.action === GiftCardListActionParamsEnum.SAVE_SEARCH}
        confirmButtonState="default"
        onClose={onClose}
        onSubmit={handleTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === GiftCardListActionParamsEnum.DELETE_SEARCH}
        confirmButtonState="default"
        onClose={onClose}
        onSubmit={handleTabDelete}
        tabName={maybe(() => tabs[currentTab - 1].name, "...")}
      />
    </>
  );
};

export default GiftCardListSearchAndFilters;
