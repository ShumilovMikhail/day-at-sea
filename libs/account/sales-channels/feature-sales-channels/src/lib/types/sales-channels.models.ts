export interface SalesChannelsVM {
  id: number;
  channel: string;
  title: string;
  accountId: number;
  status: ChannelStatusVMType;
}

export type ChannelStatusVMType = 'active' | 'inactive';
