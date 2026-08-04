import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MasterPlanEstimator, computeEstimate } from './MasterPlanEstimator';
import type { EstimateInput } from './MasterPlanEstimator';

const feeMatcher = (expected: string) => (content: string, _element: Element | null): boolean => {
  const normalized = content.replace(/[\s$,.\u00A0]/g, '');
  return normalized === expected.replace(/[\s$,.\u00A0]/g, '');
};

const allOff: Record<'pool' | 'kitchen' | 'fire' | 'pergola' | 'lighting', boolean> = {
  pool: false, kitchen: false, fire: false, pergola: false, lighting: false,
};

describe('computeEstimate', () => {
  it('defaults: standard scope, pool+kitchen+fire+lighting on, pergola off', () => {
    const r = computeEstimate({ scope: 'standard', selected: { ...allOff, pool: true, kitchen: true, fire: true, lighting: true } } as EstimateInput);
    expect(r.designFee).toBe(4450);
    expect(r.minBuild).toBe(126000);
    expect(r.maxBuild).toBe(242000);
  });

  it('estate scope with all features off', () => {
    const r = computeEstimate({ scope: 'estate', selected: allOff } as EstimateInput);
    expect(r.designFee).toBe(4500);
    expect(r.minBuild).toBe(85000);
    expect(r.maxBuild).toBe(160000);
  });

  it('standard scope with only pool on', () => {
    const r = computeEstimate({ scope: 'standard', selected: { ...allOff, pool: true } } as EstimateInput);
    expect(r.designFee).toBe(3600);
    expect(r.minBuild).toBe(90000);
    expect(r.maxBuild).toBe(170000);
  });

  it('standard scope with all features on', () => {
    const r = computeEstimate({ scope: 'standard', selected: { pool: true, kitchen: true, fire: true, pergola: true, lighting: true } } as EstimateInput);
    expect(r.designFee).toBe(4800);
    expect(r.minBuild).toBe(140000);
    expect(r.maxBuild).toBe(268000);
  });
});

describe('MasterPlanEstimator', () => {
  it('renders the default 3D design package fee of $4,450', () => {
    render(<MasterPlanEstimator onOpenConsultation={() => {}} />);
    expect(screen.getByText(feeMatcher('4450'))).toBeInTheDocument();
  });

  it('drops the fee by 600 when the Custom Heated Pool & Spa toggle is clicked', () => {
    render(<MasterPlanEstimator onOpenConsultation={() => {}} />);
    expect(screen.getByText(feeMatcher('4450'))).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Custom Heated Pool & Spa/i }));
    expect(screen.getByText(feeMatcher('3850'))).toBeInTheDocument();
  });
});

