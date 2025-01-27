import { MenuConfig } from '../types/menu'

// Add new menu configurations for the new cockpits
export const epmMenuConfig: MenuConfig = {
  mainMenu: [
    { name: 'Live Ops', path: '/epm/liveops' },
    { name: 'Shadow Mode', path: '/epm/shadow' },
    { name: 'Simulation', path: '/epm/sim' },
    { name: 'Strategy Dev', path: '/epm/stratdev' }
  ],
  subMenus: {
    '/epm/liveops': [
      { name: 'Overview', path: '/epm/liveops/overview' },
      { name: 'Set Up', path: '/epm/liveops/setup' },
      { name: 'Bid Offer Review', path: '/epm/liveops/bo' },
      { name: 'Telemetry', path: '/epm/liveops/telemetry' },
      { name: 'Performance', path: '/epm/liveops/performance' },
      { name: 'Scheduling', path: '/epm/liveops/sched' }
    ],
    '/epm/shadow': [
      { name: 'Overview', path: '/epm/shadow/overview' },
      { name: 'Set Up', path: '/epm/shadow/setup' },
      { name: 'Bid Offer Review', path: '/epm/shadow/bo' },
      { name: 'Telemetry', path: '/epm/shadow/telemetry' },
      { name: 'Performance', path: '/epm/shadow/performance' },
      { name: 'Scheduling', path: '/epm/shadow/sched' }
    ],
    '/epm/sim': [
      { name: 'Overview', path: '/epm/sim/overview' },
      { name: 'Set Up', path: '/epm/sim/setup' },
      { name: 'Review', path: '/epm/sim/review' },
      { name: 'Compare', path: '/epm/sim/compare' }
    ],
    '/epm/stratdev': [
      { name: 'Overview', path: '/epm/stratdev/overview' },
      { name: 'Predictive Mdls', path: '/epm/stratdev/pred' },
      { name: 'Decision Mdl', path: '/epm/stratdev/decision' },
      { name: 'Strategy Testing', path: '/epm/stratdev/strattest' }
    ]
  }
}

export const cfeMgmtMenuConfig: MenuConfig = {
  mainMenu: [
    { name: 'Live Ops', path: '/cfemgmt/liveops' },
    { name: 'Shadow Mode', path: '/cfemgmt/shadow' },
    { name: 'Simulation', path: '/cfemgmt/sim' },
    { name: 'Strategy Dev', path: '/cfemgmt/stratdev' }
  ],
  subMenus: {
    '/cfemgmt/liveops': [
      { name: 'Overview', path: '/cfemgmt/liveops/overview' },
      { name: 'Set Up', path: '/cfemgmt/liveops/setup' },
      { name: 'Bid Offer Review', path: '/cfemgmt/liveops/bo' },
      { name: 'Telemetry', path: '/cfemgmt/liveops/telemetry' },
      { name: 'Performance', path: '/cfemgmt/liveops/performance' },
      { name: 'Scheduling', path: '/cfemgmt/liveops/sched' }
    ],
    '/cfemgmt/shadow': [
      { name: 'Overview', path: '/cfemgmt/shadow/overview' },
      { name: 'Set Up', path: '/cfemgmt/shadow/setup' },
      { name: 'Bid Offer Review', path: '/cfemgmt/shadow/bo' },
      { name: 'Telemetry', path: '/cfemgmt/shadow/telemetry' },
      { name: 'Performance', path: '/cfemgmt/shadow/performance' },
      { name: 'Scheduling', path: '/cfemgmt/shadow/sched' }
    ],
    '/cfemgmt/sim': [
      { name: 'Overview', path: '/cfemgmt/sim/overview' },
      { name: 'Set Up', path: '/cfemgmt/sim/setup' },
      { name: 'Review', path: '/cfemgmt/sim/review' },
      { name: 'Compare', path: '/cfemgmt/sim/compare' }
    ],
    '/cfemgmt/stratdev': [
      { name: 'Overview', path: '/cfemgmt/stratdev/overview' },
      { name: 'Predictive Mdls', path: '/cfemgmt/stratdev/pred' },
      { name: 'Decision Mdl', path: '/cfemgmt/stratdev/decision' },
      { name: 'Strategy Testing', path: '/cfemgmt/stratdev/strattest' }
    ]
  }
}

