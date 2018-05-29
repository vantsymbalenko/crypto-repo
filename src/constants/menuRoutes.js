import {EXTERNAL_LINK_HELP_LOGIN_PAGE} from "./appConst";

export const menuRoutes = [
  {
    route: `/`,
    title: "Smart Wallet"
  },
  {
    route: `/buy-tokens`,
    title: "Buy Tokens"
  },
  {
    route: `/public-balance-sheet`,
    title: "public balance sheet"
  },
  {
    route: EXTERNAL_LINK_HELP_LOGIN_PAGE,
    title: "help",
    externalLink: true
  }
];

export const additionalMenuRoutes = [
  {
    route: `#`,
    title: "Betta v1.1",
    externalLink: true
  },
  {
    route: `/`,
    title: "Legal",
    externalLink: true
  },
  {
    route: `#`,
    title: "Logout",
    externalLink: true
  }
];