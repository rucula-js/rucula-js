export interface Url {
    href: string;
    protocol: 'http'|'https'|string;
    url: string;
    port?: string;
    path?: string;
}