export const bessMgmtMenuConfig: MenuConfig = {
  mainMenu: [
    { name: 'Live Ops', path: '/bessmgmt/liveops' },
    { name: 'Shadow Mode', path: '/bessmgmt/shadow' },
    { name: 'Simulation', path: '/bessmgmt/sim' },
    { name: 'Strategy Dev', path: '/bessmgmt/stratdev' }
  ],
  subMenus: {
    '/bessmgmt/liveops': [
      { name: 'Overview', path: '/bessmgmt/liveops/overview' },
      { name: 'Set Up', path: '/bessmgmt/liveops/setup' },
      { name: 'Bid Offer Review', path: '/bessmgmt/liveops/bo' },
      { name: 'Telemetry', path: '/bessmgmt/liveops/telemetry' },
      { name: 'Performance', path: '/bessmgmt/liveops/performance' },
      { name: 'Scheduling', path: '/bessmgmt/liveops/sched' }
    ],
    '/bessmgmt/shadow': [
      { name: 'Overview', path: '/bessmgmt/shadow/overview' },
      { name: 'Set Up', path: '/bessmgmt/shadow/setup' },
      { name: 'Bid Offer Review', path: '/bessmgmt/shadow/bo' },
      { name: 'Telemetry', path: '/bessmgmt/shadow/telemetry' },
      { name: 'Performance', path: '/bessmgmt/shadow/performance' },
      { name: 'Scheduling', path: '/bessmgmt/shadow/sched' }
    ],
    '/bessmgmt/sim': [
      { name: 'Overview', path: '/bessmgmt/sim/overview' },
      { name: 'Set Up', path: '/bessmgmt/sim/setup' },
      { name: 'Review', path: '/bessmgmt/sim/review' },
      { name: 'Compare', path: '/bessmgmt/sim/compare' }
    ],
    '/bessmgmt/stratdev': [
      { name: 'Overview', path: '/bessmgmt/stratdev/overview' },
      { name: 'Predictive Mdls', path: '/bessmgmt/stratdev/pred' },
      { name: 'Decision Mdl', path: '/bessmgmt/stratdev/decision' },
      { name: 'Strategy Testing', path: '/bessmgmt/stratdev/strattest' }
    ]
  }
}

export const virtualsMenuConfig: MenuConfig = {
  mainMenu: [
    { name: 'Live Ops', path: '/virtuals/liveops' },
    { name: 'Shadow Mode', path: '/virtuals/shadow' },
    { name: 'Simulation', path: '/virtuals/sim' },
    { name: 'Strategy Dev', path: '/virtuals/stratdev' }
  ],
  subMenus: {
    '/virtuals/liveops': [
      { name: 'Overview', path: '/virtuals/liveops/overview' },
      { name: 'Set Up', path: '/virtuals/liveops/setup' },
      { name: 'Bid Offer Review', path: '/virtuals/liveops/bo' },
      { name: 'Telemetry', path: '/virtuals/liveops/telemetry' },
      { name: 'Performance', path: '/virtuals/liveops/performance' },
      { name: 'Scheduling', path: '/virtuals/liveops/sched' }
    ],
    '/virtuals/shadow': [
      { name: 'Overview', path: '/virtuals/shadow/overview' },
      { name: 'Set Up', path: '/virtuals/shadow/setup' },
      { name: 'Bid Offer Review', path: '/virtuals/shadow/bo' },
      { name: 'Telemetry', path: '/virtuals/shadow/telemetry' },
      { name: 'Performance', path: '/virtuals/shadow/performance' },
      { name: 'Scheduling', path: '/virtuals/shadow/sched' }
    ],
    '/virtuals/sim': [
      { name: 'Overview', path: '/virtuals/sim/overview' },
      { name: 'Set Up', path: '/virtuals/sim/setup' },
      { name: 'Review', path: '/virtuals/sim/review' },
      { name: 'Compare', path: '/virtuals/sim/compare' }
    ],
    '/virtuals/stratdev': [
      { name: 'Overview', path: '/virtuals/stratdev/overview' },
      { name: 'Predictive Mdls', path: '/virtuals/stratdev/pred' },
      { name: 'Decision Mdl', path: '/virtuals/stratdev/decision' },
      { name: 'Strategy Testing', path: '/virtuals/stratdev/strattest' }
    ]
  }
}

export const simEcoMenuConfig: MenuConfig = {
  mainMenu: [
    { name: 'Backtest', path: '/simeco/backtest' },
    { name: 'Forecast', path: '/simeco/forecast' },
    { name: 'Scenario', path: '/simeco/scenario' }
  ],
  subMenus: {
    '/simeco/backtest': [
      { name: 'Overview', path: '/simeco/backtest/overview' },
      { name: 'Set Up', path: '/simeco/backtest/setup' },
      { name: 'Review', path: '/simeco/backtest/review' },
      { name: 'Compare', path: '/simeco/backtest/compare' }
    ],
    '/simeco/forecast': [
      { name: 'Overview', path: '/simeco/forecast/overview' },
      { name: 'Set Up', path: '/simeco/forecast/setup' },
      { name: 'Review', path: '/simeco/forecast/review' },
      { name: 'Compare', path: '/simeco/forecast/compare' }
    ],
    '/simeco/scenario': [
      { name: 'Overview', path: '/simeco/scenario/overview' },
      { name: 'Set Up', path: '/simeco/scenario/setup' },
      { name: 'Review', path: '/simeco/scenario/review' },
      { name: 'Compare', path: '/simeco/scenario/compare' }
    ]
  }
}

