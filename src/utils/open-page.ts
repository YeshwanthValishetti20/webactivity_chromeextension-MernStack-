import Browser from 'webextension-polyfill';
import { SettingsTab } from './enums';
import { getStringTab } from './extension-tabs';

export async function openPage(tab: SettingsTab, domain?: string) {
  function getDomain() {
    return domain != undefined && tab == SettingsTab.WebsiteStats ? `&website=${domain}` : '';
  }

  let tabName = getStringTab(tab);

  const url = Browser.runtime.getURL(
    `src/dashboard.html${tabName != '' ? `?tab=${tabName}` : ''}${getDomain()}`,
  );
  const currentPage = await Browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  // Check if the cookie is present
  function isCookiePresent() {
    // Replace 'your_cookie_name' with the name of your cookie
    return document.cookie.includes('your_cookie_name=');
  }

  // Disable tab navigation until the cookie is present
  if (!isCookiePresent() && tabName !== 'about') {
    alert('Please log in first.');
    return; // Prevent further execution
  }

  if (currentPage[0].url?.startsWith(`chrome-extension://${__APP_ID__}/src/dashboard.html`))
    await Browser.tabs.update({
      url: url,
      active: true,
    });
  else
    await Browser.tabs.create({
      url: url,
      active: true,
    });
}
