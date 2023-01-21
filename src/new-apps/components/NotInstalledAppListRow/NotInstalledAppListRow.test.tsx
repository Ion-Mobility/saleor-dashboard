import * as context from "@dashboard/new-apps/context";
import {
  failedAppInProgress,
  pendingAppInProgress,
} from "@dashboard/new-apps/fixtures";
import Wrapper from "@test/wrapper";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import NotInstalledAppListRow from "./NotInstalledAppListRow";

jest.mock("@dashboard/new-apps/context", () => ({
  useAppListContext: jest.fn(() => ({
    openAppSettings: jest.fn(),
    removeAppInstallation: jest.fn(),
    retryAppInstallation: jest.fn(),
    openAppInstallPage: jest.fn(),
    openVercelDeploymentPage: jest.fn(),
  })),
}));

describe("Apps NotInstalledAppListRow", () => {
  it("displays app installation details when failed installation data passed", () => {
    // Arrange
    render(
      <Wrapper>
        <NotInstalledAppListRow
          appInstallation={failedAppInProgress}
          isExternal={false}
        />
      </Wrapper>,
    );
    const name = screen.queryByText(failedAppInProgress.appName);
    const manifestDomain = screen.queryByText(
      new URL(failedAppInProgress.manifestUrl as string).host,
    );
    const pendingLabel = screen.queryByTestId("app-pending-label");
    const failedLabel = screen.queryByTestId("app-failed-label");

    // Assert
    expect(name).toBeTruthy();
    expect(manifestDomain).toBeTruthy();
    expect(pendingLabel).toBeFalsy();
    expect(failedLabel).toBeTruthy();
  });

  it("displays app installation details when pending installation data passed", () => {
    // Arrange
    render(
      <Wrapper>
        <NotInstalledAppListRow
          appInstallation={pendingAppInProgress}
          isExternal={false}
        />
      </Wrapper>,
    );
    const name = screen.queryByText(pendingAppInProgress.appName);
    const manifestDomain = screen.queryByText(
      new URL(pendingAppInProgress.manifestUrl as string).host,
    );
    const pendingLabel = screen.queryByTestId("app-pending-label");
    const failedLabel = screen.queryByTestId("app-failed-label");

    // Assert
    expect(name).toBeTruthy();
    expect(manifestDomain).toBeTruthy();
    expect(pendingLabel).toBeTruthy();
    expect(failedLabel).toBeFalsy();
  });

  it("calls handlers when app installation data passed and buttons clicked", async () => {
    // Arrange
    const openAppSettings = jest.fn();
    const removeAppInstallation = jest.fn();
    const retryAppInstallation = jest.fn();
    const openAppInstallPage = jest.fn();
    const openVercelDeploymentPage = jest.fn();
    jest.spyOn(context, "useAppListContext").mockImplementation(() => ({
      openAppSettings,
      removeAppInstallation,
      retryAppInstallation,
      openAppInstallPage,
      openVercelDeploymentPage,
    }));
    render(
      <Wrapper>
        <NotInstalledAppListRow
          appInstallation={failedAppInProgress}
          isExternal={false}
        />
      </Wrapper>,
    );
    const user = userEvent.setup();
    const retryButton = screen.getByTestId("app-installation-retry-button");
    const removeButton = screen.getByTestId("app-installation-remove-button");

    // Act
    await user.click(retryButton);
    await user.click(removeButton);

    // Assert
    expect(retryAppInstallation).toHaveBeenCalledWith(failedAppInProgress.id);
    expect(retryAppInstallation).toHaveBeenCalledTimes(1);
    expect(removeAppInstallation).toHaveBeenCalledWith(failedAppInProgress.id);
    expect(removeAppInstallation).toHaveBeenCalledTimes(1);
  });
});
