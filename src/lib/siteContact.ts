/**
 * Public contact configuration for the institutional pages
 * (/about, /sources, /privacy, /terms).
 *
 * CONFIGURATION PLACEHOLDER: the project owner must supply a real public
 * contact address. Leave the string empty until one is confirmed. When empty,
 * the institutional pages show a neutral "a public contact channel is being
 * prepared" note instead of inventing an address.
 */
export const PUBLIC_CONTACT_EMAIL = "";

export function hasPublicContact(): boolean {
  return PUBLIC_CONTACT_EMAIL.trim().length > 0;
}
