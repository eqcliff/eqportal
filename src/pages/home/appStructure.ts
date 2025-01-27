export interface AppItem {
  name: string
  href?: string
  children?: AppItem[]
  layout?: "grid" | "column" | "row" | "custom"
  span?: number
  width?: "full" | "half" | "double"
}

export const appStructure: AppItem[] = [
  {
    name: "Front Office",
    layout: "custom",
    span: 2,
    children: [
      {
        name: "Enterprise Portfolio Mgmt Cockpit",
        href: "/epm",
        width: "double",
      },
      {
        name: "CFE Mgmt Cockpit",
        href: "/cfemgmt",
        width: "full",
      },
      {
        name: "Imbalance Mgmt Cockpit",
        href: "/imbmgmt",
        width: "full",
      },
      { 
        name: "BESS Mgmt Cockpit", 
        href: "/bessmgmt", 
        width: "full" 
      },
      { 
        name: "VPPA Mgmt Cockpit", 
        href: "/vppamgmt", 
        width: "full" },
      {
        name: "Virtuals Cockpit",
        href: "/virtuals",
        width: "half",
      },
      { name: "PtP Cockpit", href: "#", width: "half" },
      { name: "FTR Cockpit", href: "#", width: "half" },
      { name: "Futures Cockpit", href: "#", width: "half" },
      { name: "Market Insights Dashboard", href: "#", width: "double" },
      { name: "Market Data", href: "/data", width: "double" }
    ],
  },
  {
    name: "Commercial",
    layout: "grid",
    span: 2,
    children: [
      { name: "RevOps Mgmt", href: "#" },
      { name: "Underwriting Mgmt", href: "https://miro.com/app/board/uXjVLFEvqBA=/" },
      { name: "IPP Customer Portal Configuration", href: "#" },
      { name: "Corporate Customer Portal Configuration", href: "#" },
    ],
  },
  {
    name: "Middle+Back Office",
    layout: "column",
    children: [
      { name: "Middle Office Explorer", href: "#" },
      {
        name: "Back Office Explorer",
        href: "https://www.notion.so/Commercial-Back-office-Catalog-9042e0cb1f044fb4ad01d227c657de24",
      },
    ],
  },
  {
    name: "Fundamentals",
    layout: "column",
    children: [
      { name: "Scenarios", href: "#" },
      { name: "Forward Curves", href: "#" },
    ],
  },
  {
    name: "Science Development",
    layout: "custom",
    span: 2,
    children: [
      { name: "Simulation Ecosystem", href: "../simeco/", width: "full" },
      {
        name: "Forecasting Workbench",
        href: "https://www.notion.so/Forecasting-Services-Program-User-Guide-162dbe27599280d48ac4f1ff73554364#162dbe27599280b883edd4b443b8b590",
        width: "half",
      },
      { name: "Strategy Workbench", href: "#", width: "half" },
      {
        name: "Data Workbench",
        href: "https://dbc-3d7d8b5d-bc7b.cloud.databricks.com/explore/data?o=4593284812337215",
        width: "half",
      },
      {
        name: "Analytics Workbench",
        href: "https://www.notion.so/14adbe27599280249b85c1c15b374bae?v=5d2b8a8a9eaa41489f66799198f23cce",
        width: "half",
      },
    ],
  },
  {
    name: "Platform",
    layout: "grid",
    span: 2,
    children: [
      { name: "Data Model/Ontology Explorer", href: "#" },
      { name: "Data Lake Explorer", href: "#" },
      { name: "Notebook Editor", href: "#" },
      { name: "Web IDE", href: "#" },
      { name: "Workflow Administration", href: "https://trading-cockpit.eqprod01.eeek.io/workflow/hub" },
      { name: "ML Engineering Config", href: "#" },
      { name: "Compute Engineering Config", href: "#" },
      { name: "Observability Explorer", href: "https://equilibrium-energy.pagerduty.com/incidents" },
      { name: "Repository Explorer", href: "#" },
      { name: "CICD Explorer", href: "#" },
      { name: "Infra Configuration", href: "#" },
    ],
  },
  {
    name: "Administration",
    layout: "grid",
    span: 2,
    children: [
      { name: "Account Mgmt", href: "#" },
      { name: "User Group Mgmt", href: "#" },
      { name: "User Mgmt", href: "#" },
      { name: "Portfolio Setup", href: "#" },
    ],
  },
  {
    name: "Data",
    layout: "grid",
    span: 1,
    children: [
      { name: "Venues", href: "/vppacockpit/data/venues" },
      { name: "Data Lake Explorer", href: "#" },
      { name: "Notebook Editor", href: "#" },
      { name: "Web IDE", href: "#" },
      { name: "Workflow Administration", href: "https://trading-cockpit.eqprod01.eeek.io/workflow/hub" },
      { name: "ML Engineering Config", href: "#" },
      { name: "Compute Engineering Config", href: "#" },
      { name: "Observability Explorer", href: "https://equilibrium-energy.pagerduty.com/incidents" },
      { name: "Repository Explorer", href: "#" },
      { name: "CICD Explorer", href: "#" },
      { name: "Infra Configuration", href: "#" },
    ],
  },
]