export const dataMenuConfig: MenuConfig = {
  mainMenu: [
    { name: 'Metadata', path: '/data/metadata' },
    { name: 'Data Mart', path: '/data/datamart' }
  ],
  subMenus: {
    '/data/metadata': [
      { name: 'Venues', path: '/data/metadata/venues' },
      { name: 'QSEs', path: '/data/metadata/qses' },
      { name: 'Portfolios', path: '/data/metadata/portfolios' },
      { name: 'Assets', path: '/data/metadata/assets' }
    ],
    '/data/datamart': [
      { name: 'Overview', path: '/data/datamart/overview' },
      { name: 'Services', path: '/data/datamart/services' },
      { name: 'Monitoring', path: '/data/datamart/monitoring' }
    ]
  }
}

export const imbMgmtMenuConfig: MenuConfig = {
  mainMenu: [
    { name: 'Live Ops', path: '/imbmgmt/liveops' },
    { name: 'Shadow Mode', path: '/imbmgmt/shadow' },
    { name: 'Simulation', path: '/imbmgmt/sim' },
    { name: 'Strategy Dev', path: '/imbmgmt/stratdev' }
  ],
  subMenus: {
    '/imbmgmt/liveops': [
      { name: 'Overview', path: '/imbmgmt/liveops/overview' },
      { name: 'Set Up', path: '/imbmgmt/liveops/setup' },
      { name: 'Bid Offer Review', path: '/imbmgmt/liveops/bo' },
      { name: 'Telemetry', path: '/imbmgmt/liveops/telemetry' },
      { name: 'Performance', path: '/imbmgmt/liveops/performance' },
      { name: 'Scheduling', path: '/imbmgmt/liveops/sched' }
    ],
    '/imbmgmt/shadow': [
      { name: 'Overview', path: '/imbmgmt/shadow/overview' },
      { name: 'Set Up', path: '/imbmgmt/shadow/setup' },
      { name: 'Bid Offer Review', path: '/imbmgmt/shadow/bo' },
      { name: 'Telemetry', path: '/imbmgmt/shadow/telemetry' },
      { name: 'Performance', path: '/imbmgmt/shadow/performance' },
      { name: 'Scheduling', path: '/imbmgmt/shadow/sched' }
    ],
    '/imbmgmt/sim': [
      { name: 'Overview', path: '/imbmgmt/sim/overview' },
      { name: 'Set Up', path: '/imbmgmt/sim/setup' },
      { name: 'Review', path: '/imbmgmt/sim/review' },
      { name: 'Compare', path: '/imbmgmt/sim/compare' }
    ],
    '/imbmgmt/stratdev': [
      { name: 'Overview', path: '/imbmgmt/stratdev/overview' },
      { name: 'Predictive Mdls', path: '/imbmgmt/stratdev/pred' },
      { name: 'Decision Mdl', path: '/imbmgmt/stratdev/decision' },
      { name: 'Strategy Testing', path: '/imbmgmt/stratdev/strattest' }
    ]
  }
}

export const vppaMgmtMenuConfig: MenuConfig = {
  mainMenu: [
    { name: 'Live Ops', path: '/vppamgmt/liveops' },
    { name: 'Shadow Mode', path: '/vppamgmt/shadow' },
    { name: 'Simulation', path: '/vppamgmt/sim' },
    { name: 'Strategy Dev', path: '/vppamgmt/stratdev' }
  ],
  subMenus: {
    '/vppamgmt/liveops': [
      { name: 'Overview', path: '/vppamgmt/liveops/overview' },
      { name: 'Set Up', path: '/vppamgmt/liveops/setup' },
      { name: 'Bid Offer Review', path: '/vppamgmt/liveops/bo' },
      { name: 'Telemetry', path: '/vppamgmt/liveops/telemetry' },
      { name: 'Performance', path: '/vppamgmt/liveops/performance' },
      { name: 'Scheduling', path: '/vppamgmt/liveops/sched' }
    ],
    '/vppamgmt/shadow': [
      { name: 'Overview', path: '/vppamgmt/shadow/overview' },
      { name: 'Set Up', path: '/vppamgmt/shadow/setup' },
      { name: 'Bid Offer Review', path: '/vppamgmt/shadow/bo' },
      { name: 'Telemetry', path: '/vppamgmt/shadow/telemetry' },
      { name: 'Performance', path: '/vppamgmt/shadow/performance' },
      { name: 'Scheduling', path: '/vppamgmt/shadow/sched' }
    ],
    '/vppamgmt/sim': [
      { name: 'Overview', path: '/vppamgmt/sim/overview' },
      { name: 'Set Up', path: '/vppamgmt/sim/setup' },
      { name: 'Review', path: '/vppamgmt/sim/review' },
      { name: 'Compare', path: '/vppamgmt/sim/compare' }
    ],
    '/vppamgmt/stratdev': [
      { name: 'Overview', path: '/vppamgmt/stratdev/overview' },
      { name: 'Predictive Mdls', path: '/vppamgmt/stratdev/pred' },
      { name: 'Decision Mdl', path: '/vppamgmt/stratdev/decision' },
      { name: 'Strategy Testing', path: '/vppamgmt/stratdev/strattest' }
    ]
  }
}