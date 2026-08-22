import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "DTA32's Projects Status Page",
  links: [
    { link: 'https://github.com/DTA32', label: 'GitHub' },
    { link: 'https://mraditya.my.id/', label: 'Portfolio Web' },
    { link: 'https://dta32.my.id/', label: 'Personal Web' },
  ],
  favicon: 'https://dta32.my.id/favicon.ico',
  logo: 'https://dta32.my.id/favicon.ico',
}

const workerConfig: WorkerConfig = {
  monitors: [
    {
      id: 'bdgcafe_monitor',
      name: 'BDGCafe',
      method: 'GET',
      target: 'https://bdgcafe.com',
      statusPageLink: 'https://bdgcafe.com',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'portfolio_monitor',
      name: 'Portfolio Web',
      method: 'GET',
      target: 'https://mraditya.my.id',
      statusPageLink: 'https://mraditya.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'skripsi_monitor',
      name: 'Skripsi',
      method: 'GET',
      target: 'https://skrispi.mraditya.my.id',
      statusPageLink: 'https://skrispi.mraditya.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'personal_monitor',
      name: 'Personal Web',
      method: 'GET',
      target: 'https://dta32.my.id',
      statusPageLink: 'https://dta32.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'kawan_ngonser_monitor',
      name: 'Kawan Ngonser',
      method: 'GET',
      target: 'https://kawan-ngonser.dta32.my.id',
      statusPageLink: 'https://kawan-ngonser.dta32.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'splitbill_monitor',
      name: 'Split Bill',
      method: 'GET',
      target: 'https://splitbill.dta32.my.id',
      statusPageLink: 'https://splitbill.dta32.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'taliku_monitor',
      name: 'Taliku',
      method: 'GET',
      target: 'https://taliku.dta32.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'dfgs_monitor',
      name: 'DFGS',
      method: 'GET',
      target: 'https://dfgs.dta32.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'vern_monitor',
      name: 'VERN',
      method: 'GET',
      target: 'https://vern.dta32.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'tiketin_monitor',
      name: 'Tiketin',
      method: 'GET',
      target: 'https://tiketin.dta32.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'woodpecker_monitor',
      name: 'Woodpecker CI',
      method: 'GET',
      target: 'https://ci.dta32.my.id/login',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'api_dfgs_monitor',
      name: 'DFGS (API)',
      method: 'GET',
      target: 'https://api.dfgs.dta32.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'api_tiketin_monitor',
      name: 'Tiketin (API)',
      method: 'GET',
      target: 'https://api.tiketin.dta32.my.id',
      expectedCodes: [200],
      timeout: 10000,
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
  ],
  notification: {},
}

const maintenances: MaintenanceConfig[] = []

export { maintenances, pageConfig, workerConfig }
