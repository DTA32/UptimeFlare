import { MaintenanceConfig, MonitorTarget, PageConfig, WorkerConfig } from './types/config'

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

const maintenances: MaintenanceConfig[] = [
  {
    title: 'Kubernetes cluster maintenance',
    body: 'Some services may be temporarily unavailable during this period.',
    start: '2026-09-14T00:00:00+07:00',
    end: '2026-09-14T04:00:00+07:00',
  }
]

// --- Discord notifications -------------------------------------------------
// Delivery lives in `callbacks` below rather than in `notification.webhook` so
// the URL can come from the WEBHOOK_URL secret binding: the built-in notifier
// (`formatAndNotify` in worker/src/util.ts) is never handed `env`, but the
// callbacks are. The grace period and maintenance suppression that
// `formatAndNotify` would normally apply are therefore re-implemented here.

// How long a monitor must stay down before a DOWN message is sent.
const GRACE_PERIOD_MINUTES = 6
const TIME_ZONE = 'Asia/Jakarta'

// True while `monitor` sits inside an active maintenance window.
const isSuppressed = (monitor: MonitorTarget, timeNow: number) => {
  const now = new Date(timeNow * 1000)
  return maintenances.some(
    (m) =>
      (m.monitors ?? []).includes(monitor.id) &&
      now >= new Date(m.start) &&
      (!m.end || now <= new Date(m.end))
  )
}

const formatMessage = (
  monitor: MonitorTarget,
  isUp: boolean,
  timeIncidentStart: number,
  timeNow: number,
  reason: string
) => {
  const downtimeMinutes = Math.round((timeNow - timeIncidentStart) / 60)
  if (isUp) {
    return `✅ **${monitor.name}** is up!\nBack online after being down for ${downtimeMinutes} minutes.`
  }

  const startedAt = new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: TIME_ZONE,
  }).format(new Date(timeIncidentStart * 1000))

  return (
    `🔴 **${monitor.name}** is down.\n` +
    `Unavailable since ${startedAt} (${downtimeMinutes} minutes).\n` +
    `Issue: ${reason || 'unspecified'}`
  )
}

const notifyDiscord = async (env: any, message: string) => {
  if (!env?.WEBHOOK_URL) {
    console.log('WEBHOOK_URL secret is not set, skipping Discord notification')
    return
  }

  try {
    // Discord hard-caps `content` at 2000 characters.
    const resp = await fetch(env.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content: message.slice(0, 1900) }),
      signal: AbortSignal.timeout(5000),
    })
    if (!resp.ok) {
      console.log(`Discord webhook failed: ${resp.status} ${await resp.text()}`)
    }
  } catch (e) {
    console.log(`Discord webhook error: ${e}`)
  }
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
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
      checkProxy: 'worker://apac-se',
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'text/html',
      },
    },
    {
      id: 'api_bdgcafe_monitor',
      name: 'BDGCafe (API)',
      method: 'GET',
      target: 'https://bdgcafe.com/api/health',
      expectedCodes: [200],
      timeout: 10000,
      checkProxy: 'worker://apac-se',
      headers: {
        'User-Agent': 'Uptimeflare',
        'Accept': 'application/json',
      },
    },
  ],
  callbacks: {
    // `onIncident` runs on every check while a monitor is down. Fire only inside
    // the single ~1-minute window at GRACE_PERIOD_MINUTES in, so one incident
    // yields exactly one DOWN message however long it lasts, and a flapping
    // error string can no longer trigger repeat notifications.
    onIncident: async (
      env: any,
      monitor: MonitorTarget,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      const elapsed = timeNow - timeIncidentStart
      const graceSeconds = GRACE_PERIOD_MINUTES * 60
      if (elapsed < graceSeconds - 30 || elapsed >= graceSeconds + 30) return
      if (isSuppressed(monitor, timeNow)) return
      await notifyDiscord(env, formatMessage(monitor, false, timeIncidentStart, timeNow, reason))
    },

    // `onStatusChange` fires on both edges; we only want recovery, and only when
    // the matching DOWN message actually went out. Mirrors worker/src/index.ts:73-79.
    onStatusChange: async (
      env: any,
      monitor: MonitorTarget,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number
    ) => {
      if (!isUp) return
      if (timeNow - timeIncidentStart < (GRACE_PERIOD_MINUTES + 1) * 60 - 30) return
      if (isSuppressed(monitor, timeNow)) return
      await notifyDiscord(env, formatMessage(monitor, true, timeIncidentStart, timeNow, 'OK'))
    },
  },
}

export { maintenances, pageConfig, workerConfig }
