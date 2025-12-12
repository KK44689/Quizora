import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NavLinks from '@/app/ui/dashboard/nav-links';

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => "",
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => (
    <a href={href} data-testid='link'>
      {children}
    </a>
  )
});

// Mock icons
jest.mock('@/app/assets/icons/ic_round-space-dashboard.svg', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='dashboard-icon' {...props}>Dashboard Icon</div>
}));

jest.mock('@/app/assets/icons/ic_twotone-history.svg', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='history-icon' {...props}>History Icon</div>
}));

describe("NavLinks Component", () => {
  it("link to each urls", () => {
    render(<NavLinks />);
    const links = screen.getAllByTestId('link');
    const hrefs = links.map(link => link.getAttribute('href'));

    expect(hrefs).toContain('/dashboard');
    expect(hrefs).toContain('/dashboard/quiz-history');
  });
});