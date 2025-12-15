import Avatar from "@/app/ui/dashboard/avatar";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

describe("Avatar", () => {
  it("renders avatar", () => {
  });
});