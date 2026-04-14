import { lookup } from 'node:dns/promises';
import ipaddr from 'ipaddr.js';

export async function isSafeUrl(url: string): Promise<boolean> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;

  const host = parsed.hostname.replace(/^\[|\]$/g, '');
  if (host.length === 0) return false;

  let ips: string[];
  if (ipaddr.isValid(host)) {
    ips = [host];
  } else {
    const resolved = await lookup(host, { all: true }).catch(() => []);
    if (resolved.length === 0) return false;
    ips = resolved.map((r) => r.address);
  }

  for (const ip of ips) {
    let addr: ipaddr.IPv4 | ipaddr.IPv6;
    try {
      addr = ipaddr.parse(ip);
    } catch {
      return false;
    }
    if (addr.range() !== 'unicast') return false;
  }

  return true;
}
