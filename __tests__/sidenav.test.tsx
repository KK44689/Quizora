import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SideNav } from "@/app/ui/dashboard/sidenav";
import '@testing-library/jest-dom'
import { useLogout } from "@/app/hooks/useSubmit";

//Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: any) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
});

// Mock next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} data-testid='logo-image' />
  }
}));

// Mock router
jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "",
}));

// Mock NavLinks
jest.mock('@/app/ui/dashboard/nav-links', () => ({
  __esModule: true,
  default: () => <div data-testid='navlinks'>NavLinks</div>
}));

// Mock logout icon
jest.mock("@/app/assets/icons/ri_logout-box-fill.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="logout-icon" />,
}));

// Mock useLogout
jest.mock("@/app/hooks/useSubmit", () => ({
  useLogout: jest.fn(),
}));

describe("Side Navigation Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useLogout as jest.Mock).mockReturnValue({
      isLoading: false,
      response: { type: '', message: '' },
      logout: jest.fn(),
    });
  });

  // Test renders

  it('renders link to / from logo', () => {
    render(<SideNav />);
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/');
    expect(link).toContainElement(
      screen.getByTestId("logo-image")
    );
  });

  it('renders navlinks', () => {
    render(<SideNav />);
    const navlinks = screen.getByTestId('navlinks');
    expect(navlinks).toBeInTheDocument();
  });

  it('render logout button', () => {
    render(<SideNav />);
    const logoutButton = screen.getByRole("button", { name: /log out/i });
    expect(logoutButton).toBeInTheDocument();
  });

  // Test functionality

  it("logout", async () => {
    const mockLogout = jest.fn();
    (useLogout as jest.Mock).mockReturnValue({
      isLoading: false,
      response: { type: '', message: '' },
      logout: mockLogout,
    });

    render(<SideNav />);

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });
});
