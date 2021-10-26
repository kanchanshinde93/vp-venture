import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  
  {
    id: 'investor',
    title: 'Investor',
    translate: 'MENU.INVESTOR.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'user',
    children: [
      {
        id: 'investorlist',
        title: 'Investor List',
        translate: 'MENU.INVESTOR.INVESTORLIST',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'investor/investorlist'
      },
      // {
      //   id: 'ecommerce',
      //   title: 'eCommerce',
      //   translate: 'MENU.INVESTOR.ECOMMERCE',
      //   type: 'item',
      //   icon: 'circle',
      //   url: 'dashboard/ecommerce'
      // }
    ]
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    translate: 'MENU.PORTFOLIO.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'user',
    children: [
      {
        id: 'portfoliolist',
        title: 'Portfolio List',
        translate: 'MENU.PORTFOLIO.PORTFOLIOLIST',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'portfolio/portfoliolist'
      },
    ]
  },
  {
    id: 'transaction',
    title: 'Transaction',
    translate: 'MENU.TRANSACTION.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'user',
    children: [
      {
        id: 'transactionlist',
        title: 'Transactionlist List',
        translate: 'MENU.TRANSACTION.TRANSACTIONLIST',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'transaction/transactionlist'
      },
    ]
  },

  {
    id: 'visitorlist',
    title: 'Visitor',
    translate: 'MENU.VISITOR.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'user',
    children: [
      {
        id: 'visitorlist',
        title: 'Visitor List',
        translate: 'MENU.VISITOR.VISITORLIST',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'visitor/visitorlist'
      },
    ]
  },
  {
    id: 'offer',
    title: 'Offer',
    translate: 'MENU.OFFER.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'user',
    children: [
      {
        id: 'createoffer',
        title: 'Create Offer',
        translate: 'MENU.OFFER.CREATEOFFER',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'offer/createoffer'
      },
      {
        id: 'offerlist',
        title: 'Offer List',
        translate: 'MENU.OFFER.OFFERLIST',
        type: 'item',
        icon: 'circle',
        url: 'offer/offerlist'
      }
    ]
  },

  // {
  //   id: 'transaction',
  //   title: 'Transaction',
  //   translate: 'MENU.TRANSACTION.COLLAPSIBLE',
  //   type: 'collapsible',
  //   icon: 'user',
  //   children: [
  //     {
  //       id: 'transactionlist',
  //       title: 'Transaction List',
  //       translate: 'MENU.TRANSACTION.TRANSACTIONLIST',
  //       type: 'item',
  //       role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
  //       icon: 'circle',
  //       url: 'transaction/transactionlist'
  //     },
  //   ]
  // },

]
