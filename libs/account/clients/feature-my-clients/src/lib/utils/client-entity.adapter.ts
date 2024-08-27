import { XLSXFileData } from '@utils/files';
import { ClientVM } from '../types/clients.models';

export const clientEntityAdapter = {
  vmToXLSXFileData: (clients: ClientVM[]): XLSXFileData => {
    return clients.map((client) => ({
      'ID клиента': client.id,
      'ФИО клиента': client.fullName,
      VIP: client.isVip ? 'VIP' : 'Обычный',
      Email: client.email,
      Брони: ` ${client.bookingsCount} (${client.totalAmount}₽)`,
    }));
  },
};
