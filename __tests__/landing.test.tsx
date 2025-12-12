import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import '@testing-library/jest-dom'

// Mock SVG logo
jest.mock('@/app/assets/icons/quizora-white.svg', () => ({
  __esModule: true,
  default: function MockLogo(props: any) {
    return <div data-testid='logo' {...props}>Logo</div>;
  },
}));

//Mock Link
jest.mock("next/link", () => {
  return ({ children, href }: any) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
});

describe("Landing Page", () => {
  it("renders the logo", () => {
    render(<Page />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("link to /login", () => {
    render(<Page />);
    const link = screen.getByTestId("link");
    expect(link).toHaveAttribute("href", "/login");
    expect(link).toContainElement(
      screen.getByRole("button", { name: /login/i })
    );
  });
});