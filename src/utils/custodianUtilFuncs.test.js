describe('custodianUtilFuncs', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  describe('getNodeLevelLabel', () => {
    it('returns NODE_LABEL when node-level access is disabled', () => {
      jest.doMock('../bento/siteWideConfig', () => ({
        NODE_LEVEL_ACCESS: '',
        NODE_LABEL: 'Node Label',
      }));

      const custodianUtils = require('./custodianUtilFuncs').default;

      expect(custodianUtils.getNodeLevelLabel()).toBe('Node Label');
    });

    it('returns NODE_LABEL trimmed to 30 chars when node-level access is enabled', () => {
      jest.doMock('../bento/siteWideConfig', () => ({
        NODE_LEVEL_ACCESS: 'enabled',
        NODE_LABEL: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      }));

      const custodianUtils = require('./custodianUtilFuncs').default;

      expect(custodianUtils.getNodeLevelLabel()).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234');
    });
  });

  describe('getAuthenticatorName', () => {
    it('maps known idp values to display labels', () => {
      jest.doMock('../bento/siteWideConfig', () => ({
        NODE_LEVEL_ACCESS: '',
        NODE_LABEL: '',
      }));
      const custodianUtils = require('./custodianUtilFuncs').default;

      expect(custodianUtils.getAuthenticatorName('google')).toBe('Google');
      expect(custodianUtils.getAuthenticatorName('nih')).toBe('NIH');
      expect(custodianUtils.getAuthenticatorName('login.gov')).toBe('Login.gov');
    });

    it('returns original idp value when there is no mapping', () => {
      jest.doMock('../bento/siteWideConfig', () => ({
        NODE_LEVEL_ACCESS: '',
        NODE_LABEL: '',
      }));
      const custodianUtils = require('./custodianUtilFuncs').default;

      expect(custodianUtils.getAuthenticatorName('custom-idp')).toBe('custom-idp');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('normalizes special casing for known values', () => {
      jest.doMock('../bento/siteWideConfig', () => ({
        NODE_LEVEL_ACCESS: '',
        NODE_LABEL: '',
      }));
      const custodianUtils = require('./custodianUtilFuncs').default;

      expect(custodianUtils.capitalizeFirstLetter('non-member')).toBe('Non-Member');
      expect(custodianUtils.capitalizeFirstLetter('nih')).toBe('NIH');
      expect(custodianUtils.capitalizeFirstLetter('esi')).toBe('ESI');
      expect(custodianUtils.capitalizeFirstLetter('google')).toBe('Google');
    });

    it('capitalizes each word for general text', () => {
      jest.doMock('../bento/siteWideConfig', () => ({
        NODE_LEVEL_ACCESS: '',
        NODE_LABEL: '',
      }));
      const custodianUtils = require('./custodianUtilFuncs').default;

      expect(custodianUtils.capitalizeFirstLetter('hello world')).toBe('Hello World');
      expect(custodianUtils.capitalizeFirstLetter('mixed CASE text')).toBe('Mixed CASE Text');
    });
  });
});
