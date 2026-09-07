import { buildAboutMenuItems } from './contentNavigation';

describe('runtime content navigation', () => {
  it('creates About menu entries from manifest pages in manifest order', () => {
    const menu = buildAboutMenuItems([
      { route: '/about', slug: 'about', title: 'About the PSDC' },
      { route: '/new_page', slug: 'new-page', title: 'A New Page', menuLabel: 'New Page' },
    ]);

    expect(menu.slice(0, 2)).toEqual([
      expect.objectContaining({ name: 'About', link: '/about' }),
      expect.objectContaining({ name: 'New Page', link: '/new_page' }),
    ]);
    expect(menu[2]).toEqual(expect.objectContaining({ name: 'GraphQL', link: '/graphql' }));
  });

  it('uses the page title for a new page without a menu label', () => {
    const menu = buildAboutMenuItems([
      { route: '/research_updates', slug: 'research-updates', title: 'Research Updates' },
    ]);

    expect(menu[0].name).toBe('Research Updates');
  });
});
