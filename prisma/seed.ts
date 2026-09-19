import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding complete data catalog from DNSly Android app into Neon PostgreSQL...');

  // 1. Create or Update Default Admin User
  const adminEmail = 'admin@dnsly.app';
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin@DNSly2026', 10);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: 'Master Admin',
        role: 'SUPERADMIN',
      },
    });
    console.log('Created default admin: admin@dnsly.app (Password: Admin@DNSly2026)');
  }

  // 2. Clear & Seed All 20 Curated DNS Servers from DnsCatalog.kt
  await prisma.dnsServerConfig.deleteMany();

  const dnsServers = [
    {
      name: 'AdGuard DNS Default',
      primaryIp: '94.140.14.14',
      secondaryIp: '94.140.15.15',
      hostname: 'dns.adguard-dns.com',
      dohUrl: 'https://dns.adguard-dns.com/dns-query',
      category: 'FILTERED',
      isDefault: false,
      isEnabled: true,
      order: 1,
    },
    {
      name: 'AdGuard DNS Family',
      primaryIp: '94.140.14.15',
      secondaryIp: '94.140.15.16',
      hostname: 'family.adguard-dns.com',
      dohUrl: 'https://family.adguard-dns.com/dns-query',
      category: 'FAMILY',
      isDefault: false,
      isEnabled: true,
      order: 2,
    },
    {
      name: 'Quad9',
      primaryIp: '9.9.9.9',
      secondaryIp: '149.112.112.112',
      hostname: 'dns.quad9.net',
      dohUrl: 'https://dns.quad9.net/dns-query',
      category: 'SECURITY',
      isDefault: false,
      isEnabled: true,
      order: 3,
    },
    {
      name: 'Cloudflare Standard',
      primaryIp: '1.1.1.1',
      secondaryIp: '1.0.0.1',
      hostname: 'one.one.one.one',
      dohUrl: 'https://cloudflare-dns.com/dns-query',
      category: 'PRIVACY',
      isDefault: true,
      isEnabled: true,
      order: 4,
    },
    {
      name: 'Cloudflare Security',
      primaryIp: '1.1.1.2',
      secondaryIp: '1.0.0.2',
      hostname: 'security.cloudflare-dns.com',
      dohUrl: 'https://security.cloudflare-dns.com/dns-query',
      category: 'SECURITY',
      isDefault: false,
      isEnabled: true,
      order: 5,
    },
    {
      name: 'Cloudflare Family',
      primaryIp: '1.1.1.3',
      secondaryIp: '1.0.0.3',
      hostname: 'family.cloudflare-dns.com',
      dohUrl: 'https://family.cloudflare-dns.com/dns-query',
      category: 'FAMILY',
      isDefault: false,
      isEnabled: true,
      order: 6,
    },
    {
      name: 'CleanBrowsing Family',
      primaryIp: '185.228.168.168',
      secondaryIp: '185.228.169.168',
      hostname: 'family-filter-dns.cleanbrowsing.org',
      dohUrl: 'https://doh.cleanbrowsing.org/doh/family-filter/',
      category: 'FAMILY',
      isDefault: false,
      isEnabled: true,
      order: 7,
    },
    {
      name: 'Control D Ads & Tracking',
      primaryIp: '76.76.2.2',
      secondaryIp: '76.76.10.2',
      hostname: 'p2.freedns.controld.com',
      dohUrl: 'https://freedns.controld.com/p2',
      category: 'PRIVACY',
      isDefault: false,
      isEnabled: true,
      order: 8,
    },
    {
      name: 'Control D Family',
      primaryIp: '76.76.2.4',
      secondaryIp: '76.76.10.4',
      hostname: 'family.freedns.controld.com',
      dohUrl: 'https://freedns.controld.com/family',
      category: 'FAMILY',
      isDefault: false,
      isEnabled: true,
      order: 9,
    },
    {
      name: 'RethinkDNS',
      primaryIp: '104.21.3.155',
      secondaryIp: '172.67.147.240',
      hostname: 'basic.rethinkdns.com',
      dohUrl: 'https://basic.rethinkdns.com/dns-query',
      category: 'CONFIGURABLE',
      isDefault: false,
      isEnabled: true,
      order: 10,
    },
    {
      name: 'OpenDNS FamilyShield',
      primaryIp: '208.67.222.123',
      secondaryIp: '208.67.220.123',
      hostname: 'doh.familyshield.opendns.com',
      dohUrl: 'https://doh.familyshield.opendns.com/dns-query',
      category: 'FAMILY',
      isDefault: false,
      isEnabled: true,
      order: 11,
    },
    {
      name: 'Google Public DNS',
      primaryIp: '8.8.8.8',
      secondaryIp: '8.8.4.4',
      hostname: 'dns.google',
      dohUrl: 'https://dns.google/dns-query',
      category: 'NON_FILTERING',
      isDefault: false,
      isEnabled: true,
      order: 12,
    },
    {
      name: 'DNS.WATCH',
      primaryIp: '84.200.69.80',
      secondaryIp: '84.200.70.40',
      hostname: 'resolver1.dns.watch',
      dohUrl: '',
      category: 'PRIVACY',
      isDefault: false,
      isEnabled: true,
      order: 13,
    },
    {
      name: 'SWITCH DNS',
      primaryIp: '130.59.31.248',
      secondaryIp: '130.59.31.249',
      hostname: 'dns.switch.ch',
      dohUrl: 'https://dns.switch.ch/dns-query',
      category: 'PRIVACY',
      isDefault: false,
      isEnabled: true,
      order: 14,
    },
    {
      name: 'Hurricane Electric',
      primaryIp: '74.82.42.42',
      secondaryIp: '',
      hostname: 'ordns.he.net',
      dohUrl: '',
      category: 'NON_FILTERING',
      isDefault: false,
      isEnabled: true,
      order: 15,
    },
    {
      name: 'Quad101',
      primaryIp: '101.101.101.101',
      secondaryIp: '101.102.103.104',
      hostname: '101.101.101.101',
      dohUrl: 'https://dns.twnic.tw/dns-query',
      category: 'PRIVACY',
      isDefault: false,
      isEnabled: true,
      order: 16,
    },
    {
      name: 'Safe Surfer',
      primaryIp: '104.155.237.225',
      secondaryIp: '104.197.28.121',
      hostname: '',
      dohUrl: '',
      category: 'FAMILY',
      isDefault: false,
      isEnabled: true,
      order: 17,
    },
    {
      name: 'Nawala Child Protection',
      primaryIp: '180.131.144.144',
      secondaryIp: '180.131.145.145',
      hostname: '',
      dohUrl: '',
      category: 'FAMILY',
      isDefault: false,
      isEnabled: true,
      order: 18,
    },
    {
      name: 'SafeDNS',
      primaryIp: '195.46.39.39',
      secondaryIp: '195.46.39.40',
      hostname: '',
      dohUrl: '',
      category: 'SECURITY',
      isDefault: false,
      isEnabled: true,
      order: 19,
    },
    {
      name: 'Mullvad DNS Ad-Block',
      primaryIp: '194.242.2.3',
      secondaryIp: '194.242.2.4',
      hostname: 'adblock.dns.mullvad.net',
      dohUrl: 'https://adblock.dns.mullvad.net/dns-query',
      category: 'FILTERED',
      isDefault: false,
      isEnabled: true,
      order: 20,
    },
  ];

  await prisma.dnsServerConfig.createMany({ data: dnsServers });
  console.log(`Seeded ${dnsServers.length} DNS servers from DnsCatalog.kt`);

  // 3. Clear & Seed All 20 Curated Blocklist Feeds from BlocklistManager.kt
  await prisma.blocklistConfig.deleteMany();

  const blocklists = [
    // ─── 1. Advertising ───
    {
      name: 'AdAway Official',
      url: 'https://adaway.org/hosts.txt',
      category: 'ADS',
      description: 'Gold standard mobile & in-app ad blocking',
      ruleCount: 7500,
      isEnabled: true,
      order: 1,
    },
    {
      name: 'AdGuard DNS Filter',
      url: 'https://v.firebog.net/hosts/AdguardDNS.txt',
      category: 'ADS',
      description: 'Curated DNS-level ad blocking rules',
      ruleCount: 38000,
      isEnabled: true,
      order: 2,
    },
    {
      name: "Peter Lowe's List (Yoyo)",
      url: 'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext',
      category: 'ADS',
      description: 'Zero false positive curated ad servers',
      ruleCount: 3500,
      isEnabled: true,
      order: 3,
    },
    {
      name: 'EasyList DNS',
      url: 'https://v.firebog.net/hosts/Easylist.txt',
      category: 'ADS',
      description: 'Standard web advertising blocklist',
      ruleCount: 12000,
      isEnabled: true,
      order: 4,
    },
    {
      name: 'HaGeZi Pop-Up Ads',
      url: 'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/wildcard/popupads-onlydomains.txt',
      category: 'ADS',
      description: 'Intrusive pop-ups, redirects & push spam',
      ruleCount: 1500,
      isEnabled: true,
      order: 5,
    },

    // ─── 2. Tracking & Telemetry ───
    {
      name: 'EasyPrivacy DNS',
      url: 'https://v.firebog.net/hosts/Easyprivacy.txt',
      category: 'TRACKING',
      description: 'Global standard user tracking & analytics shield',
      ruleCount: 14000,
      isEnabled: true,
      order: 6,
    },
    {
      name: 'Windows SpyBlocker',
      url: 'https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt',
      category: 'TRACKING',
      description: 'Microsoft telemetry & diagnostic data',
      ruleCount: 450,
      isEnabled: true,
      order: 7,
    },
    {
      name: 'FrogEye First-Party Trackers',
      url: 'https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt',
      category: 'TRACKING',
      description: 'First-party & CNAME cloaked user trackers',
      ruleCount: 2200,
      isEnabled: true,
      order: 8,
    },
    {
      name: 'Prigent Analytics',
      url: 'https://v.firebog.net/hosts/Prigent-Ads.txt',
      category: 'TRACKING',
      description: 'Mobile analytics & SDK tracking servers',
      ruleCount: 2500,
      isEnabled: true,
      order: 9,
    },

    // ─── 3. Security & Threats ───
    {
      name: 'URLhaus by abuse.ch',
      url: 'https://urlhaus.abuse.ch/downloads/hostfile/',
      category: 'SECURITY',
      description: 'Live malware payloads, botnets & C2 servers',
      ruleCount: 18000,
      isEnabled: true,
      order: 10,
    },
    {
      name: 'Phishing Army Extended',
      url: 'https://phishing.army/download/phishing_army_blocklist_extended.txt',
      category: 'SECURITY',
      description: 'Active verified phishing & credential theft domains',
      ruleCount: 22000,
      isEnabled: true,
      order: 11,
    },
    {
      name: 'DandelionSprout Anti-Malware',
      url: 'https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt',
      category: 'SECURITY',
      description: 'High accuracy ransomware & Trojan domain sinkhole',
      ruleCount: 9000,
      isEnabled: true,
      order: 12,
    },
    {
      name: 'Prigent Cryptominers',
      url: 'https://v.firebog.net/hosts/Prigent-Crypto.txt',
      category: 'SECURITY',
      description: 'In-browser cryptocurrency miners & drainers',
      ruleCount: 1200,
      isEnabled: false,
      order: 13,
    },
    {
      name: 'HaGeZi Threat Feeds (TIF Mini)',
      url: 'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/wildcard/tif.mini-onlydomains.txt',
      category: 'SECURITY',
      description: 'Multi-source consolidated threat intelligence',
      ruleCount: 45000,
      isEnabled: false,
      order: 14,
    },

    // ─── 4. Scams & Suspicious ───
    {
      name: 'KADhosts (PolishFiltersTeam)',
      url: 'https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt',
      category: 'SCAMS',
      description: 'Scam portals, fake lotteries & fraud sinks',
      ruleCount: 16000,
      isEnabled: false,
      order: 15,
    },
    {
      name: 'Dan Pollock Zero Hosts',
      url: 'https://someonewhocares.org/hosts/zero/hosts',
      category: 'SCAMS',
      description: 'Longstanding community spam & scam list',
      ruleCount: 11000,
      isEnabled: false,
      order: 16,
    },
    {
      name: 'FadeMind Spam Hosts',
      url: 'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts',
      category: 'SCAMS',
      description: 'Referrer spam & marketing trap domains',
      ruleCount: 1800,
      isEnabled: false,
      order: 17,
    },
    {
      name: 'HaGeZi Fake Stores & Scams',
      url: 'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/wildcard/fake-onlydomains.txt',
      category: 'SCAMS',
      description: 'Fake online shops, subscription traps & scams',
      ruleCount: 14000,
      isEnabled: false,
      order: 18,
    },

    // ─── 5. Content & Safety ───
    {
      name: 'Chad Mayfield Adult / NSFW',
      url: 'https://raw.githubusercontent.com/chadmayfield/pihole-blocklists/master/lists/pi_blocklist_porn_all.list',
      category: 'CONTENT',
      description: 'Comprehensive adult & explicit content blocker',
      ruleCount: 120000,
      isEnabled: false,
      order: 19,
    },
    {
      name: 'HaGeZi Gambling (Mini)',
      url: 'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/wildcard/gambling.mini-onlydomains.txt',
      category: 'CONTENT',
      description: 'Online casinos, betting & gambling websites',
      ruleCount: 25000,
      isEnabled: false,
      order: 20,
    },
    {
      name: 'HaGeZi Anti-Piracy',
      url: 'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/wildcard/anti.piracy-onlydomains.txt',
      category: 'CONTENT',
      description: 'Warez, illegal torrent portals & streaming sites',
      ruleCount: 18000,
      isEnabled: false,
      order: 21,
    },
    {
      name: 'HaGeZi VPN / Proxy Bypass',
      url: 'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/wildcard/doh-vpn-proxy-bypass-onlydomains.txt',
      category: 'CONTENT',
      description: 'Open proxies, anonymous VPNs & Tor exit nodes',
      ruleCount: 7500,
      isEnabled: false,
      order: 22,
    },
  ];

  await prisma.blocklistConfig.createMany({ data: blocklists });
  console.log(`Seeded ${blocklists.length} blocklists from BlocklistManager.kt`);

  console.log('All catalog data successfully seeded into Neon PostgreSQL!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
