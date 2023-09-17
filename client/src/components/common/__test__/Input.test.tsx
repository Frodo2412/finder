import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input Component', () => {
  it('should render the input without crashing', () => {
    render(<Input type='text' id='test-input' name='testName' />);
  });

  it('should display the provided label', () => {
    render(
      <Input type='text' id='label-input' name='testName' label='Input Label' />
    );
    expect(screen.getByText('Input Label')).toBeInTheDocument();
  });

  it('should have default placeholder and validation text when not provided', () => {
    render(
      <Input
        type='text'
        id='default-input'
        name='testName'
        label='Test'
        touched={true}
      />
    );
    expect(screen.getByPlaceholderText('')).toBeInTheDocument();
    expect(screen.getByText('Por favor ingrese su Test')).toBeInTheDocument();
  });

  it('should display validation text when input is touched and contains an invalid value', () => {
    render(
      <Input
        type='text'
        id='invalid-input'
        name='testName'
        label='Test'
        touched={true}
        required={true}
      />
    );
    expect(screen.getByText('Por favor ingrese su Test')).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    const handleChange = jest.fn();
    render(
      <Input
        type='text'
        id='change-input'
        name='testName'
        label='Test'
        onChange={handleChange}
      />
    );
    screen.getByLabelText('Test').focus();
    userEvent.paste('new value');
    expect(handleChange).toHaveBeenCalled();
  });

  it('should render an icon when the Icon prop is provided', () => {
    // Mock icon component
    const MockIcon = () => <div data-testid='mock-icon'>Icon</div>;

    // Render the Input component with the Icon prop
    render(
      <Input type='text' id='test-input' name='test' Icon={<MockIcon />} />
    );

    // Verify that the icon is rendered
    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('should toggle password visibility when the eye icon is clicked', async () => {
    render(<Input type='password' id='test-password' name='password' />);

    const passwordInput = screen.getByTestId('test-password');
    const toggleVisibilityButton = screen.getByTestId(
      'visibility-toggle-button'
    );

    expect(passwordInput).toHaveAttribute('type', 'password');

    userEvent.click(toggleVisibilityButton);

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    userEvent.click(toggleVisibilityButton);

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });
});
