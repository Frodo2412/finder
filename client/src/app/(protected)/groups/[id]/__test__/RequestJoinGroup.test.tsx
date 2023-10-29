import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestJoinGroup from '../Content/RequestJoinGroup';
import strings from '@/locales/strings.json';
import { SessionProvider } from 'next-auth/react';
import { GroupService } from '@/services/GroupService';
import { NotOkError } from '@/types/NotOkError';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('groups/1'),
}));

jest.mock('../../../../../services/Logger');

const renderRequestJoinGroup = () => {
  render(
    <SessionProvider
      session={{ user: { id: '1', name: 'test' }, expires: '11' }}
    >
      <RequestJoinGroup />
    </SessionProvider>
  );
};

describe('RequestJoinGroup Component Tests', () => {
  test('should render without crashing', () => {
    renderRequestJoinGroup();

    waitFor(() => {
      expect(
        screen.getByTestId('request-join-group-component')
      ).toBeInTheDocument();
    });
  });

  test('should show empty message', () => {
    renderRequestJoinGroup();

    waitFor(() => {
      const noRequestsMessage = screen.getByText(
        strings.groups.requestTab.emptyMessage
      );
      expect(noRequestsMessage).toBeInTheDocument();
    });
  });

  test('should test filter', async () => {
    renderRequestJoinGroup();

    waitFor(() => {
      const filterInput = screen.getByPlaceholderText('Filtrar Solicitudes');
      userEvent.type(filterInput, 'Juan');

      const juanRequest = screen.getByText('Juan Pérez');
      const mariaRequest = screen.queryByText('María González');
      expect(juanRequest).toBeInTheDocument();
      expect(mariaRequest).not.toBeInTheDocument();
    });
  });

  test('should display members requests when API returns data', async () => {
    // Mock the service to return a list of members
    const mockMembers = [
      { user_name: 'John Doe', user_id: '1' },
      { user_name: 'Jane Smith', user_id: '2' },
    ];
    GroupService.getRequestJoinGroup = jest.fn().mockResolvedValue(mockMembers);

    renderRequestJoinGroup();

    await waitFor(() => {
      const johnRequest = screen.getByText('John Doe');
      const janeRequest = screen.getByText('Jane Smith');
      expect(johnRequest).toBeInTheDocument();
      expect(janeRequest).toBeInTheDocument();
    });
  });

  test('should display forbidden access message when not authorized', async () => {
    // Mock the service to simulate a NotOkError and set the backendError's group property to true
    GroupService.getRequestJoinGroup = jest.fn().mockImplementation(() => {
      throw new NotOkError(
        { message: 'Not authorized', errors: { group: ['Not allowed'] } },
        403
      );
    });

    renderRequestJoinGroup();

    await waitFor(() => {
      const forbiddenMessage = screen.getByText(
        'Solo los administradores del grupo pueden ver las solicitudes'
      );
      expect(forbiddenMessage).toBeInTheDocument();
    });
  });
});
