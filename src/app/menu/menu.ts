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
      {
        id: 'acitveinvestorlist',
        title: 'Active Investor List',
        translate: 'MENU.INVESTOR.ACTIVEINVESTORLIST',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'investor/acitveinvestorlist'
      }
    ]
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    translate: 'MENU.PORTFOLIO.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'dollar-sign',
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
    icon: 'check-circle',
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
    icon: 'align-justify',
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
    icon: 'gift',
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
  {
    id: 'notice',
    title: 'Notice',
    translate: 'MENU.NOTICE.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'clipboard',
    children: [
      {
        id: 'noticelist',
        title: 'Notice List',
        translate: 'MENU.NOTICE.NOTICELIST',
        type: 'item',
        icon: 'circle',
        url: 'notice/noticelist'
      }
    ]
  },
  
  {
    id: 'referral',
    title: 'Referral',
    translate: 'MENU.REFERRAL.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'share-2',
    children: [
      {
        id: 'createreferral',
        title: 'Create Referral Commission',
        translate: 'MENU.REFERRAL.CREATEREFERRAL',
        type: 'item',
        icon: 'circle',
        url: 'referral/createreferral'
      },
      {
        id: 'referrallist',
        title: 'Referral List',
        translate: 'MENU.REFERRAL.REFERRALLIST',
        type: 'item',
        icon: 'circle',
        url: 'referral/referrallist'
      }
    ]
  },

  
  {
    id: 'payout',
    title: 'Payout',
    translate: 'MENU.PAYOUT.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'file-plus',
    children: [
      {
        id: 'allpayoutlist',
        title: 'All Payout List',
        translate: 'MENU.PAYOUT.ALLPAYOUTLIST',
        type: 'item',
        icon: 'circle',
        url: 'payout/allpayoutlist'
      },
      {
        id: 'pendingpayoutlist',
        title: 'Pending Payout List',
        translate: 'MENU.PAYOUT.PENDINGPAYOUTLIST',
        type: 'item',
        icon: 'circle',
        url: 'payout/pendingpayoutlist'
      },
      {
        id: 'completepayoutlist',
        title: 'Complete Payout List',
        translate: 'MENU.PAYOUT.COMPLETEPAYOUTLIST',
        type: 'item',
        icon: 'circle',
        url: 'payout/completepayoutlist'
      },
    ]
  },

  
  {
    id: 'support',
    title: 'Support',
    translate: 'MENU.SUPPORT.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'message-square',
    children: [
      {
        id: 'supportlist',
        title: 'Support List',
        translate: 'MENU.SUPPORT.SUPPORTLIST',
        type: 'item',
        icon: 'circle',
        url: 'support/supportlist'
      }
    ]
  }
 

]
