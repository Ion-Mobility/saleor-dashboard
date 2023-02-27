import { createCountryHandler } from "@dashboard/components/AddressEdit/createCountryHandler";
import { Content } from "@dashboard/components/AppLayout/Content";
import { DetailedContent } from "@dashboard/components/AppLayout/DetailedContent";
import { RightSidebar } from "@dashboard/components/AppLayout/RightSidebar";
import { TopNav } from "@dashboard/components/AppLayout/TopNav";
import CardSpacer from "@dashboard/components/CardSpacer";
import CompanyAddressInput from "@dashboard/components/CompanyAddressInput";
import Form from "@dashboard/components/Form";
import Savebar from "@dashboard/components/Savebar";
import { AddressTypeInput } from "@dashboard/customers/types";
import {
  CountryWithCodeFragment,
  WarehouseClickAndCollectOptionEnum,
  WarehouseDetailsFragment,
  WarehouseErrorFragment,
} from "@dashboard/graphql";
import useAddressValidation from "@dashboard/hooks/useAddressValidation";
import { SubmitPromise } from "@dashboard/hooks/useForm";
import useNavigator from "@dashboard/hooks/useNavigator";
import useStateFromProps from "@dashboard/hooks/useStateFromProps";
import createSingleAutocompleteSelectHandler from "@dashboard/utils/handlers/singleAutocompleteSelectChangeHandler";
import { mapCountriesToChoices, mapEdgesToItems } from "@dashboard/utils/maps";
import { warehouseListUrl } from "@dashboard/warehouses/urls";
import { ConfirmButtonTransitionState } from "@saleor/macaw-ui";
import React from "react";
import { useIntl } from "react-intl";

import WarehouseInfo from "../WarehouseInfo";
import WarehouseSettings from "../WarehouseSettings";

export interface WarehouseDetailsPageFormData extends AddressTypeInput {
  name: string;
  isPrivate: boolean;
  clickAndCollectOption: WarehouseClickAndCollectOptionEnum;
}
export interface WarehouseDetailsPageProps {
  countries: CountryWithCodeFragment[];
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  warehouse: WarehouseDetailsFragment | undefined;
  onDelete: () => void;
  onSubmit: (data: WarehouseDetailsPageFormData) => SubmitPromise;
}

const WarehouseDetailsPage: React.FC<WarehouseDetailsPageProps> = ({
  countries,
  disabled,
  errors,
  saveButtonBarState,
  warehouse,
  onDelete,
  onSubmit,
}) => {
  const intl = useIntl();
  const navigate = useNavigator();

  const [displayCountry, setDisplayCountry] = useStateFromProps(
    warehouse?.address?.country.country || "",
  );

  const { errors: validationErrors, submit: handleSubmit } = useAddressValidation(onSubmit);

  const initialForm: WarehouseDetailsPageFormData = {
    city: warehouse?.address.city ?? "",
    companyName: warehouse?.address.companyName ?? "",
    country: warehouse?.address.country.code ?? "",
    isPrivate: !!warehouse?.isPrivate,
    clickAndCollectOption:
      warehouse?.clickAndCollectOption || WarehouseClickAndCollectOptionEnum.DISABLED,
    countryArea: warehouse?.address.countryArea ?? "",
    name: warehouse?.name ?? "",
    phone: warehouse?.address.phone ?? "",
    postalCode: warehouse?.address.postalCode ?? "",
    streetAddress1: warehouse?.address.streetAddress1 ?? "",
    streetAddress2: warehouse?.address.streetAddress2 ?? "",
  };

  return (
    <Form confirmLeave initial={initialForm} onSubmit={handleSubmit} disabled={disabled}>
      {({ change, data, isSaveDisabled, submit, set }) => {
        const countryChoices = mapCountriesToChoices(countries);
        const countrySelect = createSingleAutocompleteSelectHandler(
          change,
          setDisplayCountry,
          countryChoices,
        );
        const handleCountrySelect = createCountryHandler(countrySelect, set);

        return (
          <DetailedContent>
            <TopNav href={warehouseListUrl()} title={warehouse?.name} />
            <Content>
              <WarehouseInfo data={data} disabled={disabled} errors={errors} onChange={change} />
              <CardSpacer />
              <CompanyAddressInput
                countries={countryChoices}
                data={data}
                disabled={disabled}
                displayCountry={displayCountry}
                errors={[...errors, ...validationErrors]}
                header={intl.formatMessage({
                  id: "43Nlay",
                  defaultMessage: "Address Information",
                  description: "warehouse",
                })}
                onChange={change}
                onCountryChange={handleCountrySelect}
              />
            </Content>
            <RightSidebar>
              <WarehouseSettings
                zones={mapEdgesToItems(warehouse?.shippingZones) ?? []}
                data={data}
                disabled={disabled}
                onChange={change}
                setData={set}
              />
            </RightSidebar>
            <Savebar
              disabled={!!isSaveDisabled}
              onCancel={() => navigate(warehouseListUrl())}
              onDelete={onDelete}
              onSubmit={submit}
              state={saveButtonBarState}
            />
          </DetailedContent>
        );
      }}
    </Form>
  );
};

WarehouseDetailsPage.displayName = "WarehouseDetailsPage";
export default WarehouseDetailsPage;
