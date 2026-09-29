import fs from 'fs';
import path from 'path';

describe('ChartSection', () => {
  it('uses "Age at Enrollment" for the participant age chart title', () => {
    const chartSectionSource = fs.readFileSync(
      path.join(__dirname, 'ChartSection.js'),
      'utf8',
    );

    expect(chartSectionSource).toContain('chartTitle="Age at Enrollment"');
    expect(chartSectionSource).not.toContain('chartTitle="Age of Enrollment"');
  });
